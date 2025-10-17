// js/scenes/ComingSoonScene.js
class ComingSoonScene extends Phaser.Scene {
  constructor(){ super({ key: 'ComingSoonScene' }); }

  create() {
    const ui = getSafeArea(this);
    this.cameras.main.fadeIn(400,0,0,0);
    this.add.rectangle(ui.cx, ui.cy, ui.w, ui.h, 0xa8c5dd);

    this.add.text(ui.cx, ui.h * 0.12, getText({ th: 'การเดินทางนี้จะเป็นอย่างไรต่อกันนะ...', en: 'The Story Continues...' }), { fontFamily:'Kanit', fontSize:getResponsiveFontSize(this,30)+'px', color: THEME.colors.secondary }).setOrigin(0.5);

    const msg = getText({
      th: `คงต้องรอติดตามตอนต่อไปซะแล้ว\nแต่เดี๋ยวก่อน ถ้าคุณโทรเข้ามาผ่านใน5นาทีนี้รับไปเลย 1แถม 1\n\nอันนี้ไม่น่าใช่นะ\nงั้นเอาเป็นว่าถ้าต้องการติดตามตอนต่อไปของเจ้าคาปิบาร่ากับแมวน้อยทั้งหลาย\nสามารถตอบแบบสอบถามความพึงพอใจได้\nเราจะนำไปพัฒนาต่อเพื่อให้เกิดเนื้อเรื่องที่ฮีลใจมากขึ้น`,
      en: `We'll have to wait and see for the next episode.\n But wait, if you call in within the next 5 minutes,\n you'll get a buy-one-get-one-free deal.\n\n This doesn't seem right,\n so if you want to follow the next episode of Capybara and the cat,\n you can fill out a satisfaction survey. We'll use it to develop more healing stories.`
    });

    const body = this.add.text(ui.cx, ui.h * 0.28, '', { fontFamily:'Kanit', fontSize: getResponsiveFontSize(this,18)+'px', color: THEME.colors.textDark, align:'center', wordWrap:{ width: ui.safeW * 0.92 }, lineSpacing: 8 }).setOrigin(0.5);

    let t = playTypewriter(this, body, msg, 24);
    this.input.once('pointerdown', () => { if (t && t.getProgress && t.getProgress() < 1){ t.remove(false); body.setText(msg); } });

    const buttonW = Math.min(420, ui.safeW * 0.9);
    
// === ตรวจสอบว่าเป็นมือถือหรือไม่ ===
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// === สร้างปุ่ม Phaser ก่อน (ใช้ได้กับ desktop) ===
const surveyBtn = this.add.text(
  ui.cx, ui.h * 0.45,
  getText({ th: '📝 ตอบแบบสอบถาม', en: '📝 Answer Survey' }),
  {
    fontFamily: 'Kanit',
    fontSize: getResponsiveFontSize(this, 28) + 'px',
    color: '#fff',
    backgroundColor: '#86b49d',
    padding: { x: 20, y: 12 },
    fixedWidth: buttonW,
    align: 'center'
  }
).setOrigin(0.5).setInteractive();

const postcardBtn = this.add.text(
  ui.cx, ui.h * 0.54,
  getText({ th: '📮 ดาวน์โหลดโปสการ์ด', en: '📮 Download Postcard' }),
  {
    fontFamily: 'Kanit',
    fontSize: getResponsiveFontSize(this, 28) + 'px',
    color: '#fff',
    backgroundColor: '#ca8882',
    padding: { x: 20, y: 12 },
    fixedWidth: buttonW,
    align: 'center'
  }
).setOrigin(0.5).setInteractive();

// ✅ ถ้าเป็น desktop → ใช้ Phaser ปกติ
if (!isMobile) {
  surveyBtn.on('pointerup', () => {
    window.open('https://forms.gle/9KnqtKS5HnU7x8pK9', '_blank');
  });

  postcardBtn.on('pointerup', () => {
    window.open('https://drive.google.com/drive/folders/1vM0E4IRKIl8SGE2fMjd5XFoTsTf7XEwG?usp=sharing', '_blank');
  });

} else {
  // 📱 Mobile: ใช้ DOM ปุ่มจริง (ไม่โดนบล็อก)
  const makeDomButton = (label, url, color, yPercent) => {
    const btn = document.createElement('button');
    btn.innerText = label;
    btn.style.position = 'absolute';
    btn.style.left = '50%';
    btn.style.top = `${yPercent}%`;
    btn.style.transform = 'translateX(-50%)';
    btn.style.padding = '12px 20px';
    btn.style.fontFamily = 'Kanit';
    btn.style.fontSize = '18px';
    btn.style.background = color;
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '8px';
    btn.style.cursor = 'pointer';
    btn.style.zIndex = 9999;
    btn.style.boxShadow = '0 3px 5px rgba(0,0,0,0.2)';
    document.body.appendChild(btn);

    btn.addEventListener('click', () => window.open(url, '_blank'));

    // เมื่อออกจาก Scene ให้ลบปุ่มออก
    this.events.once('shutdown', () => btn.remove());
  };

  makeDomButton('📝 ตอบแบบสอบถาม', 'https://forms.gle/9KnqtKS5HnU7x8pK9', '#86b49d', 45);
  makeDomButton('📮 ดาวน์โหลดโปสการ์ด', 'https://drive.google.com/drive/folders/1vM0E4IRKIl8SGE2fMjd5XFoTsTf7XEwG?usp=sharing', '#ca8882', 54);
}

    
    const restart = this.add.text(ui.cx, ui.h * 0.85, getText({ th:'🔄 เริ่มใหม่', en:'🔄 Play Again' }), { fontFamily:'Kanit', fontSize:getResponsiveFontSize(this,18)+'px', color:'#fff', backgroundColor:'#8b6f47', padding:{x:18,y:10}, fixedWidth: buttonW * 0.7, align:'center' }).setOrigin(0.5).setInteractive();
    restart.on('pointerdown', () => {
      resetGameData();
      fadeSceneTransition(this, 'StartScene', {}, 350);
    });

    this.add.text(ui.cx, ui.h * 0.9, getText({ th:`ขอบคุณที่เล่น ${gameData.playerName}! `, en:`Thank you for playing ${gameData.playerName}! ` }), { fontFamily:'Kanit', fontSize:getResponsiveFontSize(this,16)+'px', color:'#666' }).setOrigin(0.5);
  }
}
