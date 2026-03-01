let defaultSizeX = 128;
let defaultSizeY = 128;


let CharDictionnary={};


let EnemyDictionnary={};




//let perso1 = new Sprite();

/*let playerList = new Group();
playerList.add(perso1);
*/
let currentTurn = -1;

function InitPlayerOrder(LIST){
	
}



async function endTurn(){
		
}


partyConnect(
    "https://dragonmemo.github.io/",
    "hello_party"
  );

setup = () => {

	InitPlayerPos(playerList);

	new Canvas();

};


update = () => {


	if (mouse.released('left') || kb.released('enter') || contro.released('a')) {
		//intégrer la position clavier/controller + intégrer la gestion du tactile plus tard
		//detectHover();
		//persoPrincipal.text = selected;
	}
	if (mouse.presses('left') || kb.presses('enter') || contro.presses('a')) {
		//intégrer la position clavier/controller + intégrer la gestion du tactile plus tard
		//persoPrincipal.text="Ici"
	}
	

	if (kb.presses("space")){
		endTurn();
	}


	if (mouse.presses('right')) {
		if (partyIsHost()){
			background("green")
		}
		else{
			background("blue")
		}
	}
};
