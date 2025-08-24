import Character from './Character';

export default class PositionedCharacter {
  constructor(character, position) {

    if (typeof position !== 'number') {
      throw new Error('position must be a number');
    }

    this.character = character;
    this.position = position;
  }

  getInfo() {
    return {
      level: this.character.level,
      attack: this.character.attack,
      defence: this.character.defence,
      health: this.character.health,
      type: this.character.type,
      position: this.position
    };
  }

  moveTo(newPosition) {
    if (typeof newPosition !== 'number') {
      throw new Error('newPosition must be a number');
    }

    this.position = newPosition;
  }
}