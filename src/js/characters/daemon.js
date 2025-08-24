import Character from '../Character';

class Daemon extends Character {
  constructor(level = 1) {
    super(level, 'Daemon');
    this.attack = 10;
    this.defense = 10;
  }
}

export default Daemon;