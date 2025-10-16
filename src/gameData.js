// gameData.js - questions, results and game state (WITH STORY SEGMENTS)

const gameData = {
  playerName: '',
  currentQuestion: 0,
  mood: 0,
  energy: 10,
  resultHistory: [],
  language: 'th' // 'th' or 'en'
};

// 5 questions, 3 choices each
const questions = [
  {
    text: { th: '"ไม่ไหวแล้วววววว"\nแมวตะโกนเสียงดังและตัวสั่น?\nหรือว่าจะปวดฉิ้งฉ่องกันนะ!!!', 
    en: 'Where do you want to go to the bathroom?' },
    choices: [
      { text: { th: 'ห้องน้ำสะอาด', en: 'Clean station bathroom' } },
      { text: { th: 'ห้องน้ำบนรถไฟ', en: 'Train bathroom' } },
      { text: { th: 'หาที่กลางแจ้ง', en: 'Find outdoor spot' } }
    ]
  },
  {
    text: { th: 'ดูท่าจะได้ที่พักผ่อนหย่อนใจสักที\nเจ้าแมวจะอยากทำอะไรกันแน่นะ?', 
    en: 'What does the cat want to eat?' },
    choices: [
      { text: { th: 'จุดไฟทำกับข้าวแซบๆ', en: 'Light a fire to LET HIM COOK' } },
      { text: { th: 'อ่านป้ายดูสิ้เผื่อจะเจอกิจกรรม', en: 'Read the signs' } },
      { text: { th: 'ออกไปตกปลากับเจ้าแมว', en: 'Go fishing with kitty' } }
    ]
  },
  {
    text: { th: 'คุณเจอกับนกคุมหลีเจ้าถิ่น คุณจะทำอย่างไร?', 
    en: 'You encounter a ultra instinct crow, what do you do?' },
    choices: [
      { text: { th: 'บิดแล้วรวย ซวยแล้วเรา', en: 'Catch me if you can!!' } },
      { text: { th: 'ชูธงเรียก Superแมว', en: 'Call SuperMeow' } },
      { text: { th: 'เรียกตำรวจแมวมาตรวจฉี่นก', en: 'Call the cat police' } }
    ]
  },
  {
    text: { th: 'คุณเข้าร้านอาหารมาแล้ว คุณจะทำอย่างไร?', 
    en: 'You enter a restaurant, what do you do?' },
    choices: [
      { text: { th: 'เอาเหมือนเดิม โอโจ้ด้วย', en: 'Secret Recipe!!' } },
      { text: { th: 'ลองอ่านเมนู', en: 'Read a Menu' } },
      { text: { th: 'ถามAIให้ลองหาเมนูแนะนำเป็นภาษาแมว', en: 'Use AI to see recommend menu' } }
    ]
  },
  {
    text: { th: 'เมืองแมวยักษ์มีเทศกาลเต็มเลย คุณอยากพาเจ้าแมวน้อยไปที่ไหนกัน?', 
    en: 'Kaiju Cat Town is full of festivals. Where would you like to take your kitty?' },
    choices: [
      { text: { th: 'คาราโอเกะ!', en: 'KARAOKE!' } },
      { text: { th: 'ไปงานคอนแมวยักษ์เฟส', en: 'Go to Music Festival' } },
      { text: { th: 'ไปดูงานเทศกาลของแมวยักษ์', en: 'Go to ' } }
    ]
  }
];

