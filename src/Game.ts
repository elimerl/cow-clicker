import { Building, CowMaker, CowPrinter } from "./Building";

declare global {
  interface Window {
    game: Game;
  }
}
export const Buildings = {
  CowMaker: new CowMaker(),
  CowPrinter: new CowPrinter(),
};
export const BuildingsAsString: Record<string, Building> = Buildings;
const defaultGameState: GameState = {
  cows: 0,
};
export class Game {
  state: GameState;
  constructor(readonly notify: (message: string) => void) {
    this.state = JSON.parse(JSON.stringify(defaultGameState));
  }
  encodeState() {
    return btoa(JSON.stringify(this.getSave()));
  }
  getSave() {
    return { state: this.state, buildings: Buildings };
  }
  decodeState(state: string) {
    const save = JSON.parse(atob(state));
    console.log(save);
    Object.keys(save.state).forEach((key) => {
      //@ts-expect-error
      this.state[key] = save.state[key];
    });
    Object.keys(BuildingsAsString).forEach((key) => {
      if (save.buildings[key])
        Object.keys(save.buildings[key]).forEach((key2) => {
          console.log(BuildingsAsString[key]);
          //@ts-expect-error
          BuildingsAsString[key][key2] = save.buildings[key][key2];
        });
    });
  }
  click() {
    this.state.cows += 1;
  }
  getCps() {
    return Object.values(Buildings).reduce((acc: number, bldg: Building) => {
      return bldg.cps * bldg.count + acc;
    }, 0);
  }
}

export interface GameState {
  cows: number;
}
