var x_grid = new Array();
var neighbors_grid = new Array();
var fresh_grid = new Array();
for(c=0;c<30;c++){
  var y_grid = new Array()
  for(d=0;d<15;d++){
    y_grid.push(0)
  }x_grid.push(y_grid)
  neighbors_grid.push(y_grid)
  fresh_grid.push(y_grid)
}
for(c=0;c<15;c++){

}
function makeGrid(){
  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");
  ctx.lineWidth=1;
  ctx.beginPath();
  for(var x=0; x<305; x+=10){
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 150);
    ctx.stroke();
  }
  for(var y=0; y<160; y+=10){
    ctx.moveTo(0, y);
    ctx.lineTo(300, y);
    ctx.stroke();
  }
}
function life(e){
  x = Math.floor(e.clientX/3)
  y = Math.floor(e.clientY/3)
  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");
  ctx.fillRect(x-(x%10),(y-(y%10)),10,10)
  x_grid[(x-x%10)/10][(y-y%10)/10] = 1

  // console.log(e.clientY)
}
function getNeighbors(x, y){
  neighbors = 0
  if(x>0&&y>0){
  neighbors += x_grid[x-1][y-1]}//nw
  if(y>0){
  neighbors += x_grid[x][y-1]}//n
  if(x<29&&y>0){
  neighbors += x_grid[x+1][y-1]}//ne
  if(x>0){
  neighbors += x_grid[x-1][y]}//w
  if(x>0&&y<15){
  neighbors += x_grid[x-1][y+1]}//sw
  if(y<14){
  neighbors += x_grid[x][y+1]}//s
  if(x<29){
  neighbors += x_grid[x+1][y]}//e
  if(x<29&&y<14){
  neighbors += x_grid[x+1][y+1]}//se
  return neighbors;
}
function life_happens(){
  neighbors_grid = new Array();
  for(c=0;c<30;c++){
    var y_grid = new Array()
    for(d=0;d<15;d++){
      y_grid.push(0)
    }neighbors_grid.push(y_grid)

  }
  for(y=0;y<15;y++){
    for(x=0;x<30;x++){
      neighbors_grid[x][y]=getNeighbors(x, y)
    }
  }
  for(y=0;y<15;y++){
    for(x=0;x<30;x++){
      if(neighbors_grid[x][y]<=1){
        x_grid[x][y] = 0;
      }else if(neighbors_grid[x][y]>=4){
        x_grid[x][y] = 0;
      }else if(neighbors_grid[x][y]==3){
        x_grid[x][y] = 1
      }else if((x_grid[x][y]==1)&&(neighbors_grid[x][y]==2||neighbors_grid[x][y]==3)){
        x_grid[x][y] = 1
      }
    }
  }for(y=0;y<15;y++){
    for(x=0;x<30;x++){
      if(x_grid[x][y]==1){
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        ctx.fillStyle=getRandomColor()
        ctx.fillRect(x*10,y*10,10,10)
      }else{
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        ctx.fillStyle='white'
        ctx.fillRect(x*10,y*10,10,10)
      }
    }
  }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function set_inter_lh(){
  setInterval(life_happens, 300)
}
// makeGrid()
$('#myCanvas').click(life)
// setInterval(draw_squares, 45)// render framerate
// setInterval(square, 75)// square spawn
// setInterval(sound_cut, 3000)
// setInterval(back_flash, 150)// back flash
