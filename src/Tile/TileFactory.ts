import {TILES_COLORS} from '../config/tiles-colors';
import {Tools} from '../Tools';
import {Tile} from './Tile';

export class TileFactory {
  constructor() {}

  static generateTile() {
    const color = TILES_COLORS[Tools.randomNumber(0, TILES_COLORS.length - 1)];
    return new Tile(color);
  }
}
