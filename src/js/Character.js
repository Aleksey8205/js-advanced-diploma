export default class Character {
  constructor(level, type = 'generic') {
    if (new.target === Character) {
      throw new Error('Нельзя создавать объекты базового класса Character напрямую');
    }

    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
  }

  levelUp() {
    this.level += 1;
    this.health = Math.min(this.level * 80, 100);
    this.attack = Math.max(this.attack, this.attack * (80 + this.health) / 100);
    this.defence = Math.max(this.defence, this.defence * (80 + this.health) / 100);
  }
}