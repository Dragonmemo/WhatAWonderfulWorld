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
//const serverIp      = '127.0.0.1';
const serverIp      = 'waww.up.railway.app';
const serverPort    = '3000';
const local         = false;   // true if running locally, false
                              // if running on remote server

// Global variables here. ---->

const velScale	= 10;
const debug = false;
let game;
let gui = null;
//Gamestate : -2 = Review de la partie, -1 = lobby + review des parties précédentes si voulu, 1... = en partie
let gameState = -1;
let prompteur=null
let currentSelect='';
let filteredList={};
let lang="FR";
let musicVal=1;
let indexPlayer=-1
let backgroundMusicMain, backgroundMusicGame, backgroundMusicReview;
//Music by <a href="https://pixabay.com/users/sonican-38947841/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=441293">Dvir Silverstone</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=441293">Pixabay</a>
//Music by <a href="https://pixabay.com/users/echo-media-47609404/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=295742">Echo-Media</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=295742">Pixabay</a>
//Music by <a href="https://pixabay.com/users/music_for_videos-26992513/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=163377">Anastasia Chubarova</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=163377">Pixabay</a>
let soundEffWriting, soundEffNext;
//Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=82822">freesound_community</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=82822">Pixabay</a>
//Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=84424">freesound_community</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=84424">Pixabay</a>
let timeOutWriting=0;
let imgBG, imgButton, imgButtonLowRes, imgCenter, imgBoulette;
let mesBoulettes=[];
let arrache_me_senpai=[];
let fontCaveat, fontRockSalt;
// <----

