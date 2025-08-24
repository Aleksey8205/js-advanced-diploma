import GameState from "./GameState";
import { generateTeam } from "./generators";
import PositionedCharacter from "./PositionedCharacter";
import Bowman from "./characters/Bowman";
import Swordsman from "./characters/Swordsman";
import Magician from "./characters/Magician";
import Vampire from "./characters/Vampire";
import Undead from "./characters/Undead";
import Daemon from "./characters/Daemon";
import themes from "./themes";
import Team from "./Team";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.gameState = new GameState();
    this.currentLevel = 1;
    this.playerTeam = null;
    this.enemyTeam = null;
    this.selectedCharacter = null;
    this.isPlayerTurn = true;
  }

  init() {
    this.loadGameState();

    let selectedTheme;
    switch (this.currentLevel) {
      case 1:
        selectedTheme = themes.prairie;
        break;
      case 2:
        selectedTheme = themes.desert;
        break;
      case 3:
        selectedTheme = themes.arctic;
        break;
      case 4:
        selectedTheme = themes.mountain;
        break;
      default:
        selectedTheme = themes.prairie;
    }

    this.gamePlay.drawUi(selectedTheme); 

    this.generateTeams();
    this.redrawPositions();

    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this));
    this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this));
    this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this));
}

  loadGameState() {
    const savedState = this.stateService.load();
    if (savedState) {
      this.gameState = savedState;
      this.currentLevel = savedState.currentLevel;
      this.playerTeam = savedState.playerTeam;
      this.enemyTeam = savedState.enemyTeam;
      this.isPlayerTurn = savedState.isPlayerTurn;
    }
  }

  saveGameState() {
    this.stateService.save(this.gameState);
  }

  generateTeams() {
    const playerTypes = [Bowman, Swordsman, Magician];
    const enemyTypes = [Vampire, Undead, Daemon];

    this.playerTeam = generateTeam(playerTypes, 3, 4);
    this.enemyTeam = generateTeam(enemyTypes, 3, 4);
  }

  redrawPositions() {
    const positions = [];
    this.playerTeam.characters.forEach((character, index) => {
      const position = index + 1;
      positions.push(new PositionedCharacter(character, position));
    });

    this.enemyTeam.characters.forEach((character, index) => {
      const position =
        (this.gamePlay.boardSize - 2) * this.gamePlay.boardSize + index + 1;
      positions.push(new PositionedCharacter(character, position));
    });

    this.gamePlay.redrawPositions(positions);
  }

  onCellClick(index) {
    if (!this.isPlayerTurn) return;

    const character = this.getCharacterAtIndex(index);
    if (!character) {
      this.gamePlay.showError("Нет персонажа на этой клетке");
      return;
    }

    if (this.selectedCharacter) {
      this.gamePlay.deselectCell(this.selectedCharacter.position);
    }

    this.selectedCharacter = character;
    this.gamePlay.selectCell(character.position);
  }

  onCellEnter(index) {
    const character = this.getCharacterAtIndex(index);
    if (character) {
      const info = this.getCharacterInfo(character);
      this.gamePlay.showCellTooltip(info, index);
    } else {
      this.gamePlay.hideCellTooltip(index);
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }

  getCharacterAtIndex(index) {
    const playerCharacter = this.playerTeam.characters.find(
      (char) => char.position === index
    );
    const enemyCharacter = this.enemyTeam.characters.find(
      (char) => char.position === index
    );
    return playerCharacter || enemyCharacter;
  }

  getCharacterInfo(character) {
    return `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
  }

  onNewGameClick() {
    this.currentLevel = 1;
    this.playerTeam = new Team();
    this.enemyTeam = new Team();
    this.isPlayerTurn = true;
    this.gamePlay.drawUi(themes[this.currentLevel]);
    this.generateTeams();
    this.redrawPositions();
  }

  onSaveGameClick() {
    this.saveGameState();
    this.gamePlay.showMessage("Игра сохранена");
  }

  onLoadGameClick() {
    this.loadGameState();
    this.gamePlay.drawUi(themes[this.currentLevel]);
    this.redrawPositions();
    this.gamePlay.showMessage("Игра загружена");
  }
}
