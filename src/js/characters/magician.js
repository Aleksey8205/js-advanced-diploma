import Character from '../Character';

class Magician extends Character {
  constructor(level = 1) {
    super(level, 'magician');
    this.attack = 10;
    this.defense = 40;
  }
}

export default Magician;