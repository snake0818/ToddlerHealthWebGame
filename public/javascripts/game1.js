let userAnswer = { nut: [], milk: [], meat: [], vegetable: [], fruit: [], grain: [] };

const gameStart = {
  key: 'gameStart',
  preload: function () {
    this.load.image('background', '../images/bg/background.png');
    this.load.image('case', '../images/ui/case.png');
    this.load.image('end', '../images/ui/end.png');
    this.load.image('nut0', '../images/foods/nuts/nut0.png');
    this.load.image('nut1', '../images/foods/nuts/nut1.png');
    this.load.image('nut2', '../images/foods/nuts/nut2.png');
    this.load.image('nut3', '../images/foods/nuts/nut3.png');
    this.load.image('nut4', '../images/foods/nuts/nut4.png');
    this.load.image('nut5', '../images/foods/nuts/nut5.png');
    this.load.image('nut6', '../images/foods/nuts/nut6.png');
    this.load.image('nut7', '../images/foods/nuts/nut7.png');
    this.load.image('nut8', '../images/foods/nuts/nut8.png');
    this.load.image('nut9', '../images/foods/nuts/nut9.png');
    this.load.image('milk0', '../images/foods/milks/milk0.png');
    this.load.image('milk1', '../images/foods/milks/milk1.png');
    this.load.image('milk2', '../images/foods/milks/milk2.png');
    this.load.image('milk3', '../images/foods/milks/milk3.png');
    this.load.image('milk4', '../images/foods/milks/milk4.png');
    this.load.image('milk5', '../images/foods/milks/milk5.png');
    this.load.image('milk6', '../images/foods/milks/milk6.png');
    this.load.image('milk7', '../images/foods/milks/milk7.png');
    this.load.image('meat0', '../images/foods/meats/meat0.png');
    this.load.image('meat1', '../images/foods/meats/meat1.png');
    this.load.image('meat2', '../images/foods/meats/meat2.png');
    this.load.image('meat3', '../images/foods/meats/meat3.png');
    this.load.image('meat4', '../images/foods/meats/meat4.png');
    this.load.image('meat5', '../images/foods/meats/meat5.png');
    this.load.image('meat6', '../images/foods/meats/meat6.png');
    this.load.image('meat7', '../images/foods/meats/meat7.png');
    this.load.image('meat8', '../images/foods/meats/meat8.png');
    this.load.image('meat9', '../images/foods/meats/meat9.png');
    this.load.image('vegetable0', '../images/foods/vegetables/vegetable0.png');
    this.load.image('vegetable1', '../images/foods/vegetables/vegetable1.png');
    this.load.image('vegetable2', '../images/foods/vegetables/vegetable2.png');
    this.load.image('vegetable3', '../images/foods/vegetables/vegetable3.png');
    this.load.image('vegetable4', '../images/foods/vegetables/vegetable4.png');
    this.load.image('vegetable5', '../images/foods/vegetables/vegetable5.png');
    this.load.image('vegetable6', '../images/foods/vegetables/vegetable6.png');
    this.load.image('vegetable7', '../images/foods/vegetables/vegetable7.png');
    this.load.image('vegetable8', '../images/foods/vegetables/vegetable8.png');
    this.load.image('vegetable9', '../images/foods/vegetables/vegetable9.png');
    this.load.image('vegetable10', '../images/foods/vegetables/vegetable10.png');
    this.load.image('vegetable11', '../images/foods/vegetables/vegetable11.png');
    this.load.image('vegetable12', '../images/foods/vegetables/vegetable12.png');
    this.load.image('fruit0', '../images/foods/fruits/fruit0.png');
    this.load.image('fruit1', '../images/foods/fruits/fruit1.png');
    this.load.image('fruit2', '../images/foods/fruits/fruit2.png');
    this.load.image('fruit3', '../images/foods/fruits/fruit3.png');
    this.load.image('fruit4', '../images/foods/fruits/fruit4.png');
    this.load.image('fruit5', '../images/foods/fruits/fruit5.png');
    this.load.image('fruit6', '../images/foods/fruits/fruit6.png');
    this.load.image('fruit7', '../images/foods/fruits/fruit7.png');
    this.load.image('fruit8', '../images/foods/fruits/fruit8.png');
    this.load.image('fruit9', '../images/foods/fruits/fruit9.png');
    this.load.image('fruit10', '../images/foods/fruits/fruit10.png');
    this.load.image('fruit11', '../images/foods/fruits/fruit11.png');
    this.load.image('fruit12', '../images/foods/fruits/fruit12.png');
    this.load.image('grain0', '../images/foods/grains/grain0.png');
    this.load.image('grain1', '../images/foods/grains/grain1.png');
    this.load.image('grain2', '../images/foods/grains/grain2.png');
    this.load.image('grain3', '../images/foods/grains/grain3.png');
    this.load.image('grain4', '../images/foods/grains/grain4.png');
    this.load.image('grain5', '../images/foods/grains/grain5.png');
    this.load.image('grain6', '../images/foods/grains/grain6.png');
    this.load.image('grain7', '../images/foods/grains/grain7.png');
    this.load.image('grain8', '../images/foods/grains/grain8.png');
    this.load.image('grain9', '../images/foods/grains/grain9.png');
  },
  create: function () {
    // 設定背景圖片
    this.background = this.add.sprite(0.5 * w, 0.5 * h, 'background');
    this.background.setDisplaySize(w, h);

    // /************************************************ 物件設置部分 ************************************************/
    const numOfFood = 10;  // 食物數量
    const shelfWidth = 0.15 * w; // 食物架寬度
    const shelfHeight = 0.9 * h; // 食物架高度
    const imageSize = 0.18 * h;  // 食物圖片大小
    const classFontSize = 0.03 * w; // 文字大小
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

    // 定義遊戲結束
    const endgame = () => {
      // 清除資料
      Object.values(userAnswer).forEach(category => category.length = 0);
      // 結束介面
      endView(this);
    }
    // 定義拖動事件
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
      // 將物件移至最上層
      gameObject.depth = 1;
    });
    // 定義拖動結束事件
    this.input.on('dragend', function (pointer, gameObject) {
      let objName = gameObject.texture.key; // 移動物件的名稱
      gameObject.depth = 0;

      // 檢查並清除 userAnswer 中 objName 的紀錄
      findToClean(userAnswer, objName);

      // 紀錄答案
      // 檢查食物在哪一區
      for (const region of typeRegions) {
        // 獲取移動物件的座標位置
        const circle = new Phaser.Geom.Circle(region.bounds.x - region.bounds.radius / 2, region.bounds.y - region.bounds.radius / 2, region.bounds.radius);
        if (Phaser.Geom.Circle.Contains(circle, gameObject.x, gameObject.y)) {
          // 檢查userAnswer是否存在該類別的鍵，不存在則建立一個空陣列
          ckeckHasProperty(userAnswer, objName);
          userAnswer[region.name].push(objName);
          // console.log(`${objName} in ${region.name}`, userAnswer); // 驗證用途
          break;
        }
      }
      // 檢驗答案，都數量及答案正確則結束遊戲
      if (checkAnswer('class', numOfFood, statusText, userAnswer)) { endgame(); }
    });
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