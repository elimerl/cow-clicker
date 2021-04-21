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
  tooltip = "A 3D printer to print out cows. Does magic somehow.";
}
export class CowDuplicator extends Building {
  cost = 1200;
  cps = 100;
  tooltip = "Turns one cow into four! It's Magic™.";
}

export class Macro extends Building {
  cost = 10000;
  cps = 1000;
  tooltip = "Buy a gaming chair and macro your way to victory!";
}
export class CowAssimilator extends Building {
  cost = 10000;
  cps = 75000;
  tooltip =
    "Assimilates people into the Cow Collective and turns them into cows. This is ethical, rightttt?";
}
