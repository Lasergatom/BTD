import { app } from './app.js'
import { tackshooter } from './tackshooter.js'


function redbloonproperties(redbloon){
    redbloon.x=-25
    redbloon.y=225
    redbloon.height=63/1.4
    redbloon.width=49/1.4
    redbloon.directionindex=0
    redbloon.direction="right"
    redbloon.anchor.set(0.5)
}
//app.stage.addChild(redbloon)
var bloonlist=[]
var directionlist=[[410,"up"],[100,"left"],[270,"down"],[440,"left"],[140,"up"],[320,"right"],[525,"up"],[175,"right"],[625,"down"],[400,"left"],[365,"down"],[20000,"up"]]
var spawnlist=[15,15,15,15,15,15,15,15,15,15,15,15]
var spawntime=0
var spawnindex=0
export function bloonhitbox(){

    for(var j=0;j<bloonlist.length;j++){
        for(var i=0; i<tackshooter.tacklist.length; i++){
            if(bloonlist.length>0){
                if(tackshooter.tacklist[i].x>=bloonlist[j].x-bloonlist[j].width && tackshooter.tacklist[i].x<=bloonlist[j].x+bloonlist[j].width){
                    if(tackshooter.tacklist[i].y>=bloonlist[j].y-bloonlist[j].height && tackshooter.tacklist[i].y<=bloonlist[j].y+bloonlist[j].height){
                        app.stage.removeChild(bloonlist[j])
                        bloonlist.splice(j,0)
                    }
                }
            }
        }
    }
}
export function bloonmove(){
    for(var i=0;i<bloonlist.length;i++){
        if(bloonlist[i].direction=="left" || bloonlist[i].direction=="right"){
            if(bloonlist[i].x>=directionlist[bloonlist[i].directionindex][0] 
                && bloonlist[i].direction=="right"
                || bloonlist[i].x<=directionlist[bloonlist[i].directionindex][0] 
                && bloonlist[i].direction=="left"){
                bloonlist[i].direction=directionlist[bloonlist[i].directionindex][1]
                bloonlist[i].directionindex++
            }else{
                if(bloonlist[i].direction=="right"){
                    bloonlist[i].x+=2
                }else{
                    bloonlist[i].x-=2
                }
            }
        }else{
            if(bloonlist[i].y>=directionlist[bloonlist[i].directionindex][0] 
                && bloonlist[i].direction=="down"
                || bloonlist[i].y<=directionlist[bloonlist[i].directionindex][0] 
                && bloonlist[i].direction=="up"){
                bloonlist[i].direction=directionlist[bloonlist[i].directionindex][1]
                bloonlist[i].directionindex++
            }else{
                if(bloonlist[i].direction=="down"){
                    bloonlist[i].y+=2
                }else{
                    bloonlist[i].y-=2
                }
            }
        }
    }
}
export function bloonspawn(){
    if(spawntime==spawnlist[spawnindex]){
        spawntime=0
        bloonlist.push(PIXI.Sprite.from("redbloon.webp"))
        redbloonproperties(bloonlist[bloonlist.length-1])
        app.stage.addChild(bloonlist[bloonlist.length-1])
        spawnindex++
    }else{
        spawntime++
    }
}