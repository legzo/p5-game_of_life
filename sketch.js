/// <reference path="./bindings/p5.global-mode.d.ts" />

let HEIGHT = 480;
let WIDTH = 640;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    background(155);
}

function draw() {
  ellipse(WIDTH/2, HEIGHT/2, 20);
}