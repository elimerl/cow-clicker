import {
  CowDuplicator,
  CowMaker,
  CowPrinter,
  Macro,
  CowAssimilator,
  CowFactory,
  CowHax
} from "./Building.js";
export const Buildings = {
  CowMaker: new CowMaker(),
  CowPrinter: new CowPrinter(),
  CowDuplicator: new CowDuplicator(),
  Macro: new Macro(),
  CowAssimilator: new CowAssimilator(),
  CowFactory: new CowFactory(),
  CowHax: new CowHax()
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
    return toBinary(JSON.stringify(this.getSave()));
  }
  getSave() {
    return {state: this.state, buildings: Buildings};
  }
  decodeState(state) {
    const save = JSON.parse(fromBinary(state));
    Object.keys(save.state).forEach((key) => {
      this.state[key] = save.state[key];
    });
    Object.keys(BuildingsAsString).forEach((key) => {
      if (save.buildings[key])
        BuildingsAsString[key].count = save.buildings[key].count;
      if (save.buildings[key].cost)
        BuildingsAsString[key].cost = save.buildings[key].cost;
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
function toBinary(string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}
function fromBinary(encoded) {
  let binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}
