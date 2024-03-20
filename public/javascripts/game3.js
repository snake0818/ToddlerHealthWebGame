const gameStart = {
  key: 'gameStart',
  preload: function () {
    GeneralPreload(this);
    this.load.image('rumor0', '../images/ui/rumor0.png');
    this.load.image('rumor1', '../images/ui/rumor1.png');
    this.load.image('rumor2', '../images/ui/rumor2.png');
    this.load.image('rumor3', '../images/ui/rumor3.png');
    this.load.image('rumor4', '../images/ui/rumor4.png');
    this.load.image('rumor5', '../images/ui/rumor5.png');
  },
  create: function () {
    // 設定背景圖片
    this.background = this.add.sprite(0.5 * w, 0.5 * h, 'background');
    this.background.setDisplaySize(w, h);

    // /************************************************ 物件設置部分 ************************************************/
    const numOfFood = 10;  // 食物數量
    const imageSize = 0.25 * h;  // 食物圖片大小
    const foodlist = getRandomFoods(numOfFood);
    let index = 0;
    let food;
    let rumor;  // 唸謠

    // 食物物件
    this.add.rectangle(0.5 * w, 0.33 * h, 0.3 * w, 0.4 * h, 0x0);
    const setFood = () => {
      food = this.add.image(0.5 * w, 0.33 * h, foodlist[index]);
      food.setDisplaySize((food.width / food.height) * imageSize, imageSize);
      index++;
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
      if (index === numOfFood + 1) { endgame(this); }
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