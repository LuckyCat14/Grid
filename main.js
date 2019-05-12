<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript">

// Based on http://dhmstark.co.uk/games/life/incremental/

game = {
  started: false,
  interval: 50,
  grid: [],
  gridSize: 66,
  nodeSize: 8,
  toroidal: false
};

creature={
x:0,
y:0,
energy:0
};

var wave={
	x:0,
  y:0,
  row:0,
  col:0,
  speed:0,
  radius:0,
  width:0
}

waves=[]

function initialise() {
  game.started = false;
  document.getElementById("container").style.width = game.gridSize * game.nodeSize + game.gridSize + "px";
  for (var i = 0; i < game.gridSize; i++) {
    game.grid[i] = [];
    var row = document.createElement("div");
    row.className = "row";
    row.id = "row" + i;
    row.style.height = game.nodeSize + "px";
    document.getElementById("container").appendChild(row);
    for (var j = 0; j < game.gridSize; j++) {
      game.grid[i][j] = 0;
      var node = document.createElement("div");
      node.className = "node";
      node.id = "node" + i + "-" + j;
      node.style.width = game.nodeSize + "px";
      node.onclick = function() {
        click(this);
        drawGrid();
      }
      document.getElementById("row" + i).appendChild(node);
    }
  }
  game = JSON.parse(localStorage.getItem("game"));
  drawGrid();

}

function click(node) {
  var nodeID = node.id.slice(4); // node3-16
  var separator = nodeID.indexOf("-");
  var x = nodeID.slice(0, separator);
  var y = nodeID.slice(separator + 1);
  if (game.grid[x][y] == 10) {
    game.grid[x][y] = 0;
  } else {
    game.grid[x][y] += 1;
  }
}

function Move(){

}

function Flow() {
  for (var x = 0; x < game.gridSize; x++) {
    for (var y = 0; y < game.gridSize; y++) {
      var r = Math.random() * 100 + 1
      if (r > 85) {

        if (game.grid[x][y] == 10) {
          game.grid[x][y] = 10;
        } else {
          game.grid[x][y] += 1;
        }

      } else if (r < 15) {

        if (game.grid[x][y] == 0) {
          game.grid[x][y] = 0;
        } else {
          game.grid[x][y] -= 1;
        }

      }
    }
  }
}


function drawGrid() {
  // document.getElementById("header2")=document.getElementById("header")+"a"
  for (var i = 0; i < game.gridSize; i++) {
    for (var j = 0; j < game.gridSize; j++) {
      document.getElementById("node" + i + "-" + j).style.backgroundColor =
        "#00" +
        Math.floor(80 + (17.5 * game.grid[i][j])).toString(16) +
        "FF";
    }
  }
}

$("body").onload = initialise()

$('#init2').on('click', function() {
  for (var i = 0; i < game.gridSize; i++) {
    for (var j = 0; j < game.gridSize; j++) {
      game.grid[i][j] = 7 // Math.floor(Math.random() * 10 + 1)
    }
  }
  drawGrid()
});

$('#save2').on('click', function() {
  localStorage.setItem("game", JSON.stringify(game));
});

$('#load2').on('click', function() {
  //game = JSON.parse(localStorage.getItem("game"));
  Flow();
  drawGrid();
});


window.setInterval(function() {
  Flow();
  Move();
  drawGrid();

}, 80);
jQuery(document).ready(function(){
initialise()
}
</script>
