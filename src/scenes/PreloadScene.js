// js/scenes/PreloadScene.js - Image Loading Scene
class PreloadScene extends Phaser.Scene {
  constructor() { 
    super({ key: 'PreloadScene' }); 
  }

  preload() {
    const ui = getSafeArea(this);
    
    // Background
    this.add.rectangle(ui.cx, ui.cy, ui.w, ui.h, 0x9cb380);
    
    // Loading text
    const loadingText = this.add.text(ui.cx, ui.h * 0.45, 'Loading...', {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 32) + 'px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Progress bar background
    const barWidth = ui.safeW * 0.7;
    const barHeight = 30;
    const barX = ui.cx - barWidth / 2;
    const barY = ui.h * 0.55;

    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRoundedRect(barX, barY, barWidth, barHeight, 10);

    const progressBar = this.add.graphics();

    // Percentage text
    const percentText = this.add.text(ui.cx, barY + barHeight + 30, '0%', {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 20) + 'px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Update progress bar
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRoundedRect(barX + 3, barY + 3, (barWidth - 6) * value, barHeight - 6, 8);
      
      percentText.setText(Math.floor(value * 100) + '%');
      loadingText.setText('Loading... ' + Math.floor(value * 100) + '%');
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.setText('Complete!');
    });

    // ============================================
    // LOAD ALL IMAGES HERE
    // ============================================

    // 1. BACKGROUND IMAGES (900x1600px recommended)
    // Uncomment when you have the images:
    this.load.image('bg_start', 'assets/images/backgrounds/bg_start.webp');
    this.load.image('bg_consent', 'assets/images/backgrounds/bg_consent.webp');
    this.load.image('bg_name', 'assets/images/backgrounds/bg_name.webp');
    this.load.image('bg_story', 'assets/images/backgrounds/bg_story.webp');
    this.load.image('bg_question', 'assets/images/backgrounds/bg_question.webp');
    this.load.image('bg_result', 'assets/images/backgrounds/bg_result.webp');
    this.load.image('bg_final', 'assets/images/backgrounds/bg_final.webp');

    // 2. LOGO & MAIN CHARACTERS (400x400px recommended)
    this.load.image('logo', 'assets/images/logo.png');
    // this.load.image('capybara', 'assets/images/characters/capybara.png');
    // this.load.image('train', 'assets/images/characters/train.png');
    this.load.image('icon_train', 'assets/images/icons/icon_train.png');
    this.load.image('icon_capybara', 'assets/images/icons/icon_capybara.png');
    this.load.image('icon_cat', 'assets/images/icons/icon_cat.png');
    this.load.image('icon_mood', 'assets/images/icons/icon_mood.png');
    this.load.image('icon_energy', 'assets/images/icons/icon_energy.png');

    // 3. RESULT IMAGES (250x250px recommended, 15 total: result_0 to result_14)
    // Try to load real images
for (let i = 0; i < 15; i++) {
  this.load.image(`result_${i}`, `assets/images/results/result_${i}.png`);
}

// Create placeholders as backup (after load completes)
this.load.on('complete', () => {
  for (let i = 0; i < 15; i++) {
    // Only create placeholder if real image failed to load
    if (!this.textures.exists(`result_${i}`)) {
      this.textures.addCanvas(`result_${i}`, this.createPlaceholder(i));
    }
  }
});

    // 4. FRIEND IMAGES for Final Results (350x350px recommended, 3 friends)
    this.load.image('friend_0', 'assets/images/friends/friend_0.png'); // Lion Cat
    this.load.image('friend_1', 'assets/images/friends/friend_1.png'); // Golden Cat
    this.load.image('friend_2', 'assets/images/friends/friend_2.png'); // Lizard Friend
    
    // TEMPORARY: Create placeholder for friends
    // ✅ FIXED: Only create placeholders for images that FAILED to load
this.load.on('complete', () => {
  for (let i = 0; i < 3; i++) {
    if (!this.textures.exists(`friend_${i}`)) {
      this.textures.addCanvas(`friend_${i}`, this.createFriendPlaceholder(i));
    }
  }
});

    // 5. STORY CHARACTER IMAGES (300x300px recommended)
    //this.load.image('cat_happy', 'assets/images/story/cat_happy.png');
    //this.load.image('cat_hungry', 'assets/images/story/cat_hungry.png');
    //this.load.image('cat_scared', 'assets/images/story/cat_scared.png');
    //this.load.image('cat_hot', 'assets/images/story/cat_hot.png');
    //this.load.image('kaiju_cat', 'assets/images/story/kaiju_cat.png');

    // 6. UI ELEMENTS (100-200px recommended)
    // this.load.image('button_bg', 'assets/images/ui/button_bg.png');
    // this.load.image('card_frame', 'assets/images/ui/card_frame.png');
  }

  // Helper: Create placeholder for result images
  createPlaceholder(index) {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    
    // Different colors for each result
    const colors = ['#FF6B9D', '#4ECDC4', '#FFD700', '#FF9A9E', '#A8EDEA', 
                    '#FEC8D8', '#FFDFD3', '#D4FC79', '#96E6A1', '#C4E0E5',
                    '#F6D5F7', '#FBE7C6', '#B4F8C8', '#A0E7E5', '#FFAEBC'];
    
    ctx.fillStyle = colors[index % colors.length];
    ctx.fillRect(0, 0, 500, 500);
    
    // Add number
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 160px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(index, 250, 250);
    
    return canvas;
  }

  // Helper: Create placeholder for friend images
  createFriendPlaceholder(index) {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');
    
    const colors = ['#FF6B6B', '#4ECDC4', '#95E1D3'];
    const emojis = ['🦁', '🌸', '☁️'];
    
    ctx.fillStyle = colors[index];
    ctx.fillRect(0, 0, 500, 700);
    
    ctx.font = '140px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emojis[index], 250, 350);
    
    return canvas;
  }

  create() {
    // Wait a moment to show completion, then start game
    this.time.delayedCall(500, () => {
      this.scene.start('StartScene');
    });
  }
}