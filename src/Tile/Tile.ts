import {Sprite} from 'pixi.js';
import {Field} from '../Field';

interface Position {
  x: number;
  y: number;
}

export class Tile {
  private color: string;
  public _sprite: Sprite;
  public field!: Field;
  constructor(color: string) {
    this.color = color;
    this._sprite = Sprite.from(this.color);
    this._sprite.anchor.set(0.5);
  }

  get sprite() {
    return this._sprite;
  }

  public setPosition(position: Position) {
    this._sprite.x = position.x;
    this._sprite.y = position.y;
  }
}
