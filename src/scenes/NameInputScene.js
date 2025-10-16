// js/scenes/NameInputScene.js (IMPROVED)
class NameInputScene extends Phaser.Scene {
  constructor(){ super({ key: 'NameInputScene' }); }

  create() {
    const ui = getSafeArea(this);
    this.cameras.main.fadeIn(400,0,0,0);
    this.add.rectangle(ui.cx, ui.cy, ui.w, ui.h, 0xf5e6d3);

    // IMPROVED: Larger title
    this.add.text(ui.cx, ui.h * 0.18, getText({ th: 'คุณชื่ออะไร?', en: 'What is your name?' }), {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 48) + 'px',
      color: THEME.colors.secondary,
      align: 'center'
    }).setOrigin(0.5);

    // Capybara icon
    const capyIcon = this.add.image(ui.cx, ui.h * 0.28, 'icon_capybara');
    capyIcon.setDisplaySize(80, 80);  // Slightly bigger for name input

    // IMPROVED: Create HTML input with larger size
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = getText({ th: 'พิมพ์ชื่อที่นี่...', en: 'Type your name here...' });
    input.className = 'name-input';
    input.maxLength = 20;
    input.style.fontSize = '24px';
    input.style.padding = '18px 22px';
    input.style.height = '70px';
    document.body.appendChild(input);
    
    this.time.delayedCall(100, () => input.focus());

    // IMPROVED: Larger, more prominent enter button
    const enterBtn = this.add.text(ui.cx, ui.h * 0.7, getText({ th: 'เริ่มผจญภัย', en: 'Start Adventure' }), {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 30) + 'px',
      color: '#fff',
      backgroundColor: '#86b49d',
      padding: { x: 40, y: 16 }
    }).setOrigin(0.5).setInteractive();

    enterBtn.on('pointerover', () => {
      enterBtn.setStyle({ backgroundColor: '#9cb380' });
      this.tweens.add({ targets: enterBtn, scale: 1.08, duration: 200 });
    });
    
    enterBtn.on('pointerout', () => {
      enterBtn.setStyle({ backgroundColor: '#86b49d' });
      this.tweens.add({ targets: enterBtn, scale: 1, duration: 200 });
    });

    enterBtn.on('pointerdown', () => {
      if (input.value.trim()) {
        gameData.playerName = input.value.trim();
        if (document.body.contains(input)) document.body.removeChild(input);
        
        // ⭐ CHANGED: Pass storyIndex 0 for intro story
        fadeSceneTransition(this, 'StoryScene', { storyIndex: 0 }, 400);
      } else {
        this.tweens.add({ targets: enterBtn, x: ui.cx - 10, duration: 60, yoyo: true, repeat: 2 });
      }
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') enterBtn.emit('pointerdown');
    });

    // IMPROVED: Helper text
    this.add.text(ui.cx, ui.h * 0.8, 
      getText({ 
        th: '(สูงสุด 20 ตัวอักษร)',
        en: '(Maximum 20 characters)'
      }), {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 16) + 'px',
      color: '#999999'
    }).setOrigin(0.5);

    // Clean up on scene change
    this.events.once('shutdown', () => { if (document.body.contains(input)) input.remove(); });
    this.events.once('destroy', () => { if (document.body.contains(input)) input.remove(); });
  }
}