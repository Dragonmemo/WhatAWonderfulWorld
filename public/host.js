/*
p5.multiplayer - HOST

This 'host' sketch is intended to be run in desktop browsers. 
It connects to a node server via socket.io, from which it receives
rerouted input data from all connected 'clients'.

Navigate to the project's 'public' directory.
Run http-server -c-1 to start server. This will default to port 8080.
Run http-server -c-1 -p80 to start server on open port 80.

*/

////////////
// Network Settings
// const serverIp      = 'https://yourservername.herokuapp.com';
// const serverIp      = 'https://yourprojectname.glitch.me';
const serverIp      = 'waww.up.railway.app';
const serverPort    = '3000';
const local         = false;   // true if running locally, false
                              // if running on remote server

// Global variables here. ---->

const LOADER = {
  Artifactory:
    [
      "J'ai trouvé un artefact, c'est(DETERMINANT)[2|Donne un adjectif qui précède un nom :|][1|Donne un objet (la première boite de texte est pour le déterminant, ex : le/la/les):|DETERMINANT][3|Donne un adjectif qui suit un nom :|]qui[5|Donne un effet (qui ...):|]quand[4|Donne une action (quand ...):|]",
      "J'ai trouvé un artefact, c'est[1|la][2|plus petite][1|chaise][3|bleue]qui[5|tire des rayons laser]quand[4|tu la croques]ARTISTE."
    ]
};
const velScale	= 10;
const debug = false;
let game;
let gui = null;
//Gamestate : -2 = Review de la partie, -1 = lobby + review des parties précédentes si voulu, 1... = en partie
let gameState = -1;
let prompteur=null
let currentSelect='Artifactory';
let indexPlayer=-1
let backgroundMusicMain, backgroundMusicGame, backgroundMusicReview;
//Music by <a href="https://pixabay.com/users/sonican-38947841/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=441293">Dvir Silverstone</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=441293">Pixabay</a>
//Music by <a href="https://pixabay.com/users/echo-media-47609404/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=295742">Echo-Media</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=295742">Pixabay</a>
//Music by <a href="https://pixabay.com/users/music_for_videos-26992513/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=163377">Anastasia Chubarova</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=163377">Pixabay</a>
let soundEffWriting, soundEffNext;
//Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=82822">freesound_community</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=82822">Pixabay</a>
//Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=84424">freesound_community</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=84424">Pixabay</a>
// <----

