import {Application} from 'pixi.js';
import {Board} from './Board';
import {Tile} from './Tile/Tile';

export class Game {
  private app: Application;
  private board: Board;
  private selectedTile: Tile | null = null;
  private disabled = false;
  constructor(app: Application) {
    this.app = app;
    this.board = new Board();
    this.board.on('tile-touch-start', this.onTileClick.bind(this));
    this.app.stage.addChild(this.board);
  }

  private onTileClick(tile: Tile) {
    if (this.disabled) {
      return;
    }
    if (this.selectedTile) {
      if (!this.selectedTile.isNeighbour(tile)) {
        this.clearSelection();
        this.selectTile(tile);
      } else {
        this.swap(this.selectedTile, tile);
      }
    } else {
      this.selectTile(tile);
    }
  }

  private selectTile(tile: Tile) {
    this.selectedTile = tile;
    this.selectedTile.field.select();
  }

  private swap(selectedTile: Tile, tile: Tile) {
    this.disabled = true;
    this.clearSelection();
    selectedTile.sprite.zIndex = 2;

    selectedTile.moveTo(tile.field.position, 0.2);

    tile.moveTo(selectedTile.field.position, 0.2).then(() => {
      this.board.swap(selectedTile, tile);
      this.disabled = false;
    });
  }

  private clearSelection() {
    if (this.selectedTile) {
      this.selectedTile.field.unselect();
      this.selectedTile = null;
    }
  }
}
