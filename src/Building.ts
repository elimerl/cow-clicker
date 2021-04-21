import type { Game } from "./Game";

export abstract class Building {
  cost = 0;
  cps = 0;
  count = 0;
  abstract tooltip: string;
  constructor() {}
  buy(game: Game) {
    if (game.state.cows >= this.cost) {
      game.state.cows -= this.cost;
      this.cost *= 1.2;
      this.count++;
    } else {
      game.notify("You can't afford this!");
    }
  }
  tick(game: Game, seconds: number) {
    game.state.cows += this.cps * seconds * this.count;
  }
}
export class CowMaker extends Building {
  cost = 20;
  cps = 5;
  tooltip = "Creates cows. Don't ask how.";
}
export class CowPrinter extends Building {
  cost = 500;
  cps = 20;
  tooltip = "A 3D printer to print out cows. Look, it works, don't touch it.";
}
export class CowDuplicator extends Building {
  cost = 500;
  cps = 20;
  tooltip = "A 3D printer to print out cows. Look, it works, don't touch it.";
}
