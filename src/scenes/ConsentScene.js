// js/scenes/ConsentScene.js
class ConsentScene extends Phaser.Scene {
  constructor() { super({ key: 'ConsentScene' }); }

  create() {
    const ui = getSafeArea(this);
    this.cameras.main.fadeIn(400,0,0,0);

    this.add.rectangle(ui.cx, ui.cy, ui.w, ui.h, 0xf5e6d3);

    this.add.text(ui.cx, ui.h * 0.05, getText({ th: 'ข้อตกลง', en: 'Consent' }), {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 48) + 'px',
      color: '#8b6f47'
    }).setOrigin(0.5);

    const boxW = ui.w * 0.85;
    const boxH = ui.h * 0.37;
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.95);
    g.fillRoundedRect(ui.cx - boxW/2, ui.h * 0.22, boxW, boxH, 14);
    g.lineStyle(3, THEME.colors.primary);
    g.strokeRoundedRect(ui.cx - boxW/2, ui.h * 0.22, boxW, boxH, 14);

    const info = getText({
      th: 'เกมนี้สร้างขึ้นเพื่อความบันเทิงไม่ได้มีการเก็บข้อมูลส่วนบุคคล\nซึ่งต้องการให้ผู้เล่นได้เข้าเกี่ยวกับเนื้อเรื่อง\nเซตติ้งโลกแบบคร่าวๆ\nโดยคุณเป็นคาปิบาร่าที่อาศัยอยู่ในโลกที่ล่มสลาย\nและมีรถไฟเป็นพาหนะคู่ใจออกผจญภัยโลกกว้าง\n\nสุดท้ายผลลัพธ์ในเกมนี้เป็นเพียงการสนุกสนาน\nไม่ได้ช่วยอะไรเลย\nปล.แต่เราจะเก็บข้อมูลในส่วนแบบสอบถามตรงท้ายนะ แถมมีรูปแจกด้วย\nเพื่อติดตามการผจญภัยครั้งใหม่ของคาปิบาร่าตัวนี้',
      en: 'This game is made for entertainment not require the personal data\nwhich wants players to understand the story\nrough world setting\nwhere you are a capybara living in a ruined world\nand have a train as your companion to go on adventures in the wide world\n\nThe end result of this game is just for fun\nnot helpful at all\nP.S. but we will collect information in the questionnaire at the end and will also give out pictures\nto follow the new adventures of this capybara',    });

    const infoText = this.add.text(ui.cx, ui.h * 0.4, '', {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 21) + 'px',
      color: THEME.colors.textDark,
      align: 'top',
      wordWrap: { width: boxW - 36 },
      lineSpacing: 4
    }).setOrigin(0.5);

    let t = playTypewriter(this, infoText, info, 28);
    this.input.once('pointerdown', () => {
      if (t && t.getProgress && t.getProgress() < 1) { t.remove(false); infoText.setText(info); }
    });

    let checked = false;
    const cb = this.add.rectangle(ui.cx - 80, ui.h * 0.7, 34, 34, 0xffffff).setStrokeStyle(3, THEME.colors.secondary).setInteractive();
    const check = this.add.text(ui.cx - 80, ui.h * 0.7, '✓', { fontSize: '26px', color: '#86b49d' }).setOrigin(0.5).setVisible(false);
    const cbLabel = this.add.text(ui.cx - 48, ui.h * 0.7, getText({ th: 'ฉันเข้าใจและยอมรับ', en: 'I understand and agree' }), {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 18) + 'px',
      color: THEME.colors.textDark,
    }).setOrigin(0, 0.5).setInteractive();

    const toggle = () => {
      checked = !checked;
      check.setVisible(checked);
      cb.setFillStyle(checked ? THEME.colors.accent : 0xffffff);
      acceptBtn.setAlpha(checked ? 1 : 0.5);
    };
    cb.on('pointerdown', toggle);
    cbLabel.on('pointerdown', toggle);

    const acceptBtn = this.add.text(ui.cx, ui.h * 0.83, getText({ th: 'ดำเนินการต่อ', en: 'Continue' }), {
      fontFamily: 'Kanit',
      fontSize: getResponsiveFontSize(this, 28) + 'px',
      color: '#fff',
      backgroundColor: '#86b49d',
      padding: { x: 28, y: 12 }
    }).setOrigin(0.5).setInteractive().setAlpha(0.5);

    acceptBtn.on('pointerdown', () => {
      if (checked) fadeSceneTransition(this, 'NameInputScene', {}, 450);
      else this.tweens.add({ targets: cb, x: cb.x - 8, duration: 50, yoyo: true, repeat: 3 });
    });
  }
}
