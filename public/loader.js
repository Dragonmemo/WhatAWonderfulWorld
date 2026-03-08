const LOADER = {
	Artifactory_FR:
    [
      "J'ai trouvé un artefact, c'est(DETERMINANT)[2|Donne un adjectif qui précède un nom :|][1|Donne un objet (la première boite de texte est pour le déterminant, ex : le/la/les):|DETERMINANT][3|Donne un adjectif qui suit un nom :|]qui[5|Donne un effet (qui ...):|]quand[4|Donne une action (quand ...):|]",
      "J'ai trouvé un artefact, c'est[1|la][2|plus petite][1|chaise][3|bleue]qui[5|tire des rayons laser]quand[4|tu la croques]."
    ],
	Artifactory_EN:
	[
	  "I found an artefact, it's (DETERMINANT)[2|Give an adjective preceding the name :|][1|Give an objet (the first textbox is for the determinant, ex : a/an/the):|DETERMINANT][3|Give an adjective that follows the name :|]which[5|Give it an effect (which ...):|]when[4|Give it an action (when ...):|]",
	  "I found an artefact, it's [1|the][2|smallest][1|chair][3|that is blue]which[5|shoot lasers]when[4|you nibble on it]."
	]
};
