import Character from '../Character';

class Vampire extends Character {
  constructor(level = 1) {
    super(level, 'vampire');
    this.attack = 40;
    this.defense = 10;
  }
}

export default Vampire;