across = [None
  , "Se croient supÃ©rieurs"
  , None
  , None
  , None
  , None
  , "PrÃ©sumez"
  , None
  , None
  , None
  , None
  , None
  , "Modes d'expression de la beautÃ©"
  , None
  , None
  , "RacontÃ©"
  , "SoulÃ¨vement"
  , "Oiseau bigarrÃ©"
  , "Passeraient par-dessus"
  ,None
  ,None
  ,"Facile Ã  faire"
  ,"Point cardinal"
  ,"TissÃ©e"
  ,"DÃ©monstratif"
  ,"N'a pas peur"
  ,"Soigne les chevaux"
  ,None
  ,None
  ,"Rognons"
  ,"Equipant de rÃ©sistances"
  ,None
  ,None
  ,None
  ,"A fredonner ou Ã  siffler"
  ,"Rendu plus grand"
  ,"Qui a la tÃªte dure"
  ,None
  ,None
  ,"De quoi faire un bouchon"
  ,None
  ,None
  ,"Mon truc en plumes"
  ,"Pour faire du foie gras"
  ,None
  ,"TrÃ¨s court"
  ,"Qui concerne des parties du monde"
  ,None
  ,None
  ,None
  ,"Un peu avant l'Euro"
  ,"Petite monnaie"
  ,"Nombreux jours"
  ,"RÃ©cipients"
  ,"Bassin naturel"
  ,None
  ,"Tube percÃ©"
  ,None
  ,"Pas assez de deux"
  ,"CarriÃ¨res dans la traduction"
  ,None
  ,None
  ,None
  ,None
  ,None
  ,"Les nomma toutes"
  ,None
  ,"Saison"
  ,"SituÃ©"
  ,"Etendue verte"
  ,"Complexe en bord de mer"
  ,None
  ,"MÃ©tal"
  ,"Poisson"
  ,"Tours de magie"
  ,None
  ,None
  ,None
  ,None
  ,"Ancienne mesure de longueur"
  ,"RegardÃ©es attentivement"
  ,"Temps de rÃ©volution"
  ,"Bien marquÃ©s"
  ,"Etendue"
  ,"UnitÃ© de volume"
]
down = [
  "Entier"
  ,"Unir"
  ,"Remua"
  ,"Vase pour les cendres"
  ,"Possessif"
  ,"Iraniens anciens"
  ,"Projette"
  ,"Sortis"
  ,"A l'attaque! en avant!"
  ,"Quart chaud"
  ,"TrÃ¨s froid quand il est absolu"
  ,"OpÃ©rÃ¨rent"
  ,"Publieras Ã  nouveau"
  ,"Substance dans l'Ã©corce"
  ,"A visiter sur le web"
  ,None
  ,None
  ,None
  ,None
  ,"Etre couchÃ©"
  ,"Emanation colorÃ©e"
  ,None
  ,None
  ,None
  ,None
  ,"Saules"
  ,"Reste pour un bail"
  ,"Partie d'un cercle"
  ,"Ferons savoir"
  ,None
  ,None
  ,"BaignÃ©"
  ,"Mouche piquante"
  ,"DÃ©posÃ©e par la fumÃ©e"
  ,None
  ,None
  ,None
  ,"FoulÃ©"
  ,"AbÃ®mÃ©s"
  ,"Unir"
  ,"C'est plus le PÃ©rou"
  ,"Apprirent"
  ,"Amas de poils"
  ,None
  ,"Verso"
  ,None
  ,None
  ,"Rendu illisible volontairement"
  ,"Naturel"
  ,"ComplÃ¨tement sec"
  ,None
  ,None
  ,None
  ,None
  ,None
  ,"Embourbes"
  ,None
  ,"Dans le Vaucluse"
  ,"Ne le dira pas"
  ,None
  ,"Aussi"
  ,"Mouche"
  ,"Qui n'a plus de voix"
  ,"Etre bien en Ã©vidence"
  ,"Raisonnable"
  ,"Largeur de main"
  ,"Sortie"
  ,None
  ,None
  ,None
  ,None
  ,"Affectionne"
  ,"AbandonnÃ©e"
  ,"Resta"
  ,None
  ,"Pas tu"
  ,"Errera"
  ,"RÃ©sultat du froid"
  ,"Amas"
  ,None
  ,None
  ,None
  ,None
  ,None
  ,None
]
both = ["+{}".format(i+1) if across[i] != None and down[i] != None else "." for i in range(len(across))]
print(len(across))
print(len(down))
print(both)
print(across[16])
print(down[16])
