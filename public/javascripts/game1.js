let userAnswer = { nut: [], milk: [], meat: [], vegetable: [], fruit: [], grain: [] };

const gameStart = {
  key: 'gameStart',
  preload: function () { GeneralPreload(this); },
  create: function () {
    // 設定背景圖片
    this.background = this.add.sprite(0.5 * w, 0.5 * h, 'background');
    this.background.setDisplaySize(w, h);

    // /************************************************ 物件設置部分 ************************************************/
    const shelfHeight = 0.9 * h; // 食物架高度
    const imageSize = 0.18 * h;  // 食物圖片大小
    const foodlist = getRandomFoods(numOfFood);
    const foodArr = [];
    let statusText = this.add.text(w / 2, classFontSize / 2, '', { font: `${classFontSize}px 標楷體` }).setBackgroundColor('#222222').setOrigin(0.5);

    // 食物分類區域
    const typeRegions = [
      { name: 'nut', bounds: null, color: 0xff6666, text: '堅果類' },
      { name: 'milk', bounds: null, color: 0xffcc55, text: '乳品類' },
      { name: 'meat', bounds: null, color: 0xee8800, text: '豆魚蛋肉類' },
      { name: 'vegetable', bounds: null, color: 0x00aa55, text: '蔬果類' },
      { name: 'fruit', bounds: null, color: 0xbbff66, text: '水果類' },
      { name: 'grain', bounds: null, color: 0xff5511, text: '全榖雜糧類' }
    ];
    for (let i = 0; i < typeRegions.length; i++) {
      const cx = (i < 3) ? 0.16 * w : w - 0.08 * w;
      const cy = (i < 3) ? 0.333 * h * i : 0.333 * h * (i - 3);
      const circle = this.add.circle(cx, cy + 0.25 * h, 0.165 * h, typeRegions[i].color).setOrigin(0.5);
      typeRegions[i].bounds = circle;
    }
    typeRegions.forEach(region => {
      const half = region.bounds.geom._radius / 2;
      const text = this.add.text(region.bounds.x - half, region.bounds.y - half, region.text, { font: `${classFontSize}px 標楷體`, fill: '#000000' }).setOrigin(0.5);
      // 定義點擊互動事件，作為驗證
      // region.bounds.setInteractive().on('pointerdown', () => { console.log(`${region.text}`); })
    });

    // 食物架
    const shelf1 = this.add.image(w / 2 - imageSize, h / 1.8, 'case').setDisplaySize(shelfWidth, shelfHeight);
    const shelf2 = this.add.image(w / 2 + imageSize, h / 1.8, 'case').setDisplaySize(shelfWidth, shelfHeight);
    // 食物物件
    const CaseH = shelf1.y - shelfHeight / 2 + 0.5 * imageSize; // 食物架半格高度
    for (let i = 0; i < numOfFood; i++) {
      const cx = (i < numOfFood / 2) ? shelf1.x : shelf2.x;
      const cy = (i < numOfFood / 2) ? 0.85 * CaseH * i : 0.85 * CaseH * (i - numOfFood / 2);
      const food = this.add.image(cx, cy + CaseH, foodlist[i]);
      food.setDisplaySize((food.width / food.height) * imageSize * 0.8, imageSize * 0.8);
      food.setInteractive();  // 啟用交互
      this.input.setDraggable(food);  // 啟用拖動
      foodArr.push({ name: foodlist[i], bounds: food });
    }

    // /************************************************ 互動事件部分 ************************************************/
    
    dragEvent(this) // 添加拖動事件
    dragEventEnd(this, 'game1', typeRegions, statusText, userAnswer); // 添加拖動結束事件
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