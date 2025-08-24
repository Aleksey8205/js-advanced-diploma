import PositionedCharacter from './PositionedCharacter';

export default class Team {
  constructor(characters = []) {
    this.characters = characters.map((character, index) => new PositionedCharacter(character, index + 1));
  }

  addCharacter(character) {
    if (!(character instanceof PositionedCharacter)) {
      throw new Error('character must be instance of PositionedCharacter');
    }

    this.characters.push(character);
  }

  removeCharacter(character) {
    const index = this.characters.indexOf(character);
    if (index !== -1) {
      this.characters.splice(index, 1);
    }
  }
  
  getInfo() {
    return this.characters.map(character => character.getInfo());
  }
}