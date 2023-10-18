import { app } from './app.js'
export function tackshooterunitproperties(tackshooterunit){
    tackshooterunit.x=app.view.width-150
    tackshooterunit.y=100
    tackshooterunit.height=55*1.3
    tackshooterunit.width=55*1.3
    tackshooterunit.cursor = 'pointer';
    tackshooterunit.anchor.set(0.5)
    tackshooterunit.eventMode = 'static';
    tackshooterunit.id=null
}
export const tackshooter=PIXI.Sprite.from("Tack_Shooter.webp")
tackshooter.x=app.view.width-150
tackshooter.y=100
tackshooter.height=364*0.25
tackshooter.width=393*0.25
tackshooter.selected=false
tackshooter.cursor = 'pointer';
tackshooter.anchor.set(0.5)
tackshooter.count=0
tackshooter.list=[]
tackshooter.tacklist=[]
tackshooter.eventMode = 'static';
app.stage.addChild(tackshooter)
var unit=null
tackshooter.on("mousedown", onDragStart)
function onDragMove(event)
{
    if(tackshooter.selected==true){
        unit.x=event.pageX-205
        unit.y=event.pageY
        //unit.parent.toLocal(event.global, null, unit.position);
    }
    $(document).on("mouseup",onDragEnd)
}

function onDragStart()
{
    unit=PIXI.Sprite.from("TackShooterunit.png")
    tackshooterunitproperties(unit)
    app.stage.addChild(unit)
    unit.alpha = 0.5;
    tackshooter.selected=true
    $(document).on('mousemove', onDragMove);
}

function onDragEnd()
{
    if(unit!=null){
        if(unit.x>800){
            app.stage.removeChild(unit)
        }else{ 
            unit.alpha = 1
            unit.id=tackshooter.count
            tackshooter.count++
            tackshooter.list.push(unit)
        }
    }
    tackshooter.selected=false
    unit=null
}

export function tacks(x,y){
    for(var i=0;i<8;i++){
        var tack=PIXI.Sprite.from("Tack.png")
        tack.x=x
        tack.y=y
        tack.height=20
        tack.width=20
        tack.angle=45*i
        tack.movements=0
        tack.zIndex=-1
        tack.anchor.set(0.5)
        tack.eventMode = 'static';
        tackshooter.tacklist.push(tack)
        app.stage.addChild(tack)
    }
}

export function tackmove(){
    var direction=[[0,-5],[Math.sqrt(12.5),-Math.sqrt(12.5)],[5,0],[Math.sqrt(12.5),Math.sqrt(12.5)],[0,5],[-Math.sqrt(12.5),Math.sqrt(12.5)],[-5,0],[-Math.sqrt(12.5),-Math.sqrt(12.5)]]
    for(var j=1;j<tackshooter.tacklist.length/8+1;j++){
        for(var i=0;i<8;i++){
            tackshooter.tacklist[i+8*j-8].x+=direction[i][0]
            tackshooter.tacklist[i+8*j-8].y+=direction[i][1]
            tackshooter.tacklist[i+8*j-8].movements++
        }
        if(tackshooter.tacklist[j*8-1].movements==15){
            for(var k=1;k<9;k++){
                app.stage.removeChild(tackshooter.tacklist[j*8-k])
            }
            tackshooter.tacklist.splice(j*8-8,8)
        }
    }
}
var tackshoot=0
export function tackattack(){
    if(tackshoot>=60){
    tackshoot=0
    for(var i=0;i<tackshooter.list.length;i++){
        console.log(tackshooter.list[i].x)
        tacks(tackshooter.list[i].x,tackshooter.list[i].y)
    }
}else{
    tackshoot++
}
tackmove()}
