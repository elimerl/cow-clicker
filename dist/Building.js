export class Building {
  constructor() {
    this.cost = 0;
    this.cps = 0;
    this.count = 0;
    this.unlocked = false;
  }
  buy(game) {
    if (game.state.cows >= this.cost) {
      game.state.cows -= this.cost;
      this.cost *= 1.2;
      this.count++;
    } else {
      game.notify(`You can't afford a ${this.constructor.name}!`);
    }
  }
  tick(game, seconds) {
    game.state.cows += this.cps * seconds * this.count;
    if (game.state.cows >= this.cost) {
      this.unlocked = true;
    }
  }
}
export class CowMaker extends Building {
  constructor() {
    super(...arguments);
    this.cost = 20;
    this.cps = 5;
    this.tooltip = "Creates cows. Don't ask how.";
  }
}
export class CowPrinter extends Building {
  constructor() {
    super(...arguments);
    this.cost = 500;
    this.cps = 20;
    this.tooltip = "A 3D printer to print out cows. Does magic somehow.";
  }
}
export class CowDuplicator extends Building {
  constructor() {
    super(...arguments);
    this.cost = 1200;
    this.cps = 100;
    this.tooltip = "Turns one cow into four! It's Magic™.";
  }
}
export class Macro extends Building {
  constructor() {
    super(...arguments);
    this.cost = 1e4;
    this.cps = 1e3;
    this.tooltip = "Buy a gaming chair and macro your way to victory!";
  }
}
export class CowAssimilator extends Building {
  constructor() {
    super(...arguments);
    this.cost = 1e5;
    this.cps = 75e3;
    this.tooltip = "Assimilates people into the Cow Collective and turns them into cows. This is ethical, rightttt?";
  }
}
export class CowFactory extends Building {
  constructor() {
    super(...arguments);
    this.cost = 1e6;
    this.cps = 1e5;
    this.tooltip = "A factory that builds cows. GMO-free!";
  }
}
export class CowHax extends Building {
  constructor() {
    super(...arguments);
    this.cost = 4e6;
    this.cps = 4e6;
    this.tooltip = "Hacks the game to quadruple the factories.";
  }
}
export class CowInator extends Building {
  constructor() {
    super(...arguments);
    this.cost = 1e8;
    this.cps = 1e7;
    this.tooltip = "*Phineas and Ferb theme plays* Behold, the cow-inator! It makes MANY cows!";
  }
}
export class CowCursor extends Building {
  constructor() {
    super(...arguments);
    this.cost = 1e9;
    this.cps = 1e8;
    this.tooltip = "A mouse cursor you hired to get MOAR COWS. The cow factory must grow...";
  }
}
export class CowMaker2 extends Building {
  constructor() {
    super(...arguments);
    this.cost = 1e11;
    this.cps = 1e9;
    this.tooltip = "The sequel to the CowMaker! Makes many cows.";
  }
}
export class DarkMatterToCow extends Building {
  constructor() {
    super(...arguments);
    this.cost = 1e12;
    this.cps = 1e10;
    this.tooltip = "Turns dark matter into cows.";
  }
}
