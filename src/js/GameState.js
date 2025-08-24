export default class GameState {
  static from(object) {
    return new GameState(object.characters, object.currentPlayer, object.turnNumber, object.positions);
  }

  constructor(characters, currentPlayer, turnNumber, positions) {

    this._characters = characters;
    this._currentPlayer = currentPlayer;
    this._turnNumber = turnNumber;
    this._positions = positions;
  }

  serialize() {
    return JSON.stringify({
      characters: this.characters,
      currentPlayer: this.currentPlayer,
      turnNumber: this.turnNumber,
      positions: this.positions
    });
  }

  get characters() {
    return this._characters;
  }

  get currentPlayer() {
    return this._currentPlayer;
  }

  get turnNumber() {
    return this._turnNumber;
  }

  get positions() {
    return this._positions;
  }

  update(newState) {

    if (!['player', 'computer'].includes(newState.currentPlayer)) {
      throw new Error("currentPlayer должен быть 'player' или 'computer'");
    }

    if (typeof newState.turnNumber !== 'number' || newState.turnNumber < 1) {
      throw new Error("turnNumber должен быть положительным числом");
    }

    if (typeof newState.positions !== 'object') {
      throw new Error("positions должен быть объектом");
    }

    this._characters = newState.characters;
    this._currentPlayer = newState.currentPlayer;
    this._turnNumber = newState.turnNumber;
    this._positions = newState.positions;
  }
}