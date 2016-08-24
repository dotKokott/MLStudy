function getRandomInt(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

var Perceptron = function( inputCount ) {
  this.InputCount = inputCount;
  this.Weights = [];
  this.LC = 0.0001;

  //Set random weights on construction
  for( var i = 0; i < inputCount; i++ ) {
    this.Weights.push(getRandomFloat(-1, 1));
  }

  console.log("Random weights: " + this.Weights);
}


Perceptron.prototype.Activate = function( output ) {
  return Math.sign(output);
}

Perceptron.prototype.FeedForward = function (inputs) {
  var sum = 0.0;
  for(var i = 0; i < this.Weights.length; i++) {
    sum += inputs[i] * this.Weights[i];
  }

  return this.Activate(sum);
}

Perceptron.prototype.Train = function (inputs, desired) {
  var guess = this.FeedForward(inputs);
  var error = desired - guess;

  for(var i = 0; i < this.Weights.length; i++) {
    this.Weights[i] += inputs[i] * error * this.LC;
  }
}

Perceptron.prototype.Test = function (x , y) {
  var yLine = 2*x+1; //Line function, 2 steep + 1 y
  if(y < yLine) {
    return -1;
  } else {
    return 1;
  }
}


var p = new Perceptron(3);

function setup() {
  createCanvas(640, 480);
  smooth();
}

var list = [];

function draw() {
  background(255);
  translate(width/2,height/2);

  strokeWeight(4);
  stroke(127);
  var x1 = -640/2;
  var y1 = 2*x1+1;
  var x2 = 640/2;
  var y2 = 2*x2+1;
  line(x1,y1,x2,y2);

  stroke(0);
  strokeWeight(1);
  //weights[0]*x + weights[1]*y + weights[2] = 0
  //Solve for y
  var weights = p.Weights;
  x1 = -640/2;
  y1 = (-weights[2] - weights[0]*x1)/weights[1];
  x2 = 640/2;
  y2 = (-weights[2] - weights[0]*x2)/weights[1];
  line(x1,y1,x2,y2);

  var x = getRandomInt(-640/2,640/2);
  var y = getRandomInt(-480/2,480/2);
  var answer = p.Test(x, y);

  p.Train([x, y, 1], answer);

  list.push([x, y, 1]);


  strokeWeight(1);
  for (var i = 0; i < list.length; i++) {
    stroke(0);
    var guess = p.FeedForward(list[i]);
    if (guess > 0) noFill();
    else           fill(0);
    ellipse(list[i][0], list[i][1], 8, 8);
  }

}
