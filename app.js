export const app = new PIXI.Application({ background: '#9ACD32', width:"1050",height:"550"});
app.stage.sortableChildren=true
document.body.appendChild(app.view);