import {Sprite} from 'pixi.js';
import {Field} from '../Field';
import gsap from 'gsap';

interface Position {
  x: number;
  y: number;
}

export class Tile {
  private color: string;
  private _sprite: Sprite;
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

  public moveTo(position: Position, duration: number) {
    return new Promise<void>((resolve) => {
      gsap.to(this._sprite, {
        duration,
        pixi: {
          x: position.x,
          y: position.y,
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  public isNeighbour(tile: Tile) {
    return (
      Math.abs(this.field.row - tile.field.row) +
        Math.abs(this.field.col - tile.field.col) ===
      1
    );
  }
}