// ============================================
// NEW: STORY SEGMENTS BETWEEN QUESTIONS
// ============================================
const storySegments = {
  // Story 0: Introduction (before Question 1)
  intro: {
    th: [
      `สวัสดี ${gameData.playerName}! `,
      '',
      'คุณคือคาปิบาราที่ขับรถไฟเร่ร่อนออกไปหากิน',
      'แต่มีวันนึงคุณพบเจอแมวและทำความรู้จักกัน',
      'จนวันนี้ได้พาแมวๆ ไปท่องเที่ยวที่เมืองแมวย้าก',
      '',
      'เพื่อผ่อนคลายความเครียดจากการนอนเฉยไปวันๆ',
      'เอ๊ะแต่การนอนเฉยๆยังเหนื่อยเหรอเนี่ย!!!',
      'แต่ว่าเหมือนได้ยินเสียงอะไรแปลกๆนะ...'
    ],
    en: [
      `Hello ${gameData.playerName}! `,
      '',
      'You are a capybara with a train',
      'You meet and taking cats on a journey',
      'Until today, ',
      'I took the cats on a trip to the Kaiju Cat Paradise.',
      '',
      'To relieve stress from lying around all day.',
      'Hey, but is it tiring just to lie down?',
      'But I heard a strange sound...'
    ]
  },
  
  // Story 1: After Question 1 Result (before Question 2)
  story1: {
    th: [
      'รถไฟได้พร้อมออกเดินทางแล้ว! เยสสส ',
      '',
      'เจ้าพวกแมวน้อยตื่นเต้นมาก',
      'มองออกไปนอกหน้าต่าง',
      'ทิวทัศน์สวยงามมากเลย',
      '',
      'แต่เดี๋ยวก่อน...',
      'เหมือนจะเจอจุดที่สามารถแวะพักได้',
      'มีทั้งป้ายที่ดูเหมือนจะมีประโยชน์',
      'แคมป์ก็ดูจะเป็นเรื่องที่ดีนะ',
      'แต่เหมือนจะมีจุดให้ตกปลาด้วยแฮะ',
      'น่าสนใจไปหมด เลือกไม่ถูกเลย!!!!'
    ],
    en: [
      'The train has departed! Yessss ',
      '',
      'The little cat is very excited',
      'Looking out the window',
      'The scenery is beautiful',
      '',
      'But wait...',
      'It seems like we found a place where we can stop and rest.',
      'There are signs that seem useful.',
      'The camp seems like a good thing.',
      'But it seems like theres a place to fish too.',
      'They are all so interesting, I cant decide!!!!'
    ]
  },
  
  // Story 2: After Question 2 Result (before Question 3)
  story2: {
    th: [
      'เหมือนใช้เวลาจนคุ้มแล้วก็ไปกันต่อ!!',
      '',
      'รถไฟแล่นต่อไปเรื่อยๆ',
      'ผ่านทุ่งหญ้าและป่าไม้ที่หลากหลาย',
      '',
      'ทันใดนั้น...',
      'คุณเห็นเงาใหญ่ๆ ข้างหน้า',
      '',
      'มันคือ... นกคุมหลี!!!! ',
      'นกคุมหลีที่เฝ้าเขื่อนอยู่',
      'ดูเหมือนตัวจ่าฝูงจะขี่เวฟ100 สีแสบตาอยู่ซะด้วย',
      'แมวน้อยกลัวมาก',
      'ในฐานะที่เป็นคนขับรถไฟ',
      'คุณจะทำอย่างไร?'
    ],
    en: [
      'Its like we have spent enough time and are ready to move on!!',
      '',
      'The train continues',
      'Through meadows and forests',
      '',
      'Suddenly...',
      'You see a huge shadow ahead',
      '',
      'It\'s... Kaiju Crow!!!! ',
      'The crow guarding the dam and riding a flashy Wave100',
      'The little cat is scared',
      'As a train driver',
      'What will you do?'
    ]
  },
  
  // Story 3: After Question 3 Result (before Question 4)
  story3: {
    th: [
      'ดูเหมือนจะผ่านสถานการณ์ที่ชุลมุนมาได้สักที ',
      'แต่ดูเหมือนจุดหมายจะอยู่ข้างหน้าแล้ว',
      'ทุ',
      'เรียน',
      'โลละ',
      '500',
      'ดูเหมือนจะไม่ใช่ป้ายเข้าเมืองแมวยักษ์นะ',
      'แต่เหมือนจะเป็นป้ายร้านอาหาร',
      'เจ้าพวกแมวน้อยก็ตะโกนเสียงดังแบบแมวเป้า',
      'เลยจำเป็นต้องจอดก่อนที่รถไฟจะพังเพราแมวเปรต',
      'ดูเหมือนร้านนี้จะไม่มีใครเลย',
      'แต่เห็นเหมือนคอนโดแมวตรงนั้นจะมีอาหารอยู่นะ',
      'แถมเขียนด้วยว่า ห้ามแตะ สงสัยจะหวงของ',
      'แล้วก็ยังมีแมนูแปลกใยแมงมุมเต็มเลย',
      'หรือจะลองถามAIให้แนะนำของอร่อยดูนะ',
      'หรือจะลองทำทรงเนียนไปหยิบกินเลยดีนะ'
    ],
    en: [
      'It seems like we have finally gotten past the chaotic situation.',
      'But it seems the destination is already ahead.',
      'Du',
      'rian',
      'KG per',
      '500',
      'It doesnt look like a giant cat entrance sign.',
      'But it looks like a restaurant sign.',
      'The kittens also shouted loudly like cat targets.',
      'So it was necessary to stop before the train was destroyed by naughty cat.',
      'It seems like theres no one in this shop.',
      'But it looks like theres food in the cat condo over there.',
      'And it also says, "Do not touch." I guess he possessive of his stuff.',
      'And theres also a weird menu full of spider webs.',
      'Or try asking AI to recommend delicious food.',
      'Or maybe try making it look neat and just grab it and eat it.'
    ]
  },
  
  // Story 4: After Question 4 Result (before Question 5)
  story4: {
    th: [
      'เจ้าแมวดูท่าจะกินอิ่มกินแซบเลยแฮะ',
      'ก็เล่นกินทุกอย่างที่อยู่ในร้านเลยนี่นา',
      'จากนั้นเราก็ขับรถไฟต่ออีก 15 เมตร',
      'คุณเห็นป้ายบอกทาง:',
      '',
      ' คุณขับเลยเมืองแมวยักษ์ไป 1 กิโลเมตร',
      ';-; ท้อแท้เหลือเกิน',
      'กะจะมาเป็นคาปิบาร่าที่ชิลๆซะหน่อย',
      'แต่ในที่สุดก็ถึงซะทีนะ',
      'เมืองไคจูแมวที่รอมาเนินนาน',
      'ดูเหมือนจะมีกิจกรรมให้ทำเต็มเลย',
      'มีทั้งการไปนั่งดูพลุช่วงเทศกาล',
      'แถมมีเพลงอีหล่าโซดาป๊อปด้วย',
      'แล้วก็ยังมีคาราโอเกะแบบส่วนตัวด้วย',
      'เหมาะสำหรับอินโทรเวิร์ตฮาฟฟู้วซะด้วย',
      'แต่จะเลือกอะไรดีน้าาาา'
    ],
    en: [
      'The cat looks like really full.',
      'You just eat everything in the store.',
      'Then we drove the train for another 15 meters.',
      'You see a sign:',
      '',
      'You drive 1 kilometer past the Kaiju Cat Paradise.',
      ';-; So disheartening.',
      'I want to be a chill capybara but not like this!!!',
      'But finally, its here.',
      'Kaiju Cat Paradise!!!',
      'There seems to be plenty of activities to do.',
      'There are also people going to watch fireworks during the festival.',
      'Plus theres the song E-La Soda Pop too.',
      'And there have also private karaoke.',
      'Its also perfect for introverts.',
      'But what should I choose?'
    ]
  }
};

