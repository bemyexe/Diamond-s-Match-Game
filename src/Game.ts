import {Application} from 'pixi.js';
import {Board} from './Board';

export class Game {
  private app: Application;
  private board: Board;
  constructor(app: Application) {
    this.app = app;
    this.board = new Board();
    this.app.stage.addChild(this.board);
  }
}
