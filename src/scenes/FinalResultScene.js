// js/scenes/FinalResultScene.js - ✅ FIXED: No overlapping, larger image
class FinalResultScene extends Phaser.Scene {
  constructor(){ 
    super({ key: 'FinalResultScene' }); 
  }

  init(data){ 
    this.finalMood = data.mood; 
    this.finalEnergy = data.energy; 
  }

  create() {
    const ui = getSafeArea(this);
    this.cameras.main.fadeIn(500, 0, 0, 0);
    
    // Background
    this.add.rectangle(ui.cx, ui.cy, ui.w, ui.h, 0xe0d5e8);

    const ending = calculateFinalEnding();

    // ============================================
    // FIXED LAYOUT with proper spacing
    // ============================================
    
    let currentY = ui.h * 0.06;  // Start higher

    // 1️⃣ LOGO (Optional - only if exists)
    if (this.textures.exists('logo')) {
      const logo = this.add.image(ui.cx, currentY, 'logo');
      logo.setDisplaySize(70, 70);
      currentY += 55;  // Space after logo
    }

    // 2️⃣ TITLE
    const title = this.add.text(ui.cx, currentY, 
      getText({ th: 'เพื่อนใหม่ของคุณคือ...', en: 'Your new friend is...' }), {
      fontFamily: 'Kanit', 
      fontSize: getResponsiveFontSize(this, 32) + 'px', 
      color: THEME.colors.secondary,
      fontStyle: 'bold'
    }).setOrigin(0.5);
    currentY += 45;  // ✅ Fixed spacing

    // 3️⃣ FRIEND IMAGE - LARGER SIZE!
    const friendIndex = ending.type === 'friend1' ? 0 : 
                        ending.type === 'friend2' ? 1 : 2;
    const friendImageKey = `friend_${friendIndex}`;
    
    // ⭐ LARGER IMAGE SIZE - More visible!
    const maxWidth = Math.min(500, ui.safeW * 0.9);
    const maxHeight = Math.min(700, ui.h * 0.6);  // Increased height
    
    const friendImage = this.add.image(ui.cx, currentY + (maxHeight / 2), friendImageKey);
    
    const scale = Math.min(
      maxWidth / friendImage.width,
      maxHeight / friendImage.height
    );
    friendImage.setScale(scale);
    
    currentY += maxHeight + 50;  // ✅ Move down by image height + spacing

    // 4️⃣ FRIEND NAME
    const friendName = this.add.text(ui.cx, currentY, 
      getText(ending.name), {
      fontFamily: 'Kanit', 
      fontSize: getResponsiveFontSize(this, 48) + 'px', 
      color: THEME.colors.secondary,
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: ui.safeW * 0.9 }
    }).setOrigin(0.5);
    currentY += 100;  // ✅ Fixed spacing after name

    // 5️⃣ DESCRIPTION
    const descWidth = Math.min(900, ui.safeW * 0.92);
    
    const friendDesc = this.add.text(ui.cx, currentY, 
      getText(ending.description), {
      fontFamily: 'Kanit', 
      fontSize: getResponsiveFontSize(this, 24) + 'px', 
      color: THEME.colors.textDark, 
      align: 'center', 
      wordWrap: { width: descWidth - 40 },
      lineSpacing: 6
    }).setOrigin(0.5);
    
    // Calculate actual height of description
    const descHeight = friendDesc.height;
    currentY += descHeight + 30;  // ✅ Dynamic spacing based on text height

    // 6️⃣ FINAL SCORE HEADER
    const scoresHeader = this.add.text(ui.cx, currentY, 
      getText({ th: 'คะแนนสุดท้าย', en: 'Final Score' }), {
      fontFamily: 'Kanit', 
      fontSize: getResponsiveFontSize(this, 28) + 'px', 
      color: THEME.colors.secondary,
      fontStyle: 'bold',
      align: 'center'
    }).setOrigin(0.5);
    currentY += 50;  // ✅ Fixed spacing

    // 7️⃣ SCORE ICONS
    const finalScoreContainer = this.add.container(ui.cx, currentY);

    // Mood icon
    const finalMoodIcon = this.add.image(-70, 0, 'icon_mood');
    finalMoodIcon.setDisplaySize(40, 40);

