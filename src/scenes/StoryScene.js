// js/scenes/StoryScene.js - MODIFIED to show different stories
class StoryScene extends Phaser.Scene {
  constructor(){ 
    super({ key: 'StoryScene' }); 
  }

  // ⭐ NEW: Receive which story to show
  init(data) {
    // storyIndex: 0 = intro, 1 = story1, 2 = story2, 3 = story3, 4 = story4
    this.storyIndex = data.storyIndex !== undefined ? data.storyIndex : 0;
  }

  create() {
    const ui = getSafeArea(this);
    this.cameras.main.fadeIn(400, 0, 0, 0);
    this.add.rectangle(ui.cx, ui.cy, ui.w, ui.h, 0xfef3c7);

    // Title
    this.add.text(ui.cx, ui.h * 0.10, getText({ th: 'เรื่องราว', en: 'Story' }), {
      fontFamily: 'Kanit', 
      fontSize: getResponsiveFontSize(this, 32) + 'px', 
      color: THEME.colors.secondary,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // ⭐ CHANGED: Get story lines based on storyIndex
    const storyLines = getStoryForQuestion(this.storyIndex);

    // Story box
    const boxW = ui.safeW * 0.92;
    const boxH = ui.h * 0.52;
    const boxY = ui.h * 0.48;
    
    const storyBox = this.add.rectangle(ui.cx, boxY, boxW, boxH, 0xffffff, 0.96)
      .setStrokeStyle(4, THEME.colors.primary)
      .setOrigin(0.5);

    const storyText = this.add.text(ui.cx, boxY, '', {
      fontFamily: 'Kanit', 
      fontSize: getResponsiveFontSize(this, 22) + 'px', 
      color: THEME.colors.textDark,
      align: 'center', 
      wordWrap: { width: boxW * 0.88 }, 
      lineSpacing: 10
    }).setOrigin(0.5);

    // ⭐ CHANGED: Combine all lines into single string
    const fullStory = storyLines.join('\n');
    let currentTimer = playTypewriter(this, storyText, fullStory, 22);

    // ⭐ SIMPLIFIED: Single action handler
    const nextAction = () => {
      if (currentTimer && currentTimer.getProgress && currentTimer.getProgress() < 1) {
        // Skip typewriter animation
        currentTimer.remove(false);
        storyText.setText(fullStory);
      } else {
        // Story finished, go to next question
        fadeSceneTransition(this, 'QuestionScene', {}, 400);
      }
    };

    this.input.on('pointerdown', nextAction);

    // Tap hint
    this.add.text(ui.cx, ui.h * 0.88, 
      getText({ th: 'แตะเพื่อไปต่อ', en: 'Tap to continue' }), {
      fontFamily: 'Kanit', 
      fontSize: getResponsiveFontSize(this, 16) + 'px', 
      color: '#666'
    }).setOrigin(0.5);

    // ⭐ NEW: Progress indicator (show only after intro)
    if (this.storyIndex > 0) {
      this.add.text(ui.w - 20, ui.h * 0.06, 
        `📍 ${this.storyIndex}/4`, {
        fontFamily: 'Kanit',
        fontSize: getResponsiveFontSize(this, 16) + 'px',
        color: '#999',
        backgroundColor: '#ffffffbb',
        padding: { x: 10, y: 6 }
      }).setOrigin(1, 0);
    }
  }
}