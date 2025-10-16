// js/scenes/ResultScene.js - Clean & Fixed (WITH STORY ROUTING)
class ResultScene extends Phaser.Scene {
  constructor(){ 
    super({ key: 'ResultScene' }); 
  }

  init(data) {
    this.resultId = data.resultId;
    this.questIndex = data.questIndex;
  }


  create() {
    const ui = getSafeArea(this);
    this.cameras.main.fadeIn(400, 0, 0, 0);

    const res = resultAssets[this.resultId];

    // Background color
    this.add.rectangle(ui.cx, ui.cy, ui.w, ui.h, 0xf4d6cc);

    // Header
    this.add.text(ui.cx, ui.h * 0.08, getText({ th: 'ผลลัพธ์', en: 'Result' }), {
      fontFamily: 'Kanit', 
      fontSize: getResponsiveFontSize(this, 28) + 'px', 
      color: THEME.colors.secondary
    }).setOrigin(0.5);

    // Card configuration
    const CARD_CONFIG = {
      width: Math.min(640, ui.safeW * 0.92),
      height: ui.h * 0.72,
      cornerRadius: 18,
      y: ui.h * 0.52
    };

    const card = this.add.container(ui.cx, CARD_CONFIG.y);

    // Card shadow
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.10);
    shadow.fillRoundedRect(
      -CARD_CONFIG.width/2 + 5, 
      -CARD_CONFIG.height/2 + 5, 
      CARD_CONFIG.width, 
      CARD_CONFIG.height, 
      CARD_CONFIG.cornerRadius
    );

    // Card background
    const bg = this.add.graphics();
    bg.fillStyle(0xffffff, 1);
    bg.fillRoundedRect(
      -CARD_CONFIG.width/2, 
      -CARD_CONFIG.height/2, 
      CARD_CONFIG.width, 
      CARD_CONFIG.height, 
      CARD_CONFIG.cornerRadius
    );
    bg.lineStyle(4, THEME.colors.primary);
    bg.strokeRoundedRect(
      -CARD_CONFIG.width/2, 
      -CARD_CONFIG.height/2, 
      CARD_CONFIG.width, 
      CARD_CONFIG.height, 
      CARD_CONFIG.cornerRadius
    );

    card.add([shadow, bg]);

    // Layout positions (from card top)
    const LAYOUT = {
      startY: -CARD_CONFIG.height/2,
      nameY: 50,
      imageY: 240,
      descBoxY: 520,
      statsY: 700,
      buttonY: 800,
      imageSize: 280,
      descBoxHeight: 200
    };

    // Result name
    const nameText = this.add.text(
      0, 
      LAYOUT.startY + LAYOUT.nameY, 
      getText(res.name), 
      {
        fontFamily: 'Kanit', 
        fontSize: getResponsiveFontSize(this, 26) + 'px', 
        color: THEME.colors.secondary, 
        align: 'center',
        wordWrap: { width: CARD_CONFIG.width - 80 }
      }
    ).setOrigin(0.5);
    
    card.add(nameText);

    // Image or emoji placeholder
    const imageKey = `result_${this.resultId}`;
    
    
    if (this.textures.exists(imageKey)) {
      // If image exists, show it
      const resultImage = this.add.image(0, LAYOUT.startY + LAYOUT.imageY, imageKey);
      
      // Auto-scale to fit
      const scale = Math.min(
        LAYOUT.imageSize / resultImage.width, 
      LAYOUT.imageSize / resultImage.height
      );
      resultImage.setScale(scale);
      
      card.add(resultImage);
    } else {
      // Fallback: Show emoji with frame
      const emojiFrame = this.add.graphics();
      emojiFrame.lineStyle(3, THEME.colors.accent);
      emojiFrame.strokeRoundedRect(
        -LAYOUT.imageSize/2, 
        LAYOUT.startY + LAYOUT.imageY - LAYOUT.imageSize/2, 
        LAYOUT.imageSize, 
        LAYOUT.imageSize, 
        12
      );
      card.add(emojiFrame);
      
      const emoji = this.add.text(
        0, 
        LAYOUT.startY + LAYOUT.imageY, 
        '🎨', 
        { fontSize: getResponsiveFontSize(this, 90) + 'px' }
      ).setOrigin(0.5);
      
      card.add(emoji);
    }

    // Description box
    const descBoxWidth = CARD_CONFIG.width - 60;
    
    
    // Background box for description
    const descBg = this.add.graphics();
    descBg.fillStyle(0xf5f5f5, 0.9);
    descBg.fillRoundedRect(
      -descBoxWidth/2, 
      LAYOUT.startY + LAYOUT.descBoxY - LAYOUT.descBoxHeight/2, 
      descBoxWidth, 
      LAYOUT.descBoxHeight, 
      10
    );
    card.add(descBg);

    // Description text
    const descText = this.add.text(
      0, 
      LAYOUT.startY + LAYOUT.descBoxY, 
      '', 
      {
        fontFamily: 'Kanit', 
        fontSize: getResponsiveFontSize(this, 18) + 'px', 
        color: THEME.colors.textDark, 
        align: 'center',
        wordWrap: { width: descBoxWidth - 30 },
        lineSpacing: 6
      }
    ).setOrigin(0.5);
    
    card.add(descText);

    // Typewriter animation
    let typewriterTimer = playTypewriter(this, descText, getText(res.description), 20);
    let animationSkipped = false;
    
    this.input.once('pointerdown', () => {
      if (typewriterTimer && typewriterTimer.getProgress && typewriterTimer.getProgress() < 1 && !animationSkipped) {
        typewriterTimer.remove(false);
        descText.setText(getText(res.description));
        animationSkipped = true;
      }
    });