function processScript(strKey){
  if (LOADER[strKey]){
    prompteur={}
    let tempId=0
    while (LOADER[strKey][0].slice(tempId).search(/\[/)!=-1){
      tempId+=LOADER[strKey][0].slice(tempId).search(/\[/)+1;
      let tempFocus=LOADER[strKey][0].slice(tempId).split(/\]/)[0];
      prompteur[tempFocus.split("|")[0]]=[tempFocus.split("|")[1],tempFocus.split("|")[2]];
    }
  }
  else (console.log("ERREUR"));
}


function preload() {
  setupHost();
  soundFormats("mp3")
  backgroundMusicMain=loadSound("/music/comedy-piano");
  backgroundMusicGame=loadSound("/music/silly-escapade");
  backgroundMusicReview=loadSound("/music/positive-world");
  soundEffNext=loadSound("/music/ping");
  soundEffWriting=loadSound("/music/pencil");
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  gui = createGui();
  // Host/Game setup here. ---->
  
  game = new Game(width, height);
  
  backgroundMusicMain.play();
  backgroundMusicMain.loop();
  backgroundMusicMain.setVolume(0.1);
  backgroundMusicGame.setVolume(0.1);
  backgroundMusicReview.setVolume(0.1);
  soundEffNext.setVolume(0.1);
  soundEffWriting.setVolume(0.1);
  userStartAudio();

  button = createButton("Start", width/2-200, height-110, 400, 100);
    button.setStyle({
    textSize: 40,
    fillBg: color(130, 210, 100),
    fillBgHover: color(100, 220, 100),
    fillBgActive: color(70, 150, 70)
  });
  button.onPress = onButtonHostPress;
  // <----
}

function reviewContinue(){
  indexPlayer++;
  if (indexPlayer>game.currentPlayers.length){
    gameState=-1
	
	backgroundMusicReview.stop();
	backgroundMusicMain.play();
	backgroundMusicMain.loop();
	
    button.setStyle({
    textSize: 40,
    fillBg: color(130, 210, 100),
    fillBgHover: color(100, 220, 100),
    fillBgActive: color(70, 150, 70)
    });
    button.onPress = onButtonHostPress;
    button.label="Start";
  }
}

function onButtonHostPress() {
  let statusReady = true;
  for (let id in game.players) {
    if (!game.players[id].status){statusReady = false}}
  if (statusReady){
    gameState = 1;
    processScript(currentSelect);
    let data = {
      button: button.val,
      prompt: prompteur[gameState][0], //générer le prompt à partir de gamestate et ce qui est sélectionné
      addition: prompteur[gameState][1]
    }
    let tempList=[]
    for (let id in game.players) {
      game.players[id].currentGame[currentSelect]={};
      tempList.push(id);
    }
    sendData('buttonHost', data);
    game.currentPlayers=[]
    let n;
    while (tempList.length>0){
      n=parseInt(0,tempList.length);
      game.currentPlayers.push(tempList.splice(n,1)[0])
    }
	
	backgroundMusicMain.stop();
	backgroundMusicGame.play();
	backgroundMusicGame.loop();
	
    button.onPress=null;
    button.label="In Game"
    button.setStyle({
    fillBg: color(100, 100, 100),
    fillBgHover: color(100, 100, 100),
    fillBgActive: color(100, 100, 100)
  });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw () {
  background(15);

  if(isHostConnected(display=true)) {
    // Host/Game draw here. --->
    drawGui();
    // Display player IDs in top left corner
    game.printPlayerIds(5, 20);

    // Update and draw game objects
    game.draw();

    // <----
    
    // Display server address
    displayAddress();
    if (prompteur && prompteur[gameState]){
      printExample(currentSelect,gameState)
    }
    if (gameState==-2 && indexPlayer>=0){
      showPrompt();
    }
  }
}

function printExample(strKey,id){
  noStroke();
	let x0=0;
  let y0=0;
	let tempId=0;
  let words=null;
  
  fill(255,0,0);
  textFont('Verdana',100);
  text("Exemple :", windowWidth*0.1, 100);

  textFont('Verdana',40);
  //je peux mettre un font ici
  while (LOADER[strKey][1].slice(tempId).search(/\[/)!=-1){
    words = LOADER[strKey][1].slice(tempId,tempId+LOADER[strKey][1].slice(tempId).search(/\[/)).split(' ');
    fill(255,255,255);
    for (let i=0;i<words.length;i++){
      if (x0+textWidth(words[i]+' ')<windowWidth*0.8){
        text(words[i],windowWidth*0.1+x0,160+y0);
        x0+=textWidth(words[i]+' ');
      }
      else {
        x0=0;
        y0+=60;
        text(words[i],windowWidth*0.1+x0,160+y0);
        x0+=textWidth(words[i]+' ');
      }
    }

    tempId+=LOADER[strKey][1].slice(tempId).search(/\[/)+1;
    let tempFocus=LOADER[strKey][1].slice(tempId).split(/\]/)[0];
    //Jai la section de texte dans tempFocus[1] et son ID en 0
    words = tempFocus.split('|')[1].split(' ');
    if (tempFocus.split('|')[0]==String(id)){
      fill(255,0,0);
    }
    else{
      fill(255,255,255);
    }
    for (let i=0;i<words.length;i++){
      if (x0+textWidth(words[i]+' ')<windowWidth*0.8){
        text(words[i],windowWidth*0.1+x0,160+y0);
        x0+=textWidth(words[i]+' ');
      }
      else {
        x0=0;
        y0+=60;
        text(words[i],windowWidth*0.1+x0,160+y0);
        x0+=textWidth(words[i]+' ');
      }
    }
    tempId+=LOADER[strKey][1].slice(tempId).search(/\]/)+1;
    
  }
  //Il devrait rester encore une section blanche qui manque après
}

function showPrompt(){
  noStroke();
	let x0=0;
  let y0=0;
	let tempId=0;
  let words=null;
  let tempFocus;
  let tempPlayerIndex;
  textFont('Verdana',40);
  //je peux mettre un font ici
  while (LOADER[currentSelect][0].slice(tempId).search(/\[|\(/)!=-1){
    words = LOADER[currentSelect][0].slice(tempId,tempId+LOADER[currentSelect][0].slice(tempId).search(/\[|\(/)).split(' ');
    fill(255,255,255);
    for (let i=0;i<words.length;i++){
      if (x0+textWidth(words[i]+' ')<windowWidth*0.8){
        text(words[i],windowWidth*0.1+x0,160+y0);
        x0+=textWidth(words[i]+' ');
      }
      else {
        x0=0;
        y0+=60;
        text(words[i],windowWidth*0.1+x0,160+y0);
        x0+=textWidth(words[i]+' ');
      }
    }

    tempId+=LOADER[currentSelect][0].slice(tempId).search(/\[|\(/)+1;
    if (LOADER[currentSelect][0][tempId-1]=='('){
      tempFocus=LOADER[currentSelect][0].slice(tempId).split(/\)/)[0];
      tempPlayerIndex=parseInt(LOADER[currentSelect][0]
        .split("|"+tempFocus+"]")[0]
        .split('[')[LOADER[currentSelect][0].split("|"+tempFocus+"]")[0].split('[').length-1]
        .split('|')[0])-1;
      words = game.players[game.currentPlayers[(indexPlayer+tempPlayerIndex)%game.currentPlayers.length]]
                    .currentGame[currentSelect][tempFocus]
                      .split(' ');
      
      fill(game.players[game.currentPlayers[(indexPlayer+tempPlayerIndex)%game.currentPlayers.length]].color)

      for (let i=0;i<words.length;i++){
        if (x0+textWidth(words[i]+' ')<windowWidth*0.8){
          text(words[i],windowWidth*0.1+x0,160+y0);
          x0+=textWidth(words[i]+' ');
        }
        else {
          x0=0;
          y0+=60;
          text(words[i],windowWidth*0.1+x0,160+y0);
          x0+=textWidth(words[i]+' ');
        }
      }
      tempId+=LOADER[currentSelect][0].slice(tempId).search(/\)/)+1;
    }
    else{
      tempFocus=LOADER[currentSelect][0].slice(tempId).split(/\]/)[0];
      tempPlayerIndex=parseInt(tempFocus.split('|')[0])-1;
      words = game.players[game.currentPlayers[(indexPlayer+tempPlayerIndex)%game.currentPlayers.length]]
                    .currentGame[currentSelect][tempPlayerIndex+1]
                      .split(' ');
      fill(game.players[game.currentPlayers[(indexPlayer+tempPlayerIndex)%game.currentPlayers.length]].color)

      for (let i=0;i<words.length;i++){
        if (x0+textWidth(words[i]+' ')<windowWidth*0.8){
          text(words[i],windowWidth*0.1+x0,160+y0);
          x0+=textWidth(words[i]+' ');
        }
        else {
          x0=0;
          y0+=60;
          text(words[i],windowWidth*0.1+x0,160+y0);
          x0+=textWidth(words[i]+' ');
        }
      }
      tempId+=LOADER[currentSelect][0].slice(tempId).search(/\]/)+1;
    }
    
  }
  //Il devrait rester encore une section blanche qui manque après
}

function onClientConnect (data) {
  // Client connect logic here. --->

  if (!game.checkId(data.id)) {
    game.add(data.id,
            random(0.25*width, 0.75*width),
            random(0.25*height, 0.75*height),
            60, 60
    );
  }

  // <----
}

function onClientDisconnect (data) {
  // Client disconnect logic here. --->

  if (game.checkId(data.id)) {
    game.remove(data.id);
  }

  // <----
}

function onReceiveData (data) {
  // Input data processing here. --->
  if (data.type === 'button') {
    processButton(data);
  }
  else if (data.type === 'txtChange') {
    processTxt(data);
	soundEffWriting.play();
	soundEffWriting.setLoop(false);
  }
  else if (data.type === 'playerColor') {
    game.setColor(data.id, data.r*255, data.g*255, data.b*255);
  }

  // <----

  /* Example:
     if (data.type === 'myDataType') {
       processMyData(data);
     }

     Use `data.type` to get the message type sent by client.
  */
}

////////////
// Input processing

function processButton (data) {
  game.players[data.id].status = data.button;

  if (gameState>0){
    let statusReady = true;
    for (let id in game.players) {
      if (!game.players[id].status){statusReady = false}}
    if (statusReady){
      gameState += 1;
      if (prompteur[gameState]){
        let data = {
          button: button.val,
          prompt: prompteur[gameState][0],
          addition: prompteur[gameState][1]
        }
        
        sendData('buttonHost', data);
      }
      else {
        gameState=-2
        indexPlayer=-1
			
		backgroundMusicGame.stop();
		backgroundMusicReview.play();
		backgroundMusicReview.loop();
		
        button.onPress=reviewContinue;

        button.label="Next"
        button.setStyle({
        fillBg: color(130, 210, 100),
        fillBgHover: color(100, 220, 100),
        fillBgActive: color(70, 150, 70)
      });
      }
    }
  }
  if (debug) {
    console.log(data.id + ': ' +
                data.button);
  }
}

function processTxt (data) {
  if (gameState<0){
    game.players[data.id].displayName = data.contenu;
    draw();
  }
  else{
    if (gameState>0){
      game.players[data.id].currentGame[currentSelect][gameState] = data.contenu;
      if (prompteur[gameState][1]){
        game.players[data.id].currentGame[currentSelect][prompteur[gameState][1]] = data.contenu2;
      }
      
    }  
  }
}

////////////
// Game
// This simple placeholder game makes use of p5.play
class Game {
  constructor (w, h) {
    this.w          = w;
    this.h          = h;
    this.players	= {};
    this.numPlayers	= 0;
    this.id         = 0;
    this.colliders	= new Group();
    this.currentPlayers=null;
  }

  add (id, x, y, w, h) {
    this.players[id] = createSprite(x, y, w, h);
    this.players[id].id = "p"+this.id;
    //this.players[id].setCollider("rectangle", 0, 0, w, h);
    this.players[id].color = color(255, 255, 255);
    //this.players[id].shapeColor = color(255, 255, 255);
    //this.players[id].scale = 1;
    //this.players[id].mass = 1;
    this.players[id].displayName = this.players[id].id;
    this.players[id].status=false;
    this.players[id].currentGame={};
    //this.colliders.add(this.players[id]);
    print(this.players[id].id + " added.");
    this.id++;
    this.numPlayers++;
  }

  draw() {
    //this.checkBounds();
    //drawSprites();
  }

  setColor (id, r, g, b) {
    this.players[id].color = color(r, g, b);
    this.players[id].shapeColor = color(r, g, b);

    print(this.players[id].id + " color added.");
  }

  remove (id) {
      this.colliders.remove(this.players[id]);
      this.players[id].remove();
      delete this.players[id];
      this.numPlayers--;
  }

  checkId (id) {
      if (id in this.players) { return true; }
      else { return false; }
  }

  printPlayerIds (x, y) {
      push();
          noStroke();
          fill(255);
          textSize(16);
          text("# players: " + this.numPlayers, x, y);

          y = y + 16;
          for (let id in this.players) {
            fill(200);
            let charVal="[X] "
            if (this.players[id].status){
              fill(255);
              charVal="[V] "
            }
              text(charVal+this.players[id].displayName, x, y);
              y += 16;
          }

      pop();
  }

  /*setVelocity(id, velx, vely) {
      this.players[id].velocity.x = velx;
      this.players[id].velocity.y = vely;
  }*/

  /*checkBounds() {
      for (let id in this.players) {

          if (this.players[id].position.x < 0) {
              this.players[id].position.x = this.w - 1;
          }

          if (this.players[id].position.x > this.w) {
              this.players[id].position.x = 1;
          }

          if (this.players[id].position.y < 0) {
              this.players[id].position.y = this.h - 1;
          }

          if (this.players[id].position.y > this.h) {
              this.players[id].position.y = 1;
          }
      }
  }*/
}

/* A simple pair of classes for generating ripples
class Ripples {
  constructor() {
    this.ripples = [];
  }

  add(x, y, r, duration, rcolor) {
    this.ripples.push(new Ripple(x, y, r, duration, rcolor));
  }

  draw() {
    for (let i = 0; i < this.ripples.length; i++) {
      // Draw each ripple in the array
      if(this.ripples[i].draw()) {
        // If the ripple is finished (returns true), remove it
        this.ripples.splice(i, 1);
      }
    }
  }
}

class Ripple {
  constructor(x, y, r, duration, rcolor) {
    this.x = x;
    this.y = y;
    this.r = r;

    // If rcolor is not defined, default to white
    if (rcolor == null) {
      rcolor = color(255);
    }

    this.stroke = rcolor;
    this.strokeWeight = 3;

    this.duration = duration;   // in milliseconds
    this.startTime = millis();
    this.endTime = this.startTime + this.duration;
  }

  draw() {
    let progress = (this.endTime - millis())/this.duration;
    let r = this.r*(1 - progress);

    push();
      stroke(red(this.stroke), 
             green(this.stroke), 
             blue(this.stroke), 
             255*progress);
      strokeWeight(this.strokeWeight);
      fill(0, 0);
      ellipse(this.x, this.y, r);
    pop();

    if (millis() > this.endTime) {
      return true;
    }

    return false;
  }
}*/