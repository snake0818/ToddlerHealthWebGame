let userAnswer = { nut: [], milk: [], meat: [], vegetable: [], fruit: [], grain: [] };

const gameStart = {
  key: 'gameStart',
  preload: function () { GeneralPreload(this); },
  create: function () {
    // 設定背景圖片
    this.background = this.add.sprite(0.5 * w, 0.5 * h, 'background');
    this.background.setDisplaySize(w, h);

    // /************************************************ 物件設置部分 ************************************************/
    const imageSize = h * 0.18;  // 食物圖片大小
    const foodlist = getRandomFoods(numOfFood);
    const foodArr = [];
    let statusText = this.add.text(w / 4, classFontSize / 2, '', { font: `${classFontSize}px 標楷體` }).setBackgroundColor('#222222').setOrigin(0.5);

    // 食物分類區域
    const pw = w / 1.4;
    const ph = h / 1.1;
    const plate = this.add.image(w / 2, h / 2, 'plate').setDisplaySize(pw, ph);
    const Regions = [
      { name: 'nut', bounds: this.add.rectangle(plate.x + pw / 4, plate.y - ph / 2.5, 0.33 * pw, 0.24 * ph, 0xCFAB6F).setStrokeStyle(0.005 * w, 0x0), text: '堅果類' },
      { name: 'milk', bounds: this.add.rectangle(plate.x - pw / 2.8, plate.y - ph / 3.5, 0.25 * pw, 0.3 * ph), text: '乳品類' },
      { name: 'meat', bounds: this.add.rectangle(plate.x + pw / 5.5, plate.y - ph / 11.5, 0.33 * pw, 0.25 * ph), text: '豆魚蛋肉類' },
      { name: 'fruit', bounds: this.add.rectangle(plate.x - pw / 3.6, plate.y + ph / 6.5, 0.16 * pw, 0.57 * ph), text: '水果類' },
      { name: 'grain', bounds: this.add.rectangle(plate.x + pw / 5.5, plate.y + ph / 4.1, 0.33 * pw, 0.38 * ph), text: '全榖雜糧類' },
      { name: 'vegetable', bounds: this.add.rectangle(plate.x - pw / 11, plate.y + ph / 9, 0.19 * pw, 0.65 * ph), text: '蔬果類' },
    ];

    // 食物架
    const bar1 = this.add.image(shelfWidth / 2.5, shelfHeight / 2, 'case').setDisplaySize(shelfWidth / 1.2, shelfHeight);
    const bar2 = this.add.image(w - shelfWidth / 2.5, shelfHeight / 2, 'case').setDisplaySize(shelfWidth / 1.2, shelfHeight);
    // 食物物件
    const CaseH = bar1.y - shelfHeight / 2 + 0.5 * imageSize; // 食物架半格高度
    for (let i = 0; i < numOfFood; i++) {
      const cx = (i < numOfFood / 2) ? bar1.x : bar2.x;
      const cy = (i < numOfFood / 2) ? 2.1 * CaseH * i : 2.1 * CaseH * (i - numOfFood / 2);
      const food = this.add.image(cx, cy + CaseH, foodlist[i]);
      food.setDisplaySize((food.width / food.height) * CaseH * 1.3, CaseH * 1.3); // 設定食物圖片大小
      food.setInteractive();  // 啟用交互
      this.input.setDraggable(food);  // 啟用拖動
      foodArr.push({ name: foodlist[i], bounds: food });
    }

    // /************************************************ 互動事件部分 ************************************************/
    
    dragEvent(this) // 添加拖動事件
    dragEventEnd(this, 'game6', Regions, statusText, userAnswer); // 添加拖動結束事件
  },
  update: function () {
    // 遊戲狀態更新
  }
}

const config = {
  type: Phaser.AUTO,
  width: w,
  height: h,
  parent: 'app',
  scene: [gameStart,]
}
const game = new Phaser.Game(config);