    // Stats display
    const statsBoxWidth = 280;
    const statsBoxHeight = 50;
    
    const statsBg = this.add.graphics();
    statsBg.fillStyle(THEME.colors.accent, 0.2);
    statsBg.fillRoundedRect(
      -statsBoxWidth/2, 
      LAYOUT.startY + LAYOUT.statsY - statsBoxHeight/2, 
      statsBoxWidth, 
      statsBoxHeight, 
      10
    );
    card.add(statsBg);

    // Stats container with icons
    const statsContainer = this.add.container(0, LAYOUT.startY + LAYOUT.statsY);

    // Mood section
    const moodIcon = this.add.image(-80, 0, 'icon_mood');
    moodIcon.setDisplaySize(35, 35);

    const moodText = this.add.text(-50, 0, 
      `${res.moodDelta >= 0 ? '+' : ''}${res.moodDelta}`, 
      {
       fontFamily: 'Kanit', 
       fontSize: getResponsiveFontSize(this, 22) + 'px', 
       color: '#2d6a4f',
       fontStyle: 'bold'
      }
    ).setOrigin(0, 0.5);

    // Energy section
    const energyIcon = this.add.image(30, 0, 'icon_energy');
    energyIcon.setDisplaySize(35, 35);

    const energyText = this.add.text(60, 0, 
      `${res.energyDelta >= 0 ? '+' : ''}${res.energyDelta}`, 
      {
        fontFamily: 'Kanit', 
        fontSize: getResponsiveFontSize(this, 22) + 'px', 
        color: '#2d6a4f',
        fontStyle: 'bold'
      }
    ).setOrigin(0, 0.5);

    statsContainer.add([moodIcon, moodText, energyIcon, energyText]);
    card.add(statsContainer);

    // Update game data
    gameData.mood += res.moodDelta;
    gameData.energy += res.energyDelta;
    gameData.resultHistory.push(this.resultId);

    // Next button
    const isLastQuestion = this.questIndex >= (questions.length - 1);
    const buttonLabel = isLastQuestion 
      ? getText({ th: 'ดูผลลัพธ์สุดท้าย! 🎉', en: 'See Final Result! 🎉' }) 
      : getText({ th: 'คำถามถัดไป →', en: 'Next Question →' });

    const buttonWidth = CARD_CONFIG.width * 0.75;
    
    const nextButton = this.add.text(
      0, 
      LAYOUT.startY + LAYOUT.buttonY, 
      buttonLabel, 
      {
        fontFamily: 'Kanit', 
        fontSize: getResponsiveFontSize(this, 20) + 'px', 
        color: '#fff', 
        backgroundColor: '#86b49d', 
        padding: { x: 28, y: 14 }, 
        fixedWidth: buttonWidth, 
        align: 'center'
      }
    ).setOrigin(0.5).setInteractive();
    
    card.add(nextButton);

    // Button hover effect
    nextButton.on('pointerover', () => {
      nextButton.setStyle({ backgroundColor: '#9cb380' });
      this.tweens.add({ 
        targets: nextButton, 
        scale: 1.05, 
        duration: 150 
      });
    });
    
    nextButton.on('pointerout', () => {
      nextButton.setStyle({ backgroundColor: '#86b49d' });
      this.tweens.add({ 
        targets: nextButton, 
        scale: 1, 
        duration: 150 
      });
    });

    // ⭐ CHANGED: Button click action - Goes to StoryScene instead of QuestionScene
    nextButton.on('pointerdown', () => {
      if (isLastQuestion) {
        // Last question: go to final result
        fadeSceneTransition(this, 'FinalResultScene', { 
          mood: gameData.mood, 
          energy: gameData.energy 
        }, 500);
      } else {
        // Not last question: go to story scene first
        gameData.currentQuestion++;
        
        // Calculate which story to show
        // After Q1 result (currentQuestion=1) → show story1 (index 1)
        // After Q2 result (currentQuestion=2) → show story2 (index 2)
        // etc.
        const nextStoryIndex = gameData.currentQuestion;
        
        fadeSceneTransition(this, 'StoryScene', { 
          storyIndex: nextStoryIndex 
        }, 350);
      }
    });

    // Card entrance animation
    card.setScale(0.88).setAlpha(0);
    this.tweens.add({ 
      targets: card, 
      scale: 1, 
      alpha: 1, 
      duration: 550, 
      ease: 'Back.easeOut',
      delay: 100
    });

    // Bottom score container
const scoreContainer = this.add.container(ui.w - 20, ui.h - 20);

// Background
const scoreBg = this.add.graphics();
scoreBg.fillStyle(0xffffff, 0.8);
scoreBg.fillRoundedRect(-100, -35, 150, 40, 8);
scoreContainer.add(scoreBg);

// Mood icon and text
const scoreMoodIcon = this.add.image(-110, -17, 'icon_mood');
scoreMoodIcon.setDisplaySize(20, 20);

const scoreMoodText = this.add.text(-80, -17, 
  `${gameData.mood}`, 
  {
    fontFamily: 'Kanit', 
    fontSize: getResponsiveFontSize(this, 16) + 'px',
    color: '#666666'
  }
).setOrigin(0, 0.5);

// Energy icon and text
const scoreEnergyIcon = this.add.image(-30, -17, 'icon_energy');
scoreEnergyIcon.setDisplaySize(20, 20);

const scoreEnergyText = this.add.text(-20, -17, 
  `${gameData.energy}`, 
  {
    fontFamily: 'Kanit', 
    fontSize: getResponsiveFontSize(this, 16) + 'px',
    color: '#666666'
  }
).setOrigin(0, 0.5);

scoreContainer.add([scoreMoodIcon, scoreMoodText, scoreEnergyIcon, scoreEnergyText]);
  }
}