    const finalMoodText = this.add.text(-35, 0, 
      `${this.finalMood}`, {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 24) + 'px',
      color: '#2d6a4f',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    // Energy icon
    const finalEnergyIcon = this.add.image(30, 0, 'icon_energy');
    finalEnergyIcon.setDisplaySize(40, 40);

    const finalEnergyText = this.add.text(65, 0, 
      `${this.finalEnergy}`, {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 24) + 'px',
      color: '#2d6a4f',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    finalScoreContainer.add([finalMoodIcon, finalMoodText, finalEnergyIcon, finalEnergyText]);
    currentY += 70;  // ✅ Fixed spacing

    // 8️⃣ CONTINUE BUTTON
    const buttonWidth = Math.min(380, ui.safeW * 0.75);
    const continueBtn = this.add.text(ui.cx, currentY -20, 
      getText({ th: 'ต่อไป →', en: 'Continue →' }), {
      fontFamily: 'Kanit', 
      fontSize: getResponsiveFontSize(this, 22) + 'px', 
      color: '#fff', 
      backgroundColor: '#86b49d', 
      padding: { x: 28, y: 14 }, 
      fixedWidth: buttonWidth, 
      align: 'center'
    }).setOrigin(0.5).setInteractive();

    // Button interactions
    continueBtn.on('pointerover', () => {
      continueBtn.setStyle({ backgroundColor: '#9cb380' });
      this.tweens.add({ targets: continueBtn, scale: 1.05, duration: 150 });
    });

    continueBtn.on('pointerout', () => {
      continueBtn.setStyle({ backgroundColor: '#86b49d' });
      this.tweens.add({ targets: continueBtn, scale: 1, duration: 150 });
    });

    continueBtn.on('pointerdown', () => {
      this.tweens.add({ 
        targets: continueBtn, 
        scale: 0.96, 
        duration: 80, 
        yoyo: true, 
        onComplete: () => fadeSceneTransition(this, 'ComingSoonScene', {}, 400) 
      });
    });

    // Entrance animations
    title.setAlpha(0);
    friendImage.setScale(0).setAlpha(0);
    friendName.setAlpha(0);
    friendDesc.setAlpha(0);
    finalScoreContainer.setAlpha(0);
    continueBtn.setAlpha(0);

    // Staggered animations
    this.tweens.add({ 
      targets: title, 
      alpha: 1, 
      duration: 400, 
      delay: 200 
    });

    this.tweens.add({ 
      targets: friendImage, 
      scale: scale, 
      alpha: 1, 
      duration: 600, 
      ease: 'Back.easeOut',
      delay: 400 
    });

    this.tweens.add({ 
      targets: friendName, 
      alpha: 1, 
      duration: 400, 
      delay: 800 
    });

    this.tweens.add({ 
      targets: friendDesc, 
      alpha: 1, 
      duration: 400, 
      delay: 1000 
    });

    this.tweens.add({ 
      targets: finalScoreContainer, 
      alpha: 1, 
      duration: 400, 
      delay: 1200 
    });

    this.tweens.add({ 
      targets: continueBtn, 
      alpha: 1, 
      duration: 400, 
      delay: 1400 
    });

    // Confetti
    this.time.delayedCall(1600, () => this.createConfetti());
  }

  createConfetti() {
    const ui = getSafeArea(this);
    const colors = [0xff6b9d, 0x4ecdc4, 0xffd700, 0xff9a9e, 0xa8edea, 0x86b49d];
    for (let i = 0; i < 35; i++) {
      const rect = this.add.rectangle(
        Phaser.Math.Between(0, ui.w), 
        -20, 
        Phaser.Math.Between(6, 12), 
        Phaser.Math.Between(8, 16), 
        Phaser.Utils.Array.GetRandom(colors)
      );
      this.tweens.add({
        targets: rect,
        y: ui.h + 30,
        rotation: Phaser.Math.Between(-6, 6),
        duration: Phaser.Math.Between(1800, 3500),
        delay: i * 50,
        ease: 'Power1',
        onComplete: () => rect.destroy()
      });
    }
  }
}