let userAnswer = { nut: [], milk: [], meat: [], vegetable: [], fruit: [], grain: [] };

const gameStart = {
  key: 'gameStart',
  preload: function () { GeneralPreload(this); },
  create: function () {
    // 設定背景圖片
    this.background = this.add.sprite(0.5 * w, 0.5 * h, 'background');
    this.background.setDisplaySize(w, h);

    // /************************************************ 物件設置部分 ************************************************/
    const towerWidth = 0.7 * w; // 金字塔寬
    const towerHeight = 0.98 * h;  // 金字塔高
    const imageSize = h * 0.2; // 食物圖片大小
    const foodlist = getRandomFoods(numOfFood);
    const foodArr = [];
    let statusText = this.add.text(w / 4, classFontSize / 2, '', { font: `${classFontSize}px 標楷體` }).setBackgroundColor('#222222').setOrigin(0.5);

    // 食物分類金字塔物件
    const foodTower = this.add.triangle(0.5 * w, 0.5 * h, 0, towerHeight, 0.5 * towerWidth, 0, towerWidth, towerHeight, 0xffffff).setInteractive();
    // 劃分區域
    const regions = [
      {
        name: 'nut',
        bounds: new Phaser.Geom.Polygon([
          foodTower.x - foodTower.width / 6.65, foodTower.y - foodTower.height / 5,
          foodTower.x + foodTower.width / 6.65, foodTower.y - foodTower.height / 5,
          foodTower.x, foodTower.y - foodTower.height / 2,]),
        color: 0xff6666,
        text: '堅果類',
        textSeat: [foodTower.x, foodTower.y - foodTower.height / 5],
      },
      {
        name: 'milk',
        bounds: new Phaser.Geom.Polygon([
          foodTower.x - foodTower.width / 3.75, foodTower.y + foodTower.height / 30,
          foodTower.x - foodTower.width / 300, foodTower.y + foodTower.height / 30,
          foodTower.x - foodTower.width / 300, foodTower.y - foodTower.height / 5.25,
          foodTower.x - foodTower.width / 6.5, foodTower.y - foodTower.height / 5.25,]),
        color: 0xffcc55,
        text: '乳品類',
        textSeat: [((foodTower.x - foodTower.width / 3.75) + (foodTower.x - foodTower.width / 300)) / 2, foodTower.y + foodTower.height / 30],
      },
      {
        name: 'meat',
        bounds: new Phaser.Geom.Polygon([
          foodTower.x + foodTower.width / 300, foodTower.y + foodTower.height / 30,
          foodTower.x + foodTower.width / 3.75, foodTower.y + foodTower.height / 30,
          foodTower.x + foodTower.width / 6.5, foodTower.y - foodTower.height / 5.25,
          foodTower.x + foodTower.width / 300, foodTower.y - foodTower.height / 5.25]),
        color: 0xee8800,
        text: '豆魚蛋肉類',
        textSeat: [((foodTower.x + foodTower.width / 3.75) + (foodTower.x + foodTower.width / 300)) / 2, foodTower.y + foodTower.height / 30],
      },
      {
        name: 'vegetable',
        bounds: new Phaser.Geom.Polygon([
          foodTower.x - foodTower.width / 2.6, foodTower.y + foodTower.height / 3.7,
          foodTower.x - foodTower.width / 300, foodTower.y + foodTower.height / 3.7,
          foodTower.x - foodTower.width / 300, foodTower.y + foodTower.height / 22.5,
          foodTower.x - foodTower.width / 3.7, foodTower.y + foodTower.height / 22.5,]),
        color: 0x00aa55,
        text: '蔬果類',
        textSeat: [((foodTower.x - foodTower.width / 2.6) + (foodTower.x - foodTower.width / 300)) / 2, foodTower.y + foodTower.height / 3.7],
      },
      {
        name: 'fruit',
        bounds: new Phaser.Geom.Polygon([
          foodTower.x + foodTower.width / 300, foodTower.y + foodTower.height / 3.7,
          foodTower.x + foodTower.width / 2.6, foodTower.y + foodTower.height / 3.7,
          foodTower.x + foodTower.width / 3.7, foodTower.y + foodTower.height / 22.5,
          foodTower.x + foodTower.width / 300, foodTower.y + foodTower.height / 22.5,]),
        color: 0xbbff66,
        text: '水果類',
        textSeat: [((foodTower.x + foodTower.width / 2.6) + (foodTower.x + foodTower.width / 300)) / 2, foodTower.y + foodTower.height / 3.7],
      },
      {
        name: 'grain',
        bounds: new Phaser.Geom.Polygon([
          foodTower.x - foodTower.width / 2, foodTower.y + foodTower.height / 2,
          foodTower.x + foodTower.width / 2, foodTower.y + foodTower.height / 2,
          foodTower.x + foodTower.width / 2.55, foodTower.y + foodTower.height / 3.55,
          foodTower.x - foodTower.width / 2.55, foodTower.y + foodTower.height / 3.55,]),
        color: 0xff5511,
        text: '全榖雜糧類',
        textSeat: [foodTower.x, foodTower.y + foodTower.height / 2],
      }
    ];
    regions.forEach(region => {
      // 繪製邊界並填充顏色
      this.add.graphics().lineStyle(0.003 * w, 0x0).strokePoints(region.bounds.points, true).fillStyle(region.color).fillPath();
      // 添加文字
      this.add.text(region.textSeat[0], region.textSeat[1] - classFontSize / 2, region.text, { font: `${classFontSize}px 標楷體`, fill: '#000000' }).setOrigin(0.5);
      // 定義點擊互動事件，作為驗證
      // foodTower.on('pointerdown', (pointer) => { if (Phaser.Geom.Polygon.Contains(region.bounds, pointer.x, pointer.y)) console.log(`${region.text}`) })
    });

    // 食物架
    const bar1 = this.add.image(shelfWidth / 2, towerHeight / 2, 'case').setDisplaySize(shelfWidth, towerHeight);
    const bar2 = this.add.image(w - shelfWidth / 2, towerHeight / 2, 'case').setDisplaySize(shelfWidth, towerHeight);
    // 食物物件
    const CaseH = bar1.y - towerHeight / 2 + 0.5 * imageSize; // 食物架半格高度
    for (let i = 0; i < numOfFood; i++) {
      const cx = (i < numOfFood / 2) ? bar1.x : bar2.x;
      const cy = (i < numOfFood / 2) ? 1.85 * CaseH * i : 1.85 * CaseH * (i - numOfFood / 2);
      const food = this.add.image(cx, cy + CaseH, foodlist[i]);
      food.setDisplaySize((food.width / food.height) * CaseH * 1.3, CaseH * 1.3); // 設定食物圖片大小
      food.setInteractive();  // 啟用交互
      this.input.setDraggable(food);  // 啟用拖動
      foodArr.push({ name: foodlist[i], bounds: food });
    }

    // /************************************************ 互動事件部分 ************************************************/
    
    dragEvent(this) // 添加拖動事件
    dragEventEnd(this, 'game2', regions, statusText, userAnswer); // 添加拖動結束事件
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