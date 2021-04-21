import {CowMaker, CowPrinter} from "./Building.js";
export const Buildings = {
  CowMaker: new CowMaker(),
  CowPrinter: new CowPrinter()
};
export const BuildingsAsString = Buildings;
const defaultGameState = {
  cows: 0
};
export class Game {
  constructor(notify) {
    this.notify = notify;
    this.state = JSON.parse(JSON.stringify(defaultGameState));
  }
  encodeState() {
    return btoa(JSON.stringify(this.getSave()));
  }
  getSave() {
    return {state: this.state, buildings: Buildings};
  }
  decodeState(state) {
    const save = JSON.parse(atob(state));
    console.log(save);
    Object.keys(save.state).forEach((key) => {
      this.state[key] = save.state[key];
    });
    Object.keys(BuildingsAsString).forEach((key) => {
      if (save.buildings[key])
        Object.keys(save.buildings[key]).forEach((key2) => {
          console.log(BuildingsAsString[key]);
          BuildingsAsString[key][key2] = save.buildings[key][key2];
        });
    });
  }
  click() {
    this.state.cows += 1;
  }
  getCps() {
    return Object.values(Buildings).reduce((acc, bldg) => {
      return bldg.cps * bldg.count + acc;
    }, 0);
  }
}
