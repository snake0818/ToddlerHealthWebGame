const colorset = {
  red: ['fruit2', 'fruit4', 'fruit5', 'fruit6', 'fruit8', 'fruit12', 'vegetable1', 'vegetable9', 'vegetable12',],
  green: ['fruit1', 'nut2', 'vegetable0', 'vegetable2', 'vegetable5', 'vegetable6', 'vegetable11',],
  yellow: ['fruit0', 'fruit9', 'fruit11', 'grain8', 'milk2', 'milk5',],
  orange: ['fruit3', 'fruit7', 'grain0', 'grain3', 'grain5', 'grain6', 'grain7', 'meat5', 'meat6', 'meat10', 'nut0', 'nut3', 'nut4', 'nut5', 'nut6', 'nut7', 'nut8', 'nut9', 'vegetable8',],
  white: ['meat3', 'meat4', 'meat9', 'milk0', 'milk1', 'milk3', 'milk4', 'milk6', 'milk7', 'vegetable7',],
  bucket: ['fruit10', 'grain1', 'grain2', 'grain4', 'grain9', 'meat0', 'meat1', 'meat2', 'meat7', 'meat8', 'nut1', 'vegetable3', 'vegetable4', 'vegetable10',]
};
let userAnswer = { red: [], green: [], yellow: [], orange: [], white: [], bucket: [] };

const gameStart = {
  key: 'gameStart',
  preload: function () { GeneralPreload(this); },
  create: function () {
    // 設定背景圖片
    this.background = this.add.sprite(0.5 * w, 0.5 * h, 'background');
    this.background.setDisplaySize(w, h);

    // /************************************************ 物件設置部分 ************************************************/
    const shelfHeight = 0.9 * h; // 食物架高度
    const imageSize = h * 0.18;  // 食物圖片大小
    const foodlist = getRandomFoods(numOfFood);
    const foodArr = [];
    let statusText = this.add.text(w / 2, classFontSize / 2, '', { font: `${classFontSize}px 標楷體` }).setBackgroundColor('#222222').setOrigin(0.5);

    // 食物分類區域
    const typeRegions = [
      { name: 'red', bounds: null, color: 0xff0000, text: '紅色' },
      { name: 'green', bounds: null, color: 0x00ff00, text: '綠色' },
      { name: 'yellow', bounds: null, color: 0xffff00, text: '黃色' },
      { name: 'orange', bounds: null, color: 0xff7500, text: '橘色' },
      { name: 'white', bounds: null, color: 0xffffff, text: '白色' },
      { name: 'bucket', bounds: null, color: 0x444444, text: '其他' },
    ];
    for (let i = 0; i < typeRegions.length; i++) {
      const cx = (i < 3) ? 0.16 * w : w - 0.16 * w;
      const cy = (i < 3) ? 0.333 * h * i : 0.333 * h * (i - 3);
      const colorClass = this.add.rectangle(cx, cy + 0.168 * h, 0.25 * w, 0.3 * h, typeRegions[i].color).setStrokeStyle(0.005 * w, 0x0);
      typeRegions[i].bounds = colorClass;
    }
    typeRegions.forEach(region => {
      this.add.text(region.bounds.x, region.bounds.y, region.text, { font: `${classFontSize}px 標楷體`, fill: '#000000' }).setOrigin(0.5);
      // 定義點擊互動事件，作為驗證
      // region.bounds.setInteractive().on('pointerdown', () => { console.log(`${region.text}`); })
    });

    // 食物架
    const bar1 = this.add.image(w / 2 - imageSize / 1.4, h / 1.8, 'case').setDisplaySize(shelfWidth, shelfHeight);
    const bar2 = this.add.image(w / 2 + imageSize / 1.4, h / 1.8, 'case').setDisplaySize(shelfWidth, shelfHeight);
    // 食物物件
    const CaseH = bar1.y - shelfHeight / 2 + 0.5 * imageSize; // 食物架半格高度
    for (let i = 0; i < numOfFood; i++) {
      const cx = (i < numOfFood / 2) ? bar1.x : bar2.x;
      const cy = (i < numOfFood / 2) ? 0.85 * CaseH * i : 0.85 * CaseH * (i - numOfFood / 2);
      const food = this.add.image(cx, cy + CaseH, foodlist[i]);
      food.setDisplaySize((food.width / food.height) * imageSize * 0.8, imageSize * 0.8);
      food.setInteractive();  // 啟用交互
      this.input.setDraggable(food);  // 啟用拖動
      foodArr.push({ name: foodlist[i], bounds: food });
    }

    // /************************************************ 互動事件部分 ************************************************/
    
    dragEvent(this) // 添加拖動事件
    dragEventEnd(this, 'game4', typeRegions, statusText, userAnswer, colorset); // 添加拖動結束事件
  },
  update: function () {
    // 遊戲狀態更新
  }
}