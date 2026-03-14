const LOADER = {
	"Artifactory FR":
    [
      "J'ai trouvé un artefact, c'est(DETERMINANT)[2|Donne un adjectif qui précède un nom :|][1|Donne un objet (la première boite de texte est pour le déterminant, ex : le/la/les):|DETERMINANT][3|Donne un adjectif qui suit un nom :|]qui[5|Donne un effet (qui ...):|]quand[4|Donne une action (quand ...):|]",
      "J'ai trouvé un artefact, c'est[1|la][2|plus petite][1|chaise][3|bleue]qui[5|tire des rayons laser]quand[4|tu la croques]."
    ],
	"ComploTYSM FR":
    [
      "Nouvelle théorie du complot :[1|Donne l'objet concerné par la théorie :|][2|Donne un verbe qui impact l'objet de la théorie :|][3|Donne le complément de l'objet de la première phrase :|]. En effet, si[4|Donne un objet prouvant la théorie :|][5|Donne un verbe (et un complément si nécessaire) prouvant la théorie :|]c'est parce que[4|Donne un objet prouvant la théorie :|][6|Donne une justification montrant que l'objet prouvant la théorie affecte l'objet de la théorie :|][1|Donne l'objet concerné par la théorie :|].",
      "Nouvelle théorie du complot :[1|la Terre][2|est][3|plate]. En effet, si[4|le soleil][5|disparait]c'est parce que[4|le soleil][6|passe en dessous de][1|la Terre]."
    ],
	"Artifactory EN":
	[
	  "I found an artefact, it's (DETERMINANT)[2|Give an adjective preceding the name :|][1|Give an objet (the first textbox is for the determinant, ex : a/an/the):|DETERMINANT][3|Give an adjective that follows the name :|]which[5|Give it an effect (which ...):|]when[4|Give it an action (when ...):|]",
	  "I found an artefact, it's [1|the][2|smallest][1|chair][3|that is blue]which[5|shoot lasers]when[4|you nibble on it]."
	]
};
