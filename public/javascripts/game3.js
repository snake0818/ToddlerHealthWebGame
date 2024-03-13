const gameStart = {
  key: 'gameStart',
  preload: function () {
    this.load.image('background', '../images/bg/background.png');
    this.load.image('end', '../images/ui/end.png');
    this.load.image('rumor0', '../images/ui/rumor0.png');
    this.load.image('rumor1', '../images/ui/rumor1.png');
    this.load.image('rumor2', '../images/ui/rumor2.png');
    this.load.image('rumor3', '../images/ui/rumor3.png');
    this.load.image('rumor4', '../images/ui/rumor4.png');
    this.load.image('rumor5', '../images/ui/rumor5.png');
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
    const imageSize = 0.25 * h;  // 食物圖片大小
    const classFontSize = 0.03 * w;  // 文字大小
    const foodlist = getRandomFoods(numOfFood);
    let index = 0;
    let food;
    let rumor;  // 唸謠
    let statusText = this.add.text(w / 2, classFontSize / 2, '', { font: `${classFontSize}px 標楷體`, fill: '#ffffff' }).setBackgroundColor('#222222').setOrigin(0.5);

    // 食物物件
    this.add.rectangle(0.5 * w, 0.33 * h, 0.3 * w, 0.4 * h, 0x0);
    const setFood = () => {
      food = this.add.image(0.5 * w, 0.33 * h, foodlist[index]);
      food.setDisplaySize((food.width / food.height) * imageSize, imageSize);
      index++;
      if (index < 11) statusText.setText(`第 ${index} 個食物`);
    }
    setFood();

    // 食物分類物件
    const screen = this.add.rectangle(w / 2, h / 2, w, h, 0xffffff, 0).setInteractive();

    // /************************************************ 互動事件部分 ************************************************/

    // 定義互動事件
    screen.on('pointerdown', (pointer) => {
      if (!rumor) {
        const types = Object.keys(foods);
        const foodType = foodlist[index - 1].split(/[0-9]|1[0-9]+/)[0];
        const typeIndex = types.indexOf(foodType);
        rumor = this.add.image(0.5 * w, 0.8 * h, `rumor${typeIndex}`).setDisplaySize(4.31 * imageSize, imageSize);
      } else {
        rumor.destroy();
        food.destroy();
        rumor = null;
        setFood();
      }
      if (index === numOfFood + 1) { endgame(); }
    });

    // 定義遊戲結束
    const endgame = () => { endView(this); }

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