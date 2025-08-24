import Character from "../Character";

class Swordsman extends Character {
  constructor(level = 1) {
    super(level, 'swordsman');
    this.attack = 40;
    this.defense = 10;
  }
}

export default Swordsman;