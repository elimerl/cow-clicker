import {
  Building,
  CowDuplicator,
  CowMaker,
  CowPrinter,
  Macro,
  CowAssimilator,
} from "./Building";

declare global {
  interface Window {
    game: Game;
  }
}
export const Buildings = {
  CowMaker: new CowMaker(),
  CowPrinter: new CowPrinter(),
  CowDuplicator: new CowDuplicator(),
  Macro: new Macro(),
  CowAssimilator: new CowAssimilator(),
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
    return toBinary(JSON.stringify(this.getSave()));
  }
  getSave() {
    return { state: this.state, buildings: Buildings };
  }
  decodeState(state: string) {
    const save = JSON.parse(fromBinary(state));
    Object.keys(save.state).forEach((key) => {
      //@ts-expect-error
      this.state[key] = save.state[key];
    });
    Object.keys(BuildingsAsString).forEach((key) => {
      if (save.buildings[key])
        BuildingsAsString[key].count = save.buildings[key].count;
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
function toBinary(string: string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}
function fromBinary(encoded: string) {
  let binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}
