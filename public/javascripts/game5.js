const colorset = {
  red: ['fruit2', 'fruit4', 'fruit5', 'fruit6', 'fruit8', 'fruit12', 'vegetable1', 'vegetable9', 'vegetable12',],
  yellow: ['fruit0', 'fruit9', 'fruit11', 'grain8', 'milk2', 'milk5', 'fruit3', 'fruit7', 'grain0', 'grain1', 'grain5', 'grain6', 'grain7', 'meat5', 'meat6', 'meat10', 'nut0', 'nut3', 'nut4', 'nut5', 'nut6', 'nut7', 'nut8', 'nut9', 'vegetable8',],
  green: ['fruit1', 'nut2', 'vegetable0', 'vegetable2', 'vegetable5', 'vegetable6', 'vegetable11',],
  purple: ['fruit10', 'grain4', 'vegetable10',],
  white: ['meat3', 'meat4', 'meat9', 'milk0', 'milk1', 'milk3', 'milk4', 'milk6', 'milk7', 'vegetable7',],
  bucket: ['grain2', 'grain3', 'grain9', 'meat0', 'meat1', 'meat2', 'meat7', 'meat8', 'nut1', 'vegetable3', 'vegetable4',]
};
let userAnswer = { red: [], yellow: [], green: [], purple: [], white: [] };

const gameStart = {
  key: 'gameStart',
  preload: function () { GeneralPreload(this); },
  create: function () {
    // 設定背景圖片
    this.background = this.add.sprite(0.5 * w, 0.5 * h, 'background');
    this.background.setDisplaySize(w, h);

    // /************************************************ 物件設置部分 ************************************************/
    const imageSize = h * 0.18;  // 食物圖片大小
    let foodlist;
    const foodArr = [];
    let statusText = this.add.text(w / 2, classFontSize / 2, '', { font: `${classFontSize}px 'Times New Roman'` }).setBackgroundColor('#222222').setOrigin(0.5);

    //  提示文字
    this.add.text(w / 2, 0.95 * h, `紅色的蔬果幫我們頭腦好,記住事情,黃橘色水果對眼睛好,\n綠色水果對牙齒骨頭好,紫藍色水果對尿尿好,白色水果對心臟好！`, { font: `${0.6 * classFontSize}px '標楷體'`, fill: '#000000' }).setOrigin(0.5).setAlign('center').setBackgroundColor('#ffffff');

    //  食物清單設置，確保非限定顏色不會出現
    let isCorrect = false;
    while (!isCorrect) {
      foodlist = getRandomFoods(numOfFood);
      isCorrect = !foodlist.some(food => colorset.bucket.includes(food));
    }

    // 食物分類區域
    const humanBody = this.add.image(w / 2, h / 2, 'body');
    const pw = humanBody.width;
    const ph = humanBody.height;
    const Regions = [
      { name: 'red', bounds: this.add.rectangle(humanBody.x + pw / 1.2, humanBody.y - ph / 2.2, 0.7 * pw, 0.3 * ph, 0xff0000).setStrokeStyle(0.005 * w, 0x0), color: 0xff0000, text: '頭腦' },
      { name: 'yellow', bounds: this.add.rectangle(humanBody.x - pw / 1.2, humanBody.y - ph / 2.4, 0.7 * pw, 0.3 * ph, 0xFFA042).setStrokeStyle(0.005 * w, 0x0), color: 0xFFA042, text: '眼睛' },
      { name: 'white', bounds: this.add.rectangle(humanBody.x + pw / 1.2, humanBody.y - ph / 8, 0.7 * pw, 0.3 * ph, 0xffffff).setStrokeStyle(0.005 * w, 0x0), color: 0xffffff, text: '牙齒和骨頭' },
      { name: 'green', bounds: this.add.rectangle(humanBody.x - pw / 1.2, humanBody.y - ph / 12, 0.7 * pw, 0.3 * ph, 0x00ff00).setStrokeStyle(0.005 * w, 0x0), color: 0x00ff00, text: '心臟' },
      { name: 'purple', bounds: this.add.rectangle(humanBody.x - pw / 1.2, humanBody.y + ph / 4, 0.7 * pw, 0.3 * ph, 0x7744FF).setStrokeStyle(0.005 * w, 0x0), color: 0x7744FF, text: '膀胱' },
    ];
    Regions.forEach(region => {
      const text = this.add.text(region.bounds.x, region.bounds.y, region.text, { font: `${classFontSize}px 標楷體`, fill: '#000000' });
      text.setOrigin(0.5);
    });
    //  器官部位與判定區域連接線
    {
      const lineGraphic = this.add.graphics({ lineStyle: { width: 0.003 * w, color: 0x000000 } });
      //  頭腦
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x, humanBody.y - ph / 2.2, Regions[0].bounds.x - Regions[0].bounds.width / 2, Regions[0].bounds.y));
      //  眼睛
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x - pw / 25, humanBody.y - ph / 2.4, Regions[1].bounds.x + Regions[1].bounds.width / 2, Regions[1].bounds.y));
      //  牙骨
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x, humanBody.y - ph / 8, Regions[2].bounds.x - Regions[2].bounds.width / 2, Regions[2].bounds.y));
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x, humanBody.y - ph / 2.65, Regions[2].bounds.x - Regions[2].bounds.width / 2, Regions[2].bounds.y));
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x + pw / 13, humanBody.y + ph / 5, Regions[2].bounds.x - Regions[2].bounds.width / 2, Regions[2].bounds.y));
      //  心臟
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x + pw / 30, humanBody.y - ph / 4.5, Regions[3].bounds.x + Regions[3].bounds.width / 2, Regions[3].bounds.y));
      //  膀胱
      lineGraphic.strokeLineShape(new Phaser.Geom.Line(humanBody.x, humanBody.y - ph / 15, Regions[4].bounds.x + Regions[4].bounds.width / 2, Regions[4].bounds.y));
    }


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
    dragEventEnd(this, 'game5', Regions, statusText, userAnswer, colorset); // 添加拖動結束事件
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