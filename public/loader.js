const LOADER = [
	["FR",5,-1,"Artifactory (M)",
    [
      "J'ai trouvé un artefact, c'est le [2|Donne un adjectif qui précède un nom :|][1|Donne un objet masculin:|][3|Donne un adjectif qui suit un nom :|]qui[5|Donne un effet (qui ...):|]quand[4|Donne une action (quand ...):|]",
      "J'ai trouvé un artefact, c'est le [2|plus petit][1|sopalin][3|bleue]qui[5|tire des rayons laser]quand[4|tu le croques]."
    ]],
	["FR",5,-1,"Artifactory (F)",
    [
      "J'ai trouvé un artefact, c'est la [2|Donne un adjectif qui précède un nom :|][1|Donne un objet féminin:|][3|Donne un adjectif qui suit un nom :|]qui[5|Donne un effet (qui ...):|]quand[4|Donne une action (quand ...):|]",
      "J'ai trouvé un artefact, c'est la [2|plus petite][1|chaise][3|bleu]qui[5|tire des rayons laser]quand[4|tu la croques]."
    ]],
	["FR",4,4,"Artifactory (M)",
    [
      "J'ai trouvé un artefact, c'est le [2|Donne un adjectif qui précède un nom :|][1|Donne un objet masculin:|]qui[4|Donne un effet (qui ...):|]quand[3|Donne une action (quand ...):|]",
      "J'ai trouvé un artefact, c'est le [2|plus petit][1|sopalin]qui[4|tire des rayons laser]quand[3|tu le croques]."
    ]],
	["FR",4,4,"Artifactory (F)",
    [
      "J'ai trouvé un artefact, c'est la [2|Donne un adjectif qui précède un nom :|][1|Donne un objet féminin:|]qui[4|Donne un effet (qui ...):|]quand[3|Donne une action (quand ...):|]",
      "J'ai trouvé un artefact, c'est la [2|plus petite][1|chaise]qui[4|tire des rayons laser]quand[3|tu la croques]."
    ]],
	["EN",5,-1,"Artifactory",
	[
	  "I found an artefact, it's the[2|Give an adjective preceding the name :|][1|Give an objet :|][3|Give an adjective that follows the name :|]which[5|Give it an effect (which ...):|]when[4|Give it an action (when ...):|]",
	  "I found an artefact, it's the[2|smallest][1|chair][3|that is blue]which[5|shoot lasers]when[4|you nibble on it]."
	]],
	["EN",4,4,"Artifactory",
	[
	  "I found an artefact, it's the[2|Give an adjective preceding the name :|][1|Give an objet :|]which[4|Give it an effect (which ...):|]when[3|Give it an action (when ...):|]",
	  "I found an artefact, it's the[2|smallest][1|chair]which[4|shoot lasers]when[3|you nibble on it]."
	]],
	["FR",6,-1,"ComploTYSM",
    [
      "Nouvelle théorie du complot :[1|Donne l'objet concerné par la théorie :|][2|Donne un verbe qui impact l'objet de la théorie :|][3|Donne le complément de l'objet de la première phrase :|]. En effet, si[4|Donne un objet prouvant la théorie :|][5|Donne un verbe (et un complément si nécessaire) prouvant la théorie :|]c'est parce que[4|Donne un objet prouvant la théorie :|][6|Donne une justification montrant que l'objet prouvant la théorie affecte l'objet de la théorie :|][1|Donne l'objet concerné par la théorie :|].",
      "Nouvelle théorie du complot :[1|la Terre][2|est][3|plate]. En effet, si[4|le soleil][5|disparait]c'est parce que[4|le soleil][6|passe en dessous de][1|la Terre]."
    ]],
	["FR",4,-1,"WYR",
	[
	  "Qu'est-ce que tu préfères entre[1|Donne un verbe à l'infinitif :|][2|Donne un complément :|]ou[3|Donne un verbe à l'infinitif :|][4|Donne un complément :|]?",
	  "Qu'est-ce que tu préfères entre[1|manger][2|une chaussure]ou[3|aspirer][4|des pâtes par le nez]?"
	]],
	["EN",4,-1,"WYR",
	[
	  "Would you rather[1|Give a verb :|][2|Give a complement :|]or[3|Give a verb :|][4|Give a complement :|]?",
	  "Would you rather[1|eat][2|a shoe]or[3|breath in][4|pastas by the nose]?"
	]],
	["FR",4,-1,"Lost",
	[
	  "Je me suis perdu[1|Donne un lieu et son adverbe :|][2|Donne un adjectif pour le lieu :|], j'ai désespérément besoin de[3|Donne une action à réaliser à l'infinitif :|]et le seul moyen pour moi d'y arriver c'est en utilisant[4|Donne un objet :|]",
	  "Je me suis perdu[1|dans un IKEA][2|infini], j'ai désespérément besoin de[3|couper une citrouille]et le seul moyen pour moi d'y arriver c'est en utilisant[4|une canne a pêche]"
	]],
	["FR",3,3,"Lost",
	[
	  "Je me suis perdu[1|Donne un lieu et son adverbe :|], j'ai désespérément besoin de[2|Donne une action à réaliser à l'infinitif :|]et le seul moyen pour moi d'y arriver c'est en utilisant[3|Donne un objet :|]",
	  "Je me suis perdu[1|dans un IKEA], j'ai désespérément besoin de[2|couper une citrouille]et le seul moyen pour moi d'y arriver c'est en utilisant[3|une canne a pêche]"
	]],
	["EN",4,-1,"Lost",
	[
	  "I just lost myself[1|Give a place and its adverb :|][2|Give an adjective for the place :|], I desperately need to[3|Give an action to do (infinitive) :|]and the only way for me to do it is by using[4|Give an object :|]",
	  "I just lost myself[1|in an IKEA][2|that is infinite], I desperately need to[3|slice a pumpkin]and the only way for me to do it is by using[4|a fishing rod]"
	]],
	["EN",3,3,"Lost",
	[
	  "I just lost myself[1|Give a place and its adverb :|], I desperately need to[2|Give an action to do (infinitive) :|]and the only way for me to do it is by using[3|Give an object :|]",
	  "I just lost myself[1|in an IKEA], I desperately need to[2|slice a pumpkin]and the only way for me to do it is by using[3|a fishing rod]"
	]],
	["FR",6,-1,"Ritual",
	[
	  "Pour[1|Un verbe pour l'action a réaliser par le rituel|][2|Un sujet pour l'action à réaliser par le rituel|]il faut réaliser un rituel qui consiste a[3|Verbe à l'infinitif|][4|Complément de l'action à réaliser pour que le rituel ait lieu|]tout en[5|Un autre verbe à l'infinitif|][6|Un autre complément de l'action à réaliser pour que le rituel ait lieu|]",
	  "Pour[1|désincarner][2|une orange]il faut réaliser un rituel qui consiste a [3|pulvériser][4|du coton sur un soutien gorge]tout en[5|chantant][6|la samba du démon]"
	]],
	["FR",3,5,"Ritual",
	[
	  "Pour[1|Une action a réaliser par le rituel|]il faut réaliser un rituel qui consiste a[2|Une première action à réaliser pour que le rituel ait lieu|]tout en[3|Une seconde action à réaliser pour que le rituel ait lieu|]",
	  "Pour[1|désincarner une orange]il faut réaliser un rituel qui consiste a [2|pulvériser du coton sur un soutien gorge]tout en[3|chantant la samba du démon]"
	]],
	["FR",2,-1,"Pour ou Contre",
	[
	  "Pour ou contre[1|Un sujet|][2|Un complément|]",
	  "Pour ou contre[1|les aspirateurs][2|kidnappant des enfants]"
	]],
	["FR",2,2,"Luggage",
	[
	  "Je pars en vacances[1|Donne un lieu|], pour cela j'emporte avec moi[2|Donne un objet|]",
	  "Je pars en vacances[1|au fond de la fosse des Mariannes], pour cela j'emporte avec moi[2|un aspirateur]"
	]],
	["FR",3,3,"Luggage",
	[
	  "Je pars en vacances[1|Donne un lieu|], pour cela j'emporte avec moi[2|Donne un objet|],[3|Donne un autre objet|]",
	  "Je pars en vacances[1|au fond de la fosse des Mariannes], pour cela j'emporte avec moi[2|un aspirateur],[3|une chaussette seule]"
	]],
	["FR",4,4,"Luggage",
	[
	  "Je pars en vacances[1|Donne un lieu|], pour cela j'emporte avec moi[2|Donne un 1er objet|],[3|Donne un 2eme objet|],[4|Donne un 3eme objet|]",
	  "Je pars en vacances[1|au fond de la fosse des Mariannes], pour cela j'emporte avec moi[2|un aspirateur],[3|une chaussette seule],[4|un épouventail]"
	]],
	["FR",5,5,"Luggage",
	[
	  "Je pars en vacances[1|Donne un lieu|], pour cela j'emporte avec moi[2|Donne un 1er objet|],[3|Donne un 2eme objet|],[4|Donne un 3eme objet|],[5|Donne un 4eme objet|]",
	  "Je pars en vacances[1|au fond de la fosse des Mariannes], pour cela j'emporte avec moi[2|un aspirateur],[3|une chaussette seule],[4|un épouventail],[5|un dictionnaire de Français]"
	]],
	["FR",6,6,"Luggage",
	[
	  "Je pars en vacances[1|Donne un lieu|], pour cela j'emporte avec moi[2|Donne un 1er objet|],[3|Donne un 2eme objet|],[4|Donne un 3eme objet|],[5|Donne un 4eme objet|],[6|Donne un 5eme objet|]",
	  "Je pars en vacances[1|au fond de la fosse des Mariannes], pour cela j'emporte avec moi[2|un aspirateur],[3|une chaussette seule],[4|un épouventail],[5|un dictionnaire de Français],[6|une tonne d'eau]"
	]],
	["FR",7,7,"Luggage",
	[
	  "Je pars en vacances[1|Donne un lieu|], pour cela j'emporte avec moi[2|Donne un 1er objet|],[3|Donne un 2eme objet|],[4|Donne un 3eme objet|],[5|Donne un 4eme objet|],[6|Donne un 5eme objet|],[7|Donne un 6eme objet|]",
	  "Je pars en vacances[1|au fond de la fosse des Mariannes], pour cela j'emporte avec moi[2|un aspirateur],[3|une chaussette seule],[4|un épouventail],[5|un dictionnaire de Français],[6|une tonne d'eau],[7|les larmes de mes ennemis]"
	]],
	["FR",8,8,"Luggage",
	[
	  "Je pars en vacances[1|Donne un lieu|], pour cela j'emporte avec moi[2|Donne un 1er objet|],[3|Donne un 2eme objet|],[4|Donne un 3eme objet|],[5|Donne un 4eme objet|],[6|Donne un 5eme objet|],[7|Donne un 6eme objet|],[8|Donne un 7eme objet|]",
	  "Je pars en vacances[1|au fond de la fosse des Mariannes], pour cela j'emporte avec moi[2|un aspirateur],[3|une chaussette seule],[4|un épouventail],[5|un dictionnaire de Français],[6|une tonne d'eau],[7|les larmes de mes ennemis],[8|une autre chaussette seule]"
	]],
	["FR",9,9,"Luggage",
	[
	  "Je pars en vacances[1|Donne un lieu|], pour cela j'emporte avec moi[2|Donne un 1er objet|],[3|Donne un 2eme objet|],[4|Donne un 3eme objet|],[5|Donne un 4eme objet|],[6|Donne un 5eme objet|],[7|Donne un 6eme objet|],[8|Donne un 7eme objet|],[9|Donne un 8eme objet|]",
	  "Je pars en vacances[1|au fond de la fosse des Mariannes], pour cela j'emporte avec moi[2|un aspirateur],[3|une chaussette seule],[4|un épouventail],[5|un dictionnaire de Français],[6|une tonne d'eau],[7|les larmes de mes ennemis],[8|une autre chaussette seule],[9|la créativité dont je manque cruellement]"
	]],
	["FR",10,-1,"Luggage",
	[
	  "Je pars en vacances[1|Donne un lieu|], pour cela j'emporte avec moi[2|Donne un 1er objet|],[3|Donne un 2eme objet|],[4|Donne un 3eme objet|],[5|Donne un 4eme objet|],[6|Donne un 5eme objet|],[7|Donne un 6eme objet|],[8|Donne un 7eme objet|],[9|Donne un 8eme objet|],[10|Donne un 9eme objet|]",
	  "Je pars en vacances[1|au fond de la fosse des Mariannes], pour cela j'emporte avec moi[2|un aspirateur],[3|une chaussette seule],[4|un épouventail],[5|un dictionnaire de Français],[6|une tonne d'eau],[7|les larmes de mes ennemis],[8|une autre chaussette seule],[9|la créativité dont je manque cruellement],[10|le racisme de mon cousin]"
	]]
];