// NEW: Helper function to get story for current stage
function getStoryForQuestion(questionIndex) {
  const storyKeys = ['intro', 'story1', 'story2', 'story3', 'story4'];
  const storyKey = storyKeys[questionIndex] || 'intro';
  const story = storySegments[storyKey];
  const lines = story[gameData.language] || story.th;
  return lines.map(line => line.replace('${gameData.playerName}', gameData.playerName));
}

// ============================================
// ORIGINAL CODE CONTINUES BELOW (UNCHANGED)
// ============================================

// resultAssets (15 variants) - ✅ BUGFIX: Result #0 moodDelta changed from -3 to +3
const resultAssets = [
  { id:0, name:{th:'เจ้าแมวฉี่อย่างปลอดภัยในห้องน้ำที่สะอาด',en:'The cat pees safely '}, description:{th:'ดีนะอยู่ใกล้ๆพอดี\nไร้กังวล ไร้กลิ่นบุหรี่ แถมมีทิชชู่ให้กินอีก \nเอ้ย!!!!\nมันไม่ได้เอาไว้กิน!!!!',
  en:'Good thing its nearby.\n No worries, no cigarette smell, and theres even tissue paper to eat.\n Oh no!!!!\n Its not for eating!!!!'}, moodDelta:2, energyDelta:-1 },
  
  { id:1, name:{th:'คุณนึกได้ว่าพาเข้าห้องน้ำรถไฟสิ!!!',en:'Go to the train bathroom'}, description:{th:'แต่เดี๋ยวก่อนนะ ห้องน้ำรถไฟซ่อมอยู่นี่นา\n เจ้าแมวปล่อยปราณวารีกระบวนท่าที่1ใส่ขาคุณ\nดูท่าจะเย็นใจเชียว\nแต่ขาคุณอุ่นชุ่มเลย',
  en:'But wait, the train toilet is under repair.\n The cat uses the first Water Breathing Technique on your leg.\n It looks like hes calmed down,\n but your leg is warm.'}, moodDelta:1, energyDelta:-2 },
  
  { id:2, name:{th:'เจ้าแมวหาห้องน้ำอย่างมั่นใจ',en:'Cat poop on Garden'}, description:{th:'#ทำเซียนเหมือนเรียนมา\nแต่ว่า!!!! เจ้าแมวไปฉี่และอึใส่ต้นไม้กินแมว\nเลยโดนงับก้นไปทีนึง\nแต่ดูหน้าแล้วไม่น่าจะสำนึกผิดเลยแฮะ',
  en:'#Acting like a pro\nBut!!!! The cat peed and pooped on the cat-eating plant\nSo it got bitten on the butt once\nBut judging from its face, \nit doesnt seem like it feels guilty at all.'}, moodDelta:3, energyDelta:2 },
  
  { id:3, name:{th:'คุณเขย่าแมวส้มเพื่อจุดไฟ',en:'Strategic Thinker'}, 
  description:{th:'เจ้าแมวส้มได้ปลดปล่อยพลังงานนอนชิวๆเลย \nส่วนคุณก็ไปนั่งเช็กรถ \nแต่ไอ้เจ้าสลิดหายไปไหนกันนะ',
    en:'The orange cat has released its energy and is chilling out. \nAs for you, youre going to check the car. \nBut where has the cat gone?'}, moodDelta:1, energyDelta:1 },
  
  { id:4, name:{th:'คุณได้อ่านป้าย',en:'You read the sign'}, 
  description:{th:'ห้ามขีดเขียน พ่อทุกสถาบัน inwza007\n รู้สึกแปลกๆเหมือนใช้แมวพิมพ์ \nเหมือนจะแพ้เสียงในหัวกันมาก',
    en:'Do not scribble. Father of all institutions inwza007\n It feels strange like using a cat to type.\n It seems like we are losing to the voices in our heads.'}, moodDelta:-1, energyDelta:-2 },
  
  { id:5, name:{th:'คุณได้ออกไปตกปลา',en:'You have gone fishing.'}, 
  description:{th:'คุณได้โชว์สกิลการตกปลาชั้นเซียน \n ไม่ว่าจะหน้าไหนก็ไม่กลัว วันนี้ต้องได้ทูน่า!!\n แต่เมื่อขึ้นจับขึ้นมาได้คุณได้ทูน่ากระป๋อง \nแต่อย่าเพิ่งจ๋องเจ้าแมวถ่ายคลิปทัน แถมยังมาถ่ายคลิปลงCikCokด้วย',
    en:'Youve shown off your expert fishing skills.\n No matter who youre with, youre not afraid. Today, you must catch tuna!!\n But when you catch it, you get canned tuna. \nBut dont be shy, the cat took a video and uploaded it to CikCok.'}, 
    moodDelta:3, energyDelta:3 },
  
  { id:6, name:{th:'บรื้นนนน!!!\nไม่อยู่แล้วครับพี่น้อง',en:'Catch me if you can!!'}, 
  description:{th:'คุณรีบเร่งเครื่องรถไฟออกไปอย่างรวดเร็ว\n พร้อมกับดริฟต์รถไฟรางคู่ จนเจ้าส้มกับสลิดมึนตึบ',
    en:'You quickly accelerate the train and drive off, drifting on the double-track train, leaving cat stunned.'}, moodDelta:-3, energyDelta:-5 },
  
  { id:7, name:{th:'แผนของแกไม่สำเร็จแน่!!!\nนกคุมหลี',en:'Your plan will definitely fail!!!\nThe Crow!'}, description:{th:'ซูเปอร์แมวได้ออกมา 1A1A1A\nจนนกคุมหลีได้ออกไป \nก่อนจะจากไปเขาพูดไว้ว่า \nฉันก็เป็นแมวเหมือนกับทุกตัว!!!',
  en:'Super Cat came out 1A1A1A\nUntil the crow went out\nBefore leaving he said\nIm a cat like everyone else!!!'}, moodDelta:2, energyDelta:0 },
  
  { id:8, name:{th:'ตำรวจมาถึงอย่างทันท่วงที',en:'The police arrived promptly.'}, description:{th:'แต่ดูเหมือนเจ้านกคุมหลีแค่อยากจะมาทักทายเฉยๆ\n แต่ดันขับรถwave100แปลงมาเลยโดนปรับ\n แถมเราโดนปรับเพราะแจ้งความเท็จ\n ข้อหาทำชีวิตแมวไม่สงบ',
  en:'But it seems like the crow just wanted to come and say hello.\n But he drove a mod wave100 and got fined.\n Plus, we got fined for filing a false report.\n The charge is that we made the cats life unstable.'}, moodDelta:-1, energyDelta:-1 },
  
  { id:9, name:{th:'คุณได้ทำทรงหยิบมากินเลย',en:'You can pick it up and eat it.'}, description:{th:'หลังจากพูดรหัสลับและหยิบอาหารมากิน\n เดูเหมือนจะมีสายตาแปลกจ้องออกมาจากคอนโดแมว\n แต่ช่างมันเถอะเจ้าแมวดูท่าจะมีความสุข',
  en:'After saying the secret code and grabbing some food,\n it seems like a strange gaze is peeking out from the cat condo,\n but whatever, the cat seems happy.'}, moodDelta:4, energyDelta:4 },
  
  { id:10, name:{th:'ฉันว่าแล้ว คุณต้องอ่าน',en:'You read the menu.'}, 
  description:{th:'ดูเหมือนจะมีแค่ความหมายเดียว\nไม่เข้าใจจริงๆเลยยยทุกท่านเป็นอะไร๊!!\nแต่ยังดีที่มีเมนูอื่นให้เดินไปหยิบกิน',
    en:'It seems like theres only one meaning.\n I really dont understand whats wrong with everyone!!\n But its good that there are other menus to go and grab and eat.'}, moodDelta:2, energyDelta:2 },
  
  { id:11, name:{th:'อู้ฮู้ว นาสนใจนาคราบ',en:'Wow, thats interesting.'}, 
  description:{th:'ฉันได้เสิร์ชใน #AIเปิดการสร้างรายได้\n เขาว่ากันเมนูในร้านที่อร่อยคือเนื้อแมวคราบเ\nป็นลาบแมวแซบๆเลยนาครับ\n เจ้าแมวฉุนเลยงับโทรศัพท์จนหน้าจอแตก',
    en:'I searched #AIOpenMoney. They said that the delicious menu in the shop is cat meat. \nIts like a spicy cat salad. \nThe cat got angry and bit the phone until the screen cracked.'}, moodDelta:-2, energyDelta:-2 },
  
  { id:12, name:{th:'คุณไปร้องคาราโอเกะ',en:'Artist at Heart'}, 
  description:{th:'คุณได้ร้องทั้งเพลงอุอิอ้า ดาเมดาเน่\n แถมยังได้ไลฟ์สดโชว์ได้เงินด้วย\nสมกับความเป็นอินโทรเวิร์ตฮาฟฟู้วเลย\nส่วนเจ้าแมวนอนหลับจ๋อย\nเมื่อคุณออกก็พบกับ...',
    en:'You sing the UIA song,Dame Dane,\nPlus, you can earn money by doing live shows. \nIts truly fitting for a REAL introvert. And the cat is sleepy. \nWhen you left, you meet...'}, moodDelta:3, energyDelta:1 },
 
  { id:13, name:{th:'คุณไปดูคอนเสิร์ต',en:'Deep Thinker'}, 
  description:{th:'เจ้าแมวพาถือป้ายไฟและพาคุณยิงมิกซ์\nแต่ดูทำนองแล้วดูจะเป็นการบั้นเด้าไปหน่อยเอวเกือบหัก\nแต่ก็ถือว่าสนุกมากๆกับการมารอบนี้\nเมื่อออกจากคอนเสิร์ตคุณพบกับ...',
    en:'The cat took you with him to hold a light sign and let you shoot the mix.\n But the melody, it seemed like a Thai Remix, almost breaking your waist.\n But it was really fun this time. \nWhen you left the concert, you meet...'}, 
    moodDelta:2, energyDelta:-1 },
  
  { id:14, name:{th:'คุณไปเที่ยวงานเทศกาล',en:'you go to the festival.'}, 
  description:{th:'คุณได้ไปเดินดูสิ่งต่างๆในเมืองแมวไคจู\nแล้วก็สงสัยว่าเขาทำกันได้ยังไง \nและสนุกไปกับพลุในตอนท้ายแถมนั่งจิบเพียวมัทฉะชิลๆเลทีเดียว\n เมื่อจบโชว์พลุคุณก็ได้พบกับ...',
    en:'You go to Kaiju Cat Paradise to see anythings\n and wonder how they do it. \nYou enjoy the fireworks at the end and chill out with a pure matcha.\nAfter the fireworks show, you meet...'}, moodDelta:1, energyDelta:1 }
];

