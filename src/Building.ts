import type { Game } from "./Game";

export abstract class Building {
  cost = 0;
  cps = 0;
  count = 0;
  unlocked = false;
  abstract tooltip: string;
  constructor() {}
  buy(game: Game) {
    if (game.state.cows >= this.cost) {
      game.state.cows -= this.cost;
      this.cost *= 1.2;
      this.count++;
    } else {
      game.notify(`You can't afford a ${this.constructor.name}!`);
    }
  }
  tick(game: Game, seconds: number) {
    game.state.cows += this.cps * seconds * this.count;
    if (game.state.cows >= this.cost) {
      this.unlocked = true;
    }
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
  cost = 100000;
  cps = 75000;
  tooltip =
    "Assimilates people into the Cow Collective and turns them into cows. This is ethical, rightttt?";
}
export class CowFactory extends Building {
  cost = 1000000;
  cps = 100000;
  tooltip = "A factory that builds cows. GMO-free!";
}
export class CowHax extends Building {
  cost = 4000000;
  cps = 4000000;
  tooltip = "Hacks the game to quadruple the factories.";
}
export class CowInator extends Building {
  cost = 100000000;
  cps = 10000000;
  tooltip =
    "*Phineas and Ferb theme plays* Behold, the cow-inator! It makes MANY cows!";
}
export class CowCursor extends Building {
  cost = 1000000000;
  cps = 100000000;
  tooltip =
    "A mouse cursor you hired to get MOAR COWS. The cow factory must grow...";
}
export class CowMaker2 extends Building {
  cost = 100000000000;
  cps = 1000000000;
  tooltip = "The sequel to the CowMaker! Makes many cows.";
}
export class DarkMatterToCow extends Building {
  cost = 1000000000000;
  cps = 10000000000;
  tooltip = "Turns dark matter into cows.";
}
