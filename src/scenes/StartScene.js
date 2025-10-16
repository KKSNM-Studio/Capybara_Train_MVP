// js/scenes/StartScene.js (WITH ROUNDED BUTTONS) ✨
class StartScene extends Phaser.Scene {
  constructor() { super({ key: 'StartScene' }); }

  create() {
    const ui = getSafeArea(this);
    this.cameras.main.fadeIn(600,0,0,0);

    // Background - use loaded image
    if (this.textures.exists('bg_start')) {
      const bg = this.add.image(ui.cx, ui.cy, 'bg_start');
      bg.setDisplaySize(ui.w, ui.h);
    } else {
      this.add.rectangle(ui.cx, ui.cy, ui.w, ui.h, 0x9cb380);
    }

    // Title with larger text
    const title = this.add.text(ui.cx, ui.h * 0.2, 'Capybara Train\nKaiju Cat Paradise', {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 52) + 'px',
      color: '#ffffff',
      align: 'center',
      stroke: '#8b6f47',
      strokeThickness: 7,
      lineSpacing: 8
    }).setOrigin(0.5);

    // Larger emoji
    // Icon container for train, capybara, cat
    const iconContainer = this.add.container(ui.cx, ui.h * 0.32);

    // Train icon
    const trainIcon = this.add.image(-100, 0, 'icon_train');
    trainIcon.setDisplaySize(80, 80);

    // Capybara icon
    const capyIcon = this.add.image(0, 0, 'icon_capybara');
    capyIcon.setDisplaySize(80, 80);

    // Cat icon
    const catIcon = this.add.image(100, 0, 'icon_cat');
    catIcon.setDisplaySize(80, 80);

    iconContainer.add([trainIcon, capyIcon, catIcon]);

    // Subtitle in box
    const subtitleBox = this.add.rectangle(ui.cx, ui.h * 0.45, ui.safeW * 0.92, 300, 0x000000, 0.3)
      .setOrigin(0.5);
    subtitleBox.setStrokeStyle(2, 0xffffff, 0.5);
    
    const subtitle = this.add.text(ui.cx, ui.h * 0.45, '', {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 22) + 'px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: ui.safeW * 0.85 }
    }).setOrigin(0.5);

    const subtitleStr = getText({ 
      th: 'ตอนการผจญภัยในเมืองแมวใหญ่แมวยักษ์\nเพื่อตามหาว่าเพื่อนร่วมทางของคุณจะเป็นตัวอะไร\nน่าสนุกใช่มั้ยล้าาาา ไปติดตามกัน\nไปยังเอ่ยยย ไปยังน้า ไปรึยางงงง\nไปม้ายยย ไปอ่ะป้าววว', 
      en: 'The adventure in the city of KaijuCat\nTo find out what your companion will be\nLooks fun, right? Lets follow along\nShould we go? Should we go? Should we go or not?\nShould we go or not!!!!!?' 
    });
    
    let t = playTypewriter(this, subtitle, subtitleStr, 25);
    this.input.once('pointerdown', () => {
      if (t && t.getProgress && t.getProgress() < 1) {
        t.remove(false);
        subtitle.setText(subtitleStr);
      }
    });

    // ✨ NEW: START BUTTON WITH ROUNDED CORNERS
    const startBtn = createRoundedButton(
      this,
      ui.cx,
      ui.h * 0.72,
      getText({ th: 'เริ่มเลย!', en: 'Start!' }),
      {
        width: 300,
        height: 85,
        radius: 24,
        fontSize: 38,
        bgColor: 0x86b49d,
        bgColorHover: 0x9cb380,
        hasShadow: true
      }
    );

    startBtn.on('pointerdown', () => {
      fadeSceneTransition(this, 'ConsentScene', {}, 450);
    });

    // ✨ NEW: LANGUAGE TOGGLE BUTTON WITH ROUNDED CORNERS
    const langBtn = createRoundedButton(
      this,
      ui.w - 58,
      58,
      gameData.language === 'th' ? 'EN' : 'TH',
      {
        width: 80,
        height: 50,
        radius: 12,
        fontSize: 18,
        bgColor: 0xc8a882,
        bgColorHover: 0xe8d5b7,
        hasShadow: true
      }
    );

    langBtn.on('pointerdown', () => {
      // Toggle language
      gameData.language = gameData.language === 'th' ? 'en' : 'th';
      
      // Update button text
      langBtn.text.setText(gameData.language === 'th' ? 'EN' : 'TH');
      
      // Update subtitle
      subtitle.setText('');
      const newSubtitle = getText({ 
        th: 'ตอนการผจญภัยในเมืองแมวใหญ่แมวยักษ์\nเพื่อตามหาว่าเพื่อนร่วมทางของคุณจะเป็นตัวอะไร\nน่าสนุกใช่มั้ยล้าาาา ไปติดตามกัน\nไปยังเอ่ยยย ไปยังน้า ไปรึยางงงง\nไปม้ายยย ไปอ่ะป้าววว', 
        en: 'The adventure in the city of KaijuCat\nTo find out what your companion will be\nLooks fun, right? Lets follow along\nShould we go? Should we go? Should we go or not?\nShould we go or not!!!!!?' 
      });
      t = playTypewriter(this, subtitle, newSubtitle, 25);
      
      // Update start button text
      startBtn.text.setText(getText({ th: 'เริ่มเลย!', en: 'Start!' }));
    });

    // Credits
    this.add.text(ui.cx, ui.h * 0.94, 
      getText({ 
        th: 'สร้างด้วยน้ำตาคาเบ้า เอ้ย KKSNM Studio]',
        en: 'Made with tears in my eyes, oh KKSNM Studio'
      }), {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 16) + 'px',
      color: '#ffffff',
      alpha: 0.8
    }).setOrigin(0.5);
  }
}


// ============================================
// COMPARISON: OLD vs NEW
// ============================================

/*
OLD WAY (Square corners):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const startBtn = this.add.text(ui.cx, ui.h * 0.72, 'Start!', {
  fontFamily: 'Kanit',
  fontSize: '38px',
  color: '#fff',
  backgroundColor: '#86b49d',  // ← Square corners
  padding: { x: 50, y: 18 }
}).setOrigin(0.5).setInteractive();

startBtn.on('pointerdown', () => {
  fadeSceneTransition(this, 'ConsentScene', {}, 450);
});


NEW WAY (Rounded corners): ✨
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const startBtn = createRoundedButton(
  this, ui.cx, ui.h * 0.72,
  'Start!',
  {
    width: 300,
    height: 85,
    radius: 22,        // ← Rounded corners!
    fontSize: 38,
    bgColor: 0x86b49d,
    bgColorHover: 0x9cb380
  }
);

startBtn.on('pointerdown', () => {
  fadeSceneTransition(this, 'ConsentScene', {}, 450);
});


BENEFITS:
✅ Smooth rounded corners
✅ Built-in hover effect
✅ Press animation
✅ Shadow effect
✅ Cleaner code
✅ Professional look
*/