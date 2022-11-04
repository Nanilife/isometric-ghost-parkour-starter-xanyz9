import './style.css';
import p5 = require('p5');
import { DecorationFrame, getDecorationValue, getTileHeight, getTileWidth, GhostFrame } from './spritesheet';
import { parseLevel } from './gameTile';
import { Ghost, Position } from './ghost';

export let p: p5;
export let images: p5.Image;
let font: p5.Font;

export const dx = 70;
export const dy = 10;

const levelString = `
  Snow+None GrEa+None SnSt+None Gren+None Gren+None
  Gren+None Gren+None Gren+None Gren+None Gren+None
  Gren+None Gren+None Gren+None Gren+None Gren+None
  Gren+None Gren+None Gren+None Gren+None Gren+None
  Gren+None Gren+None Gren+None Gren+None GrSu+01Pi`;
const level = parseLevel(levelString);

new p5((pp: p5) => {
  pp.setup = setup;
  pp.draw = draw;
  pp.keyPressed = keyPressed;
  p = pp;
});

function setup() {
  p.createCanvas(window.innerWidth - 100, window.innerHeight - 100);
  images = p.loadImage('https://i.ibb.co/zSyWRdQ/isometric.png');
  font = p.loadFont('https://cddataexchange.blob.core.windows.net/images/space-race/Lobster-Regular.ttf');
}

function draw() {
  p.background('white');
  p.textFont(font);
  p.textSize(100);
  p.fill('black');

  p.scale(0.5, 0.5);

  p.push();
  const tileWidth = getTileWidth() + dx;
  const tileHeight = getTileHeight() + dy;

  p.imageMode(p.CENTER);
  p.translate((tileWidth*level[0].length) / 2, tileHeight);
  for (let y = 0; y < level.length; y++) {
    for (let x = 0; x < level[y].length; x++) {
      p.push();
      p.translate(((x - y) * tileWidth) / 2, ((x + y) * tileHeight) / 2);
      level[y][x].draw();
      p.pop();
    }
  }
}

function keyPressed() {

}

function canGoTo(position: Position): boolean {
  if (position.x >= 0 && position.y >= 0 && position.x < level[0].length && position.y < level.length) {
    return level[position.y][position.x].acceptsGhost;
  }

  return false;
}
