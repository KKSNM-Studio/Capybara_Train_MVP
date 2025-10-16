// config.js - helpers and theme for Capybara Train v2 (IMPROVED)
// ============================================
// ROUNDED BUTTON HELPER FUNCTION
// Add this to your config.js file
// ============================================

/**
 * Create a rounded button with hover effects
 * @param {Phaser.Scene} scene - The scene to create the button in
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {string} text - Button text
 * @param {object} config - Configuration object
 * @returns {Phaser.GameObjects.Container} Button container
 */
function createRoundedButton(scene, x, y, text, config = {}) {
  // Default configuration
  const defaults = {
    width: 280,
    height: 80,
    radius: 20,
    fontSize: 38,
    color: '#ffffff',
    bgColor: 0x86b49d,
    bgColorHover: 0x9cb380,
    fontFamily: 'Kanit',
    hasShadow: true,
    shadowOffset: 4,
    shadowAlpha: 0.15
  };
  
  // Merge with custom config
  const cfg = { ...defaults, ...config };
  
  // Create container
  const container = scene.add.container(x, y);
  
  // Add shadow (optional)
  if (cfg.hasShadow) {
    const shadow = scene.add.graphics();
    shadow.fillStyle(0x000000, cfg.shadowAlpha);
    shadow.fillRoundedRect(
      -cfg.width/2 + cfg.shadowOffset, 
      -cfg.height/2 + cfg.shadowOffset, 
      cfg.width, 
      cfg.height, 
      cfg.radius
    );
    container.add(shadow);
  }
  
  // Create rounded background
  const bg = scene.add.graphics();
  bg.fillStyle(cfg.bgColor, 1);
  bg.fillRoundedRect(-cfg.width/2, -cfg.height/2, cfg.width, cfg.height, cfg.radius);
  
  // Create text
  const btnText = scene.add.text(0, 0, text, {
    fontFamily: cfg.fontFamily,
    fontSize: getResponsiveFontSize(scene, cfg.fontSize) + 'px',
    color: cfg.color,
    align: 'center',
    wordWrap: { width: cfg.width - 20 }
  }).setOrigin(0.5);
  
  // Add to container
  container.add([bg, btnText]);
  container.setSize(cfg.width, cfg.height);
  container.setInteractive();
  
  // Store references for external access
  container.bg = bg;
  container.text = btnText;
  container.config = cfg;
  
  // Hover effect
  container.on('pointerover', () => {
    bg.clear();
    bg.fillStyle(cfg.bgColorHover, 1);
    bg.fillRoundedRect(-cfg.width/2, -cfg.height/2, cfg.width, cfg.height, cfg.radius);
    scene.tweens.add({ 
      targets: container, 
      scale: 1.08, 
      duration: 200,
      ease: 'Power2'
    });
  });
  
  container.on('pointerout', () => {
    bg.clear();
    bg.fillStyle(cfg.bgColor, 1);
    bg.fillRoundedRect(-cfg.width/2, -cfg.height/2, cfg.width, cfg.height, cfg.radius);
    scene.tweens.add({ 
      targets: container, 
      scale: 1, 
      duration: 200,
      ease: 'Power2'
    });
  });
  
  // Press effect
  container.on('pointerdown', () => {
    scene.tweens.add({
      targets: container,
      scale: 0.96,
      duration: 100,
      yoyo: true
    });
  });
  
  return container;
}


// ============================================
// USAGE EXAMPLES
// ============================================

/*
// EXAMPLE 1: Basic Button
const myButton = createRoundedButton(
  this, 
  400, 200,  // x, y position
  'Click Me!'
);
myButton.on('pointerdown', () => {
  console.log('Button clicked!');
});


// EXAMPLE 2: Custom Size & Color
const customButton = createRoundedButton(
  this, 
  400, 300,
  'Custom Button',
  {
    width: 240,
    height: 70,
    radius: 18,
    fontSize: 24,
    bgColor: 0xc8a882,        // Brown color
    bgColorHover: 0xe8d5b7    // Light brown hover
  }
);


// EXAMPLE 3: Small Button
const smallButton = createRoundedButton(
  this,
  400, 400,
  'Small',
  {
    width: 150,
    height: 50,
    radius: 12,
    fontSize: 20
  }
);


// EXAMPLE 4: No Shadow
const flatButton = createRoundedButton(
  this,
  400, 500,
  'Flat Button',
  {
    hasShadow: false
  }
);


// EXAMPLE 5: Update Text Dynamically
const dynamicButton = createRoundedButton(this, 400, 600, 'Count: 0');
let count = 0;
dynamicButton.on('pointerdown', () => {
  count++;
  dynamicButton.text.setText('Count: ' + count);
});
*/

// Theme colors
const THEME = {
  colors: {
    primary: 0xc8a882,
    secondary: 0x8b6f47,
    accent: 0x86b49d,
    tertiary: 0xe8d5b7,
    textDark: '#4a4238',
    bg: '#e0f7fa'
  }
};

// Safe area helper (use scene.scale for actual runtime size)
function getSafeArea(scene) {
  const width = scene.scale.width;
  const height = scene.scale.height;
  const marginX = width * 0.08; // เพิ่มขอบซ้ายขวา 8%
  const marginY = height * 0.07; // เพิ่มขอบบนล่าง 5%
  
  return {
    cx: Math.round(width / 2),
    cy: Math.round(height / 2),
    safeW: Math.round(width * 0.9),
    safeH: Math.round(height * 0.9),
    top: Math.round(height * 0.12),   // เพิ่ม margin ด้านบน
    bottom: Math.round(height * 0.88), // เพิ่ม margin ด้านล่าง
    left: marginX,
    right: width - marginX,
    top: marginY,
    bottom: height - marginY,
    w: width,
    h: height
  };
}

// IMPROVED: Responsive font sizing with better base sizes for 720x1280
function getResponsiveFontSize(scene, basePx) {
  const h = scene.scale.height || window.innerHeight;
  
  // For 720x1280 (portrait), use larger base multipliers
  if (h >= 1200) {
    // Large screens (1280+): Use 120% of base for better readability
    return Math.round(basePx * 1.4);
  } else if (h >= 1000) {
    // Medium screens (1000-1200): Use 110% of base
    return Math.round(basePx * 1.1);
  } else if (h >= 800) {
    // Tablet range (800-1000): Use full base size
    return Math.round(basePx);
  } else if (h >= 600) {
    // Small tablets (600-800): Use 90% of base
    return Math.round(basePx * 0.9);
  } else {
    // Small phones (<600): Use 80% of base
    return Math.round(basePx * 0.8);
  }
}

// Fade transition helper (fade out then start)
function fadeSceneTransition(scene, nextKey, data = {}, duration = 600) {
  scene.cameras.main.fadeOut(duration, 0, 0, 0);
  scene.time.delayedCall(duration, () => {
    scene.scene.start(nextKey, data);
  });
}

// IMPROVED: Typewriter effect with better speed calculation
function playTypewriter(scene, textObject, content, speed = 25) {
  const str = Array.isArray(content) ? content.join('\n') : content;
  textObject.setText('');
  let i = 0;
  const t = scene.time.addEvent({
    delay: speed,
    repeat: Math.max(0, str.length - 1),
    callback: () => {
      textObject.text += str[i];
      i++;
    }
  });
  return t;
}