const finalEndings = [
  { type:'friend1', name:{th:'แมวอีสาน',en:'ESAN Cat'}, 
  description:{th:'เอ้ยนี่คุณจะล้อเลียนแมวอีสานคิดดีๆนะ แมวตัวนี้ชอบกินลาบเด็กดื้อ! แต่ถ้าซื้อสาโทให้ก็หยวนๆกันได้',
  en:'Hey, if youre going to make fun of an Isaan cat, think carefully.\n This cat likes to eat naughty childrens laab! \nBut if you buy rice wine for it, it can forgive it.'}, condition:(m,e)=>m>=9 && e>=9 },
  { type:'friend2', name:{th:'อึ่งโกลเด้นทำหน้าเซ็ง',en:'The Golden!!! we going up up up'}, 
  description:{th:'โกลเด้นตัวนี้รู้สึกนอยแต่ก็ชอบออกไปเดินเล่น ลองพาไปเดินให้หายเซ็งก็ดีนะ',
  en:'This Golden Retriever is feeling a bit down but loves to go for a walk.\n Its a good idea to take him for a walk to help him get over his frustration.'}, condition:(m,e)=>m>=5 && e>=5 },
  { type:'friend3', name:{th:'จิ้งจกที่อยู่ในปากจิ้งจอก',en:'A lizard in a fox mouth'}, 
  description:{th:'ถ้าคุณคิดว่านี่นึกว่านี่เป็นคนเดียวในเรื่องโชคร้าย คุณน่าจะมีเพื่อนแล้วนะ',
  en:'If you think this is the only bad luck story, you probably have a friend.'}, condition:()=>true }
];

function computeResultId(q,c) {
  const map = [[0,1,2],[3,4,5],[6,7,8],[9,10,11],[12,13,14]];
  return map[q][c];
}

function resetGameData() {
  gameData.playerName = '';
  gameData.currentQuestion = 0;
  gameData.mood = 0;
  gameData.energy = 10;
  gameData.resultHistory = [];
}

function getText(obj) {
  return obj[gameData.language] || obj.th;
}

function calculateFinalEnding() {
  return finalEndings.find(e => e.condition(gameData.mood, gameData.energy)) || finalEndings[2];
}