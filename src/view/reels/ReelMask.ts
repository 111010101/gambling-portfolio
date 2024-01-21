import { autoDetectRenderer, Graphics, Sprite } from 'pixi.js';
import * as PIXI from 'pixi.js'

export const getMask = (w: number, h: number, x: number, y: number): Graphics => {
  const mask = new Graphics();
  mask.beginFill(0xffffff);
  mask.drawRect(x, y, w, h);
  mask.endFill();
  return mask
}

export const getGraphicTexture = (w: number, h: number, x: number, y: number, color: number = 0xFFF000) => {
  const graphics = new Graphics();
  graphics.beginFill(color);
  graphics.drawRect(x, y, w, h);
  graphics.endFill();
  return autoDetectRenderer().generateTexture(graphics)
}
