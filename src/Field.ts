import {Sprite} from 'pixi.js';
import {Tile} from './Tile/Tile';

export class Field {
  private _sprite: Sprite;
  private selected: Sprite;
  public row: number;
  public col: number;
  public tile!: Tile;
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;

    this._sprite = Sprite.from('field');
    this.selected = Sprite.from('field-selected');
    this._sprite.addChild(this.selected);
    this.selected.visible = false;
    this.selected.anchor.set(0.5);
    this._sprite.x = this.position.x;
    this._sprite.y = this.position.y;
    this._sprite.anchor.set(0.5);
  }
  get sprite() {
    return this._sprite;
  }
  get position() {
    return {
      x: this.col * this._sprite.width,
      y: this.row * this._sprite.height,
    };
  }

  public setTile(tile: Tile) {
    this.tile = tile;
    tile.field = this;
    tile.setPosition(this.position);
  }

  public select() {
    this.selected.visible = true;
  }

  public unselect() {
    this.selected.visible = false;
  }
}
