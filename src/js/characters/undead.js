import Character from '../Character';

class Undead extends Character {
  constructor(level = 1) {
    super(level, 'undead');
    this.attack = 40;
    this.defense = 10;
  }
}

export default Undead;