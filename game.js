import { tackattack } from './tackshooter.js';
import { app } from './app.js'
import { bloonhitbox, bloonmove, bloonspawn } from './bloon.js'
const map=PIXI.Sprite.from("map.webp")
map.x=0
map.y=app.view.height/2
map.height=app.view.height
map.zIndex=-2
map.anchor.set(0,0.5)
app.stage.addChild(map)

var gamestart=true
var olddate=new Date()
var oldtime=olddate.getTime()
var newdate=null
var newtime=null
var Theticker=app.ticker

Theticker.add(() =>{
    if(gamestart){
        newdate=new Date()
        newtime=newdate.getTime()
        if (newtime-oldtime>=(1000/60)){
            bloonspawn()
            tackattack()
            bloonhitbox()
            bloonmove()
            oldtime=newtime
        }
    }
})