import {Container} from 'pixi.js';
import {Field} from './Field';
import {TileFactory} from './Tile/TileFactory';
import {Tile} from './Tile/Tile';

const BOARD = {
  rows: 6,
  cols: 6,
};

export class Board extends Container {
  private fields: Field[];
  private rows: number;
  private cols: number;

  constructor() {
    super();
    this.fields = [];
    this.rows = BOARD.rows;
    this.cols = BOARD.cols;

    this.create();
    this.ajustFieldsPosition();
  }

  public swap(tile1: Tile, tile2: Tile) {
    const tile1Field = tile1.field;
    const tile2Field = tile2.field;

    tile1Field.tile = tile2;
    tile2.field = tile1Field;

    tile2Field.tile = tile1;
    tile1.field = tile2Field;
  }

  private create() {
    this.createFields();
    this.createTiles();
  }

  private createFields() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.createField(row, col);
      }
    }
  }

  private createField(row: number, col: number) {
    const field = new Field(row, col);
    this.fields.push(field);
    this.addChild(field.sprite);
  }

  private ajustFieldsPosition() {
    const fieldWidth = this.fields[0].sprite.width;
    const width = fieldWidth * this.cols;
    const height = fieldWidth * this.rows;
    this.x = (window.innerWidth - width) / 2 + fieldWidth / 2;
    this.y = (window.innerHeight - height) / 2 + fieldWidth / 2;
  }

  private createTiles() {
    this.fields.forEach((field) => this.createTile(field));
  }

  private createTile(field: Field) {
    const tile = TileFactory.generateTile();
    tile.sprite.interactive = true;
    tile.sprite.on('pointerdown', () => this.emit('tile-touch-start', tile));
    field.setTile(tile);
    this.addChild(tile.sprite);
  }
}
