////////////
// Network Settings
// const serverIp      = 'https://yourservername.herokuapp.com';
// const serverIp      = 'https://yourprojectname.glitch.me';
const serverIp      = 'waww.up.railway.app';
const serverPort    = '3000';
const local         = false;   // true if running locally, false
                              // if running on remote server

// Global variables here. ---->

// Initialize GUI related variables
let gui         = null;
let button      = null;

let writeBox = null;
let writeBox2 = null;
let promptElement = null;
let testValue=-1;

// Initialize Game related variables
let playerColor;
let playerColorDim;

// <----

function preload() {
  setupClient();
}

function setup() {
  createCanvas(windowWidth*0.5, windowHeight*0.2);

  setPlayerColors();
  setupUI();
  
  sendData('playerColor', { 
    r: red(playerColor)/255,
    g: green(playerColor)/255,
    b: blue(playerColor)/255
  });
} 

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  if(isClientConnected(display=true)) {
    // Client draw here. ---->

    drawGui();

    // <---
  }
}

// Messages can be sent from a host to all connected clients
function onReceiveData (data) {
  if (data.type === 'buttonHost') {
	  testValue=data.testValue;
    promptElement.innerHTML=data.prompt;
    writeBox.value=null;
    if (data.addition){
      writeBox2.removeAttribute("hidden")
    }
    else{
      writeBox2.setAttribute("hidden",true);
    }
    writeBox2.value=null;
    onButtonPress();
  }
    if (data.type === 'reload' && data.pseudo==writebox.innerHTML && testValue==-1) {
		testValue=data.testValue;
		promptElement.innerHTML=data.prompt;
		writeBox.value=null;
		if (data.addition){
		  writeBox2.removeAttribute("hidden")
		}
		else{
		  writeBox2.setAttribute("hidden",true);
		}
		writeBox2.value=null;
		onButtonPress();
		//Et on modifie la couleur du bouton/interface
		playerColor=data.couleur;
		
  }
}

////////////
// GUI setup
function setPlayerColors() {
  let hue = random(0, 360);
  colorMode(HSB);
  playerColor = color(hue, 100, 100);
  playerColorDim = color(hue, 100, 75);
  colorMode(RGB);
}

function setupUI() {
  // Temp variables for calculating GUI object positions
  /*let bX, bY, bW, bH;
  
  // Rudimentary calculation based on portrait or landscape 
  if (width < height) {
    bX = 0.05*windowWidth;
    bY = 0.75*windowHeight;
    bW = 0.9*windowWidth;
    bH = 0.2*windowHeight;
  }
  else {    
    bX = 0.75*windowWidth;
    bY = 0.05*windowHeight;
    bW = 0.2*windowWidth;
    bH = 0.9*windowHeight;
  }
  
  // Create joystick and button, stylize with player colors
  
  button = createButton("Ready ?", bX, bY, bW, bH);*/
  button= document.getElementById("BUTTON")
  button.style="font-size:40px;background:"+playerColorDim+";";
  button.onclick = onButtonPress;
  writeBox= document.getElementById("story");
  writeBox.addEventListener("input", onTextBoxChange);
  writeBox2= document.getElementById("adder");
  writeBox2.addEventListener("input", onTextBoxChange);
  promptElement =  document.getElementById("prompt");
  promptElement.innerHTML="Écris ton nom :";
}

////////////
// Input processing

function onButtonPress() {
  let data;
  if (writeBox.attributes.getNamedItem("disabled")){
    data = {
      button: false
    }
    writeBox.removeAttribute("disabled");
    button.innerHTML = "Ready ?";
  }
  else {
    data = {
      button: true,
	  reconnectValue: testValue
    }
    document.getElementById("story").setAttribute("disabled", "true");
    button.innerHTML = "Not Ready ?";
  }
  sendData('button', data);

  
}

function onTextBoxChange(){
  let data = {
    contenu: writeBox.value,
    contenu2: writeBox2.value
  }

  sendData('txtChange', data);
}