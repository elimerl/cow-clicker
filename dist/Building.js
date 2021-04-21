export class Building {
  constructor() {
    this.cost = 0;
    this.cps = 0;
    this.count = 0;
  }
  buy(game) {
    if (game.state.cows >= this.cost) {
      game.state.cows -= this.cost;
      this.cost *= 1.2;
      this.count++;
    } else {
      game.notify("You can't afford this!");
    }
  }
  tick(game, seconds) {
    game.state.cows += this.cps * seconds * this.count;
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
    this.tooltip = "A 3D printer to print out cows. Look, it works, don't touch it.";
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
