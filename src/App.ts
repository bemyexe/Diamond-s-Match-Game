import {Application, Assets} from 'pixi.js';
import {Game} from './Game';
import {APP_INIT_CONFIG} from './config/app-init-config';
import {PRELOAD_ASSETS} from './config/preload-assets';
import PixiPlugin from 'gsap/PixiPlugin';
import gsap from 'gsap';

class AppInit {
  private app: Application;
  private game!: Game;
  constructor() {
    this.app = new Application();
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(this.app);
  }

  public async init() {
    await this.app.init(APP_INIT_CONFIG);
    await this.preload();

    document.body.appendChild(this.app.canvas);

    this.game = new Game(this.app);
    // this.app.ticker.add(this.game.update, this.game);
  }

  private async preload() {
    await Assets.load(PRELOAD_ASSETS);
  }
}

export const App = new AppInit();
