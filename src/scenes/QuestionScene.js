// js/scenes/QuestionScene.js (IMPROVED & FIXED)
class QuestionScene extends Phaser.Scene {
  constructor(){ super({ key: 'QuestionScene' }); }

  create() {
    const ui = getSafeArea(this);
    this.cameras.main.fadeIn(350,0,0,0);
    this.add.rectangle(ui.cx, ui.cy, ui.w, ui.h, 0xd4e7d7);

    const qIndex = gameData.currentQuestion;
    const q = questions[qIndex];

    // IMPROVED: Larger progress header
    const header = this.add.text(ui.cx, ui.h * 0.05, 
      getText({ 
        th: `คำถามที่ ${qIndex+1} / ${questions.length}`, 
        en: `Question ${qIndex+1} / ${questions.length}` 
      }), {
      fontFamily:'Kanit', 
      fontSize: getResponsiveFontSize(this, 24) + 'px',
      color: THEME.colors.textDark, 
      backgroundColor: '#ffffffcc', 
      padding: { x: 18, y: 10 }
    }).setOrigin(0.5);

    // IMPROVED: Larger question box
    const qCardW = ui.safeW * 0.9;
    const qCardH = ui.h * 0.18;
    
    const qBox = this.add.rectangle(ui.cx, ui.h * 0.2, qCardW, qCardH, 0xffffff, 0.98)
      .setStrokeStyle(4, THEME.colors.primary)
      .setOrigin(0.5);
    
    const qText = this.add.text(ui.cx, qBox.y, '', {
      fontFamily:'Kanit', 
      fontSize: getResponsiveFontSize(this, 28) + 'px',
      color: THEME.colors.textDark, 
      align:'center', 
      wordWrap: { width: qCardW - 50 },
      lineSpacing: 8
    }).setOrigin(0.5);

    let qTimer = playTypewriter(this, qText, getText(q.text), 22);

    const allowShowChoices = () => {
      if (qTimer && qTimer.getProgress && qTimer.getProgress() < 1) {
        qTimer.remove(false);
        qText.setText(getText(q.text));
      }
      this.showChoices(q, ui);
    };
    
    this.input.once('pointerdown', allowShowChoices);

    // IMPROVED: Use icon images instead of emojis
const scoreContainer = this.add.container(ui.w - 12, ui.h - 12);

// Background
const scoreBg = this.add.graphics();
scoreBg.fillStyle(0xffffff, 0.67);
scoreBg.fillRoundedRect(-110, -32, 110, 32, 8);
scoreContainer.add(scoreBg);

// Mood icon
const moodIcon = this.add.image(-88, -16, 'icon_mood');
moodIcon.setDisplaySize(22, 22);

// Mood text
const moodText = this.add.text(-65, -16, `${gameData.mood}`, {
  fontFamily: 'Kanit',
  fontSize: getResponsiveFontSize(this, 16) + 'px',
  color: '#666666'
}).setOrigin(0, 0.5);

// Energy icon
const energyIcon = this.add.image(-32, -16, 'icon_energy');
energyIcon.setDisplaySize(22, 22);

// Energy text
const energyText = this.add.text(-9, -16, `${gameData.energy}`, {
  fontFamily: 'Kanit',
  fontSize: getResponsiveFontSize(this, 16) + 'px',
  color: '#666666'
}).setOrigin(0, 0.5);

scoreContainer.add([moodIcon, moodText, energyIcon, energyText]);
  }

  showChoices(q, ui) {
    // FIXED: Better cleanup
    if (this.choicesContainer) {
        this.choicesContainer.destroy();
    }
    
    // Create a container to hold all choices
    this.choicesContainer = this.add.container(0, 0);

    const startY = ui.h * 0.42;
    const spacing = 155;
    const choiceW = Math.min(620, ui.safeW * 0.95);

    q.choices.forEach((choice, idx) => {
      const y = startY + idx * spacing;
      const container = this.add.container(ui.cx, y);

      const badgeRadius = 30;
      const badge = this.add.circle(-choiceW/2 - 50, 0, badgeRadius, THEME.colors.primary);
      const badgeText = this.add.text(-choiceW/2 - 50, 0, (idx + 1).toString(), {
        fontFamily:'Kanit', 
        fontSize: getResponsiveFontSize(this, 26) + 'px',
        color:'#fff'
      }).setOrigin(0.5);

      const btn = this.add.text(0, 0, getText(choice.text), {
        fontFamily:'Kanit', 
        fontSize: getResponsiveFontSize(this, 24) + 'px',
        color: THEME.colors.textDark,
        backgroundColor: '#f5e6d3', 
        padding: { x: 48, y: 32 },
        fixedWidth: choiceW, 
        fixedHeight: 110,
        align:'center', 
        wordWrap: { width: choiceW - 20 },
        lineSpacing: 6
      }).setOrigin(0.5).setInteractive();

      container.add([badge, badgeText, btn]);
      this.choicesContainer.add(container);

      btn.on('pointerover', () => {
        btn.setStyle({ backgroundColor: '#e8d5b7' });
        badge.setFillStyle(THEME.colors.accent);
        this.tweens.add({ targets: container, scale: 1.04, duration: 150 });
      });
      
      btn.on('pointerout', () => {
        btn.setStyle({ backgroundColor: '#f5e6d3' });
        badge.setFillStyle(THEME.colors.primary);
        this.tweens.add({ targets: container, scale: 1, duration: 150 });
      });

      btn.on('pointerdown', () => {
        this.tweens.add({ 
          targets: container, 
          scale: 0.96, 
          duration: 80, 
          yoyo: true, 
          onComplete: () => {
            const resultId = computeResultId(gameData.currentQuestion, idx);
            this.scene.start('ResultScene', { resultId, questIndex: gameData.currentQuestion });
          }
        });
      });
    });
  }
}