function processScript(strKey){
  if (filteredList[strKey]){
    prompteur={}
    let tempId=0
    while (filteredList[strKey][0].slice(tempId).search(/\[/)!=-1){
      tempId+=filteredList[strKey][0].slice(tempId).search(/\[/)+1;
      let tempFocus=filteredList[strKey][0].slice(tempId).split(/\]/)[0];
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
  imgBG=loadImage("/images/BGTableau.png")
  imgButton=loadImage("/images/ButtonPostIt.png")
  imgButtonLowRes=loadImage("/images/ButtonPostItLR.png")
  imgCenter=loadImage("/images/ButtonPostIt.png")
  imgBoulette=loadImage("/images/Paper.png")
  displayQR("QRDrop");
  fontCaveat=loadFont("/images/Caveat-Regular.ttf")
  fontRockSalt=loadFont("/images/RockSalt-Regular.ttf")
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  gui = createGui();
  // Host/Game setup here. ---->
  
  game = new Game(width, height);
  
	backgroundMusicMain.play();
	backgroundMusicMain.loop();
	backgroundMusicGame.play();
	backgroundMusicGame.loop();
	backgroundMusicReview.play();
	backgroundMusicReview.loop();
	backgroundMusicMain.setVolume(0.1*musicVal);
	backgroundMusicGame.setVolume(0);
	backgroundMusicReview.setVolume(0);
	soundEffNext.setVolume(0.3);
	soundEffWriting.setVolume(0.7);
	userStartAudio();
  
  buttonLang = new PostIt(width-460, 60, 100, 100, lang, nextLang, 'rgb(255,255,200)', 'rgb(75,75,50)', 'rgb(175,175,135)', fontRockSalt)
  buttonMusic = new PostIt(width-60, height-60, 100, 100, "🎵", changeMusic, 'None', 'rgb(75,75,75)', 'rgb(175,175,175)', "Courier New")
  buttonLevel = new PostIt(width-210, 60, 400, 100, currentSelect, nextLevel, 'None', 'rgb(75,75,75)', 'rgb(175,175,175)', fontRockSalt)
  buttonNewLevel = new PostIt(width-210, 160, 400, 100, "Custom prompt", customLevel, 'None', 'rgb(75,75,75)', 'rgb(175,175,175)', fontRockSalt)
  buttonHost = new PostIt(width/2, height-60, 400, 100, "Start", onButtonHostPress, 'rgb(120,255,175)', 'rgb(60,127,87)', 'rgb(95,175,135)', fontRockSalt)
  buttonSave = new PostIt(width-160,height-60,100,100,"📸",()=>{save(Date().slice(0,24)+'.png')},'None', 'rgb(75,75,75)', 'rgb(175,175,175)',"Courier New")
  buttonSave.hiddenStatus=true;
  bgCdvr= new PostIt(width/2, height*5/12, width/2, height*5/6, "", ()=>{}, 'None', 'None', 'None', "Courier New")
  bgOther= new PostIt(width*7/8, height/2, width/4, height*2/3, "", ()=>{}, 'None', 'None', 'None', "fontRockSalt")
  bgOther.hiddenStatus=true;
  // <----
}

function reviewContinue(){
    arrache()
    indexPlayer++;
	arrache()
    if (indexPlayer==game.currentPlayers.length){
        gameState=-1
        backgroundMusicReview.setVolume(0);
        backgroundMusicMain.setVolume(0.1*musicVal);
        
        let data = {
            button: 1,
            prompt: "Écris ton nom :"
        }        
        sendData('Restart', data);
        
        buttonHost.func = onButtonHostPress;
        buttonHost.content="Start";
        buttonHost.throwStay();
        buttonHost.hiddenStatus=false;
        buttonLang.hiddenStatus=false;
        buttonLevel.hiddenStatus=false;
        buttonNewLevel.hiddenStatus=false;
        buttonSave.throwAway();
        bgCdvr.throwStay()
        bgOther.throwStay()
    
    
        //On remet tous les joueurs en attente dans la liste des joueurs actifs
        for (let id in game.tempPlayers) {
            game.add(id);
            game.players[id].color=game.tempPlayers[id].color;
        }
        game.tempPlayers={};
    }
}

function nextLevel(){
	if (gameState==-1){
        arrache()
		let levelList=[];
		for (let key in filteredList){
			levelList.push(key);
		}
		let idx=levelList.indexOf(currentSelect);
		currentSelect=levelList[(idx+1)%levelList.length];
		buttonLevel.content=currentSelect
        buttonLevel.throwStay();
        bgCdvr.throwStay();
	}
}

function nextLang(){
    arrache()
	if (gameState==-1){
		let idx=["FR","EN","Custom"].indexOf(lang);
		lang=["FR","EN","Custom"][(idx+1)%3];
		buttonLang.content=lang
		buttonLang.throwStay()
        bgCdvr.throwStay()
		reloadLevelsList()
	}
}

function changeMusic(){
	musicVal=1-musicVal;
	if (musicVal==1){
		buttonMusic.content="🎵"
        buttonMusic.throwStay();
		switch (gameState){
			case -1:
				backgroundMusicMain.setVolume(0.1*musicVal);
				break;
			case -2:
				backgroundMusicReview.setVolume(0.1*musicVal);
				break;
			default:
				backgroundMusicGame.setVolume(0.1*musicVal);
		}
	}
	else {
		buttonMusic.content="🔇"
        buttonMusic.throwStay();
		backgroundMusicMain.setVolume(0);
		backgroundMusicGame.setVolume(0);
		backgroundMusicReview.setVolume(0);
	}
}
//recuperer ce que j'ai fait sur furlist
function reloadLevelsList(){
	filteredList={}
	let playCount=0;
	for (let id in game.players) {
		playCount++;
	}
	for (let idx = 0; idx<LOADER.length; idx++){
		if ((LOADER[idx][0]==lang || LOADER[idx][0]=="Custom") && playCount>=LOADER[idx][1] && (playCount<=LOADER[idx][2] || LOADER[idx][2]==-1)){
			filteredList[LOADER[idx][3]]=LOADER[idx][4]
		}
	}
}

function customLevel(){
    arrache()
	if (gameState==-1){
        let levelName = prompt("Give a name to your custom prompt")
        let promptContents = prompt("Give the structure of your custom prompt | See tutorial : https://waww.up.railway.app/tutorial.html")
        let promptExample = prompt("Give an example to your custom prompt | See tutorial : https://waww.up.railway.app/tutorial.html")
        
        LOADER[levelName]=["Custom",-1,-1,promptContents,promptExample];
        currentSelect=levelName;
        buttonLevel.content=currentSelect
        buttonLevel.throwStay();

	}
}

function onButtonHostPress() {
  let statusReady = true;
  let playCount=0;
  for (let id in game.players) {
    playCount++;
	if (!game.players[id].status){statusReady = false}}
  if (statusReady && playCount>1 && filteredList[currentSelect]){
    gameState = 1;
    arrache()
    processScript(currentSelect);
    let data = {
      button: 1,
	  testValue: 2,
      prompt: prompteur[gameState][0],
	  exemple: filteredList[currentSelect][1],
	  exID: gameState
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
	
	backgroundMusicMain.setVolume(0);
	backgroundMusicGame.setVolume(0.1*musicVal);
	
	soundEffNext.play();
	soundEffNext.setLoop(false);
	
    buttonHost.throwAway();
	buttonLang.throwAway();
	buttonLevel.throwAway();
	buttonNewLevel.throwAway();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw () {
	background(imgBG);
	//console.log(buttonLang.mouseIsPressed)

  if(isHostConnected(display=true)) {
    // Host/Game draw here. --->
    drawGui();
    bgCdvr.update()
    bgOther.update()
	buttonLang.update()
	buttonMusic.update()
	buttonLevel.update()
	buttonNewLevel.update()
	buttonHost.update()
    buttonSave.update()
	// Display player IDs in top left corner
	image(imgButton,0, 0, width/4, height*5/6)
    game.printPlayerIds(5, 20);
	
    // Update and draw game objects
    //game.draw();

    // <----
    
    // Display server address
    for (var idx = 0; idx< arrache_me_senpai.length; idx++){
        arrache_me_senpai[idx].update();
    }
    if (prompteur && prompteur[gameState]){
      printExample(currentSelect,gameState)
    }
    if (gameState==-2 && indexPlayer>=0){
      showPrompt();
    }
	if (gameState==-1 && filteredList[currentSelect]){
      showExample();
    }
    for (var idx = 0; idx< mesBoulettes.length; idx++){
        mesBoulettes[idx].draw()
        if (mesBoulettes[idx].y>width+300){
            delete mesBoulettes.splice(idx,1)[0]
            idx--
        }
    }
	
  }
}

function printExample(strKey,id){
	noStroke();
	let x0=10;
	let y0=0;
	let tempId=0;
	let words=null;
    let boolPostItToRemove=(arrache_me_senpai.length==0)
	fill(0);        
    textAlign(LEFT, TOP)
	textFont(fontCaveat,100);
	text("Exemple :", width/4, 100);
	
	textFont(fontRockSalt,40);
	//je peux mettre un font ici
	while (filteredList[strKey][1].slice(tempId).search(/\[/)!=-1){
    words = filteredList[strKey][1].slice(tempId,tempId+filteredList[strKey][1].slice(tempId).search(/\[/)).split(' ');
    fill(0);
    for (let i=0;i<words.length;i++){
        if (x0+textWidth(words[i]+' ')>=width/2){
            x0=10;
            y0+=60;
        }
        text(words[i],width/4+x0,160+y0);
        x0+=textWidth(words[i]+' ');
    }

    tempId+=filteredList[strKey][1].slice(tempId).search(/\[/)+1;
    let tempFocus=filteredList[strKey][1].slice(tempId).split(/\]/)[0];
    //Jai la section de texte dans tempFocus[1] et son ID en 0
    words = tempFocus.split('|')[1].split(' ');
    for (let i=0;i<words.length;i++){
        if (x0+textWidth(words[i]+' ')>=width/2){
            x0=10;
            y0+=60;
        }
        if (boolPostItToRemove && tempFocus.split('|')[0]==String(id)){
            arrache_me_senpai.push(new PostIt(width/4+x0+textWidth(words[i])/2,180+y0, textWidth(words[i])+4, 44, "", ()=>{}, 'rgb(255,175,175)', 'rgb(255,175,175)', 'rgb(255,175,175)', "Courier New"))
        }
        text(words[i],width/4+x0,160+y0);
        x0+=textWidth(words[i]+' ');
    }
    tempId+=filteredList[strKey][1].slice(tempId).search(/\]/)+1;
    
  }
  //Il devrait rester encore une section blanche qui manque après
}

function showExample(){
    noStroke();
    let x0=10;
    let y0=0;
    let tempId=0;
    let words=null;
    let tempFocus;
    let tempPlayerIndex;
    let boolPostItToRemove=(arrache_me_senpai.length==0)
    textFont(fontRockSalt,20);
    textAlign(LEFT, TOP)
    //je peux mettre un font ici
    fill(0);
    while (filteredList[currentSelect][1].slice(tempId).search(/\[/)!=-1){
        words = filteredList[currentSelect][1].slice(tempId,tempId+filteredList[currentSelect][1].slice(tempId).search(/\[/)).split(' ');
        for (let i=0;i<words.length;i++){
            if (x0+textWidth(words[i]+' ')>=width/2){
                x0=10;
                y0+=60;
            }
            text(words[i],width/4+x0,160+y0);
            x0+=textWidth(words[i]+' ');
        }

        tempId+=filteredList[currentSelect][1].slice(tempId).search(/\[/)+1;
        tempFocus=filteredList[currentSelect][1].slice(tempId).split(/\]/)[0];
        tempPlayerIndex=parseInt(tempFocus.split('|')[0])-1;
        words = tempFocus.split('|')[1].split(' ');

        for (let i=0;i<words.length;i++){
            if (x0+textWidth(words[i]+' ')>=width/2){
                x0=10;
                y0+=60;
            }
            if (boolPostItToRemove){
                colorMode(HSB);
                arrache_me_senpai.push(new PostIt(width/4+x0+textWidth(words[i])/2,180+y0, textWidth(words[i])+4, 44, "", ()=>{}, color(360*tempPlayerIndex*(Math.sqrt(5)/2-0.5)%360,75,100), color(360*tempPlayerIndex*(Math.sqrt(5)/2-0.5)%360,75,100), color(360*tempPlayerIndex*(Math.sqrt(5)/2-0.5)%360,75,100), "Courier New"))
                colorMode(RGB);
            }
            text(words[i],width/4+x0,160+y0);
            x0+=textWidth(words[i]+' ');
        }
        tempId+=filteredList[currentSelect][1].slice(tempId).search(/\]/)+1;
    
    }
    //Il devrait rester encore une section blanche qui manque après
}

function showPrompt(){
    noStroke();
	let x0=10;
    let y0=0;
    let tempId=0;
    let words=null;
    let tempFocus;
    let tempPlayerIndex;
    let boolPostItToRemove=(arrache_me_senpai.length==0)
    fill(0);
    textAlign(LEFT, TOP)
    
	textFont(fontCaveat,100);
	text("Biggest Losers !", width*3/4+10, 100);
    
	textFont(fontRockSalt,20);
    //je peux mettre un font ici
    while (filteredList[currentSelect][0].slice(tempId).search(/\[/)!=-1){
        words = filteredList[currentSelect][0].slice(tempId,tempId+filteredList[currentSelect][0].slice(tempId).search(/\[|\(/)).split(' ');
        for (let i=0;i<words.length;i++){
            if (x0+textWidth(words[i]+' ')>=width/2){
                x0=10;
                y0+=60;
            }
            text(words[i],width/4+x0,160+y0);
            x0+=textWidth(words[i]+' ');
        }

        tempId+=filteredList[currentSelect][0].slice(tempId).search(/\[/)+1;
        tempFocus=filteredList[currentSelect][0].slice(tempId).split(/\]/)[0];
        tempPlayerIndex=parseInt(tempFocus.split('|')[0])-1;
        try{
            words = game.players[game.currentPlayers[(indexPlayer+tempPlayerIndex)%game.currentPlayers.length]]
                    .currentGame[currentSelect][tempPlayerIndex+1]
                      .split(' ');
        }catch(erreur){words=["[REDACTED]"]}
        //fill(game.players[game.currentPlayers[(indexPlayer+tempPlayerIndex)%game.currentPlayers.length]].color)

        for (let i=0;i<words.length;i++){
            if (x0+textWidth(words[i]+' ')>=width/2){
                x0=10;
                y0+=60;
            }
            if (boolPostItToRemove){
                colorMode(HSB);
                arrache_me_senpai.push(new PostIt(width/4+x0+textWidth(words[i])/2,180+y0, textWidth(words[i])+4, 44, "", ()=>{}, color(360*tempPlayerIndex*(Math.sqrt(5)/2-0.5)%360,75,100), color(360*tempPlayerIndex*(Math.sqrt(5)/2-0.5)%360,75,100), color(360*tempPlayerIndex*(Math.sqrt(5)/2-0.5)%360,75,100), "Courier New"))
                colorMode(RGB);
            }
            text(words[i],width/4+x0,160+y0);
            x0+=textWidth(words[i]+' ');
        }
        if (boolPostItToRemove){
            colorMode(HSB);
            arrache_me_senpai.push(
                new PostIt(width*7/8+textWidth(
                    game.players[game.currentPlayers[(indexPlayer+tempPlayerIndex)%game.currentPlayers.length]].displayName
                )/2,180+60*tempPlayerIndex, textWidth(
                    game.players[game.currentPlayers[(indexPlayer+tempPlayerIndex)%game.currentPlayers.length]].displayName
                )+4, 44, 
                    game.players[game.currentPlayers[(indexPlayer+tempPlayerIndex)%game.currentPlayers.length]].displayName
                , ()=>{}, 
                color(360*tempPlayerIndex*(Math.sqrt(5)/2-0.5)%360,75,100), 
                color(360*tempPlayerIndex*(Math.sqrt(5)/2-0.5)%360,75,100), 
                color(360*tempPlayerIndex*(Math.sqrt(5)/2-0.5)%360,75,100), fontRockSalt))
            colorMode(RGB);
        }
        tempId+=filteredList[currentSelect][0].slice(tempId).search(/\]/)+1;
    }
    //Il devrait rester encore une section blanche qui manque après
}

function arrache(){
    for (var idx=0; idx<arrache_me_senpai.length; idx++){
        arrache_me_senpai[idx].throwAway()
        delete arrache_me_senpai[idx]
    }
    arrache_me_senpai=[]
}

function onClientConnect (data) {
  // Client connect logic here. --->

  if (!game.checkId(data.id)) {
    game.add(data.id);
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
	if (millis()-timeOutWriting>300){
		soundEffWriting.play();
		soundEffWriting.setLoop(false);
		timeOutWriting=millis();
	}
  }
  else if (data.type === 'playerColor' && gameState==-1) {
    game.setColor(data.id, data.r*255, data.g*255, data.b*255);
  }

}

////////////
// Input processing

function processButton (data) {
	if (gameState==-1 || data.reconnectValue!=-1){
	  game.players[data.id].status = data.button;

	  if (gameState>0){
		let statusReady = true;
		let activePlayCount=0;
		for (let id in game.players) {
		  if (!game.players[id].disconnected){
			if(!game.players[id].status){statusReady = false}
			else {activePlayCount++}
		  }
		}
		if (statusReady && activePlayCount>0){
            gameState += 1;
			arrache()
			soundEffNext.play();
			soundEffNext.setLoop(false);
			
		  //On retire les gens qui sont deconnecte a ce moment
			for (let id in game.players) {
			  if (game.players[id].disconnected){
				  game.currentPlayers.splice(game.currentPlayers.indexOf(id),1)
				game.colliders.remove(game.players[id]);
				game.players[id].remove();
				delete game.players[id];
			  }
			}
		  
		  if (prompteur[gameState]){
			let data = {
			  button: 1,
			  prompt: prompteur[gameState][0],
			  exemple: filteredList[currentSelect][1],
			  exID: gameState
			}
			sendData('buttonHost', data);
		  }
		  else {
			gameState=-2
			indexPlayer=-1
			arrache()
			for (let indexx=0; indexx<game.currentPlayers.length; indexx++){
				if (game.players[game.currentPlayers[indexx]].disconnected){
					game.currentPlayers.splice(indexx);
					indexx--;
				}
			}
				
			backgroundMusicGame.setVolume(0);
			backgroundMusicReview.setVolume(0.1*musicVal);
			
			buttonHost.func=reviewContinue;
			buttonHost.hiddenStatus=false;
			buttonHost.content="Next";
            buttonSave.hiddenStatus=false;
            bgCdvr.throwStay();
            bgOther.hiddenStatus=false;
		  }
		}
	  }
	}
	else {
		let pseudonymList=[]
		//1 ) on cherche qui se reconnecte
		for (let psId=0; psId<game.currentPlayers.length;psId++){
			pseudonymList.push(game.players[game.currentPlayers[psId]].displayName)
		}
		if (pseudonymList.findIndex((x)=>(x==data.contenu))==-1){return}
		let pseudoId=pseudonymList.findIndex((x)=>(x==data.contenu))
		if (game.players[game.currentPlayers[pseudoId]].disconnected){
			//2 ) On remplace la personne sur les différentes listes
			game.players[data.id]=game.players[game.currentPlayers[pseudoId]]
			delete game.players[game.currentPlayers[pseudoId]]
			game.currentPlayers[pseudoId]=data.id
			game.players[data.id].disconnected=false;
			
			
			//3 ) On alimente la personne pour qu'elle ait le bon texte a remplir
			let data2 = {
			  pseudo: data.contenu,
			  testValue: 2,
			  prompt: prompteur[gameState][0],
			  couleur: game.players[data.id].color,
			  exemple: filteredList[currentSelect][1],
			  exID: gameState
			}
			sendData('reload', data2);
		
		}
		
		game.players[data.id].status = data.button;

	  if (gameState>0){
		let statusReady = true;
		for (let id in game.players) {
		  if (!game.players[id].status && !game.players[id].disconnected){statusReady = false}}
		if (statusReady){
            gameState += 1;
            arrache()
			soundEffNext.play();
			soundEffNext.setLoop(false);

		  if (prompteur[gameState]){
			let data = {
			  button: 1,
			  prompt: prompteur[gameState][0],
			  exemple: filteredList[currentSelect][1],
			  exID: gameState
			}
			sendData('buttonHost', data);
		  }
		  else {
			gameState=-2
			indexPlayer=-1
			arrache()
			for (let indexx=0; indexx<game.currentPlayers.length; indexx++){
				if (game.players[game.currentPlayers[indexx]].disconnected){
					game.currentPlayers.splice(indexx);
					indexx--;
				}
			}
				
			backgroundMusicGame.setVolume(0);
			backgroundMusicReview.setVolume(0.1*musicVal);
			
			buttonHost.func=reviewContinue;
			buttonHost.hiddenStatus=false;
			buttonHost.content="Next"
            buttonSave.hiddenStatus=false;
            bgCdvr.throwStay();
            bgOther.throwStay();
		  }
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
// Boulette
class Boulette {
	constructor(posX, posY, col, size){
		this.strength=Math.random()*50;
		this.angle=Math.random()*2*Math.PI;
		this.spin=Math.random()*2-1;
		this.life=0
		this.x=posX
		this.y=posY
		this.size=size
		
		this.draw=()=>{
			if (col!='None'){
				tint(col)
			}
			translate(this.x,this.y)
			rotate(this.life*this.spin)
			image(imgBoulette,-this.size/2, -this.size/2, this.size, this.size)
			noTint()
			rotate(-this.life*this.spin)
			translate(-this.x,-this.y)
			this.x+=this.strength*Math.cos(this.angle)
			this.y+=this.strength*Math.sin(this.angle)+this.life*2
            this.life++
		}
		
		mesBoulettes.push(this)
	}
}


////////////
// ButtonPostIt
class PostIt {
	constructor (posX, posY, Width, Height, Content, Function, TintValue, PressTintValue, HoverTintValue, objFont){
		this.obj = new Sprite(posX, posY, Width, Height) 
		this.obj.layer=0
		this.content = Content;
		this.func = Function;
		this.hiddenStatus=false;
		this.tint= TintValue;
		this.pressTint= PressTintValue
		this.hoverTint= HoverTintValue
        this.imgToDraw=(Width*Height<128*128*1.5?imgButtonLowRes:imgButton)
		this.obj.draw= ()=>{
			if (this.hiddenStatus){return true;}
			if (this.pressTint!='None' && this.obj.mouseIsPressed){
				tint(this.pressTint)
			}
			else{
				if (this.hoverTint!='None' && this.obj.mouseIsOver){
					tint(this.hoverTint)
				}
				else{
					if (this.tint!='None'){
						tint(this.tint)
					}
				}
			}
			image(this.imgToDraw,this.obj.position.x-this.obj.width/2, this.obj.position.y-this.obj.height/2, this.obj.width, this.obj.height)
			noTint();
			textFont(objFont,30);
			textAlign(CENTER, CENTER)
			fill(0);
			text(this.content,this.obj.position.x-this.obj.width/2, this.obj.position.y-this.obj.height/2, this.obj.width, this.obj.height)
			
		}
		this.obj.setCollider('rectangle')
		this.obj.onMouseReleased=()=>{if (!this.hiddenStatus){this.func()}}
	}
	
	update(){
		this.obj.update()
		this.obj.draw()
		//this.obj.display()
	}
	
	throwStay(){
		new Boulette(this.obj.position.x,this.obj.position.y, this.tint, Math.sqrt(Math.sqrt(this.obj.height*this.obj.width))*10)
	}
	throwAway(){
		this.hiddenStatus=true;
		this.throwStay();
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
	this.tempPlayers={};
  }

  add (id) {
	  //Faire ici une modif pour permettre aux gens de se reconnecter
	  if (gameState==-1){
		this.players[id] = createSprite();
		this.players[id].id = "p"+this.id;
		this.players[id].color = color(255, 255, 255);
		this.players[id].displayName = this.players[id].id;
		this.players[id].status=false;
		this.players[id].disconnected=false;
		this.players[id].currentGame={};
		print(this.players[id].id + " added.");
		this.id++;
		this.numPlayers++;
		reloadLevelsList();
	  }
	  else{
		this.tempPlayers[id] = createSprite();
		this.tempPlayers[id].id = "p"+this.id;
		this.tempPlayers[id].color = color(255, 255, 255);
		this.tempPlayers[id].displayName = this.tempPlayers[id].id;
		this.tempPlayers[id].status=false;
		this.tempPlayers[id].disconnected=false;
		this.tempPlayers[id].currentGame={};
		print(this.tempPlayers[id].id + " added.");
		this.id++;
		this.numPlayers++; 
	  }
  }
  
  rejoin (rejoinId, name){
	  console.log("Je sais pas si je sers...")
  }

  draw() {
    //this.checkBounds();
    //drawSprites();
  }

  setColor (id, r, g, b) {
    this.players[id].color = color(r, g, b);

    print(this.players[id].id + " color added.");
  }

  remove (id) {
	  if (gameState==-1){
		  this.colliders.remove(this.players[id]);
		  this.players[id].remove();
		  delete this.players[id];
	  }
	  else {
		  this.players[id].disconnected=true;
	  }
	this.numPlayers--;
	reloadLevelsList();
  }

  checkId (id) {
      if (id in this.players) { return true; console.log("et moi je suis appele ?")}
      else { return false; }
  }

    printPlayerIds (x, y) {
        push();
        noStroke();
        fill(0);
        textFont(fontRockSalt,32);
        textAlign(LEFT, TOP)
        text("LOSERS", x, y);
        y = y + 64;
        textFont(fontRockSalt,16);
        let charVar=""
        let iLength;
        for (let id in this.players) {
            if (!this.players[id].status){
                charVar=this.players[id].displayName
                if (this.players[id].disconnected){
                    charVar+=" (disconnected)";  
                }
                for (iLength = 0; textWidth(charVar.slice(0,iLength))<width/4 && iLength<charVar.length+1; iLength++){}
                text(charVar.slice(0,iLength-1), x, y);
                y += 32;
            }
        }
        y = y + 32;
        textFont(fontRockSalt,32);
        text("WINNERS", x, y);
        y = y + 64;
        textFont(fontRockSalt,16);
        for (let id in this.players) {
            if (this.players[id].status){
                charVar=this.players[id].displayName
                if (this.players[id].disconnected){
                    charVar+=" (disconnected)";  
                }
                for (iLength = 0; textWidth(charVar.slice(0,iLength))<width/4 && iLength<charVar.length+1; iLength++){}
                text(charVar.slice(0,iLength-1), x, y);
                y += 32;
            }
        }
        pop();
    }

}