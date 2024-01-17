import { Graphics } from 'pixi.js';

export const getMask = (w: number, h: number, x: number, y: number): Graphics => {
  const mask = new Graphics();
  mask.beginFill(0xffffff);
  mask.drawRect(x, y, w, h);
  mask.endFill();
  return mask
}