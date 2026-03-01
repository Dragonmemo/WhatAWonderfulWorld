try :
    import PIL.Image as Image
except Exception as e :
    #pip install pyautogui
    import PIL.Image as Image
import os
import math

print(os.getcwd())

def SpriteSheetLoop(link):
    IM=Image.new("RGBA",(1024,1024), (0,0,0,0))
    IM.paste(Image.open(link+'.png'),(256,256))
    SpriteSheet=Image.new("RGBA",(1024,1024), (0,0,0,0))

    #Idle Animation
    for k in range(20):
        x=(math.cos(math.pi/10*k)+3)/4
        SpriteSheet.paste(IM.resize((int(1024*x),int(1024*x))),(int((0.5-x/2)*1024),int((.5-x/2)*1024)))
        SpriteSheet.save(link+'_idle_'+str(k)+'.png')
        SpriteSheet=Image.new("RGBA",(1024,1024), (0,0,0,0))

    #AttackAnimation
    for k in range(20):
        x=(math.cos(math.pi/20*k)+1)/2
        SpriteSheet.paste(IM.rotate(-360*x))
        SpriteSheet.save(link+'_attack_'+str(k)+'.png')
        SpriteSheet=Image.new("RGBA",(1024,1024), (0,0,0,0))


    #SpriteSheet.paste(IM.resize((25,256)),(1280,1280))



LK='D:\\Programmes (x86)\\WreckHellAroundToo\\assets\\Tileset\\Carole'
TYPE='Loop'

#LK = input("Ou est le fichier du design du perso ?")
#TYPE = input("Quel Mode d'attaque (Loop/Stab) ?")
if TYPE == 'Loop' :
    SpriteSheetLoop(LK)
if TYPE == 'Stab' :
    SWORD = input("Ou est le fichier du design de l'arme ?")
    SpriteSheetStab(LK,SWORD)