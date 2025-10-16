// main.js - initialize Phaser game and scenes

const GAME_CONFIG = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 900,
  height: 1600,
  backgroundColor: THEME.colors.bg,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: []
};

GAME_CONFIG.scene = [
  PreloadScene,
  StartScene,
  ConsentScene,
  NameInputScene,
  StoryScene,
  QuestionScene,
  ResultScene,
  FinalResultScene,
  ComingSoonScene
];

window.game = new Phaser.Game(GAME_CONFIG);
console.log('%c🚂 Capybara Train v2 (Phaser 3.88.2) - IMPROVED VERSION', 'font-size: 16px; color: #86b49d; font-weight: bold;');
