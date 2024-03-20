const w = 7680;
const h = 4320;
// console.log(`width: ${w}, height: ${h}`);
const numOfFood = 10;  // 食物數量
const shelfWidth = 0.15 * w; // 食物架寬度
const shelfHeight = 0.98 * h; // 食物架高度
const classFontSize = 0.035 * w; // 文字大小

const foods = { nut: 10, milk: 8, meat: 9, vegetable: 13, fruit: 13, grain: 10 };
// 取得所有 foods 的鍵(食物類型)
const foodTypes = Object.keys(foods);

// 預載入資料
const GeneralPreload = (scene) => {
  scene.load.image('background', '../images/bg/background.png');
  scene.load.image('end', '../images/ui/end.png');
  scene.load.image('case', '../images/ui/case.png');
  scene.load.image('body', '../images/ui/body.png');
  scene.load.image('plate', '../images/ui/plate.png');
  scene.load.image('nut0', '../images/foods/nuts/nut0.png');
  scene.load.image('nut1', '../images/foods/nuts/nut1.png');
  scene.load.image('nut2', '../images/foods/nuts/nut2.png');
  scene.load.image('nut3', '../images/foods/nuts/nut3.png');
  scene.load.image('nut4', '../images/foods/nuts/nut4.png');
  scene.load.image('nut5', '../images/foods/nuts/nut5.png');
  scene.load.image('nut6', '../images/foods/nuts/nut6.png');
  scene.load.image('nut7', '../images/foods/nuts/nut7.png');
  scene.load.image('nut8', '../images/foods/nuts/nut8.png');
  scene.load.image('nut9', '../images/foods/nuts/nut9.png');
  scene.load.image('milk0', '../images/foods/milks/milk0.png');
  scene.load.image('milk1', '../images/foods/milks/milk1.png');
  scene.load.image('milk2', '../images/foods/milks/milk2.png');
  scene.load.image('milk3', '../images/foods/milks/milk3.png');
  scene.load.image('milk4', '../images/foods/milks/milk4.png');
  scene.load.image('milk5', '../images/foods/milks/milk5.png');
  scene.load.image('milk6', '../images/foods/milks/milk6.png');
  scene.load.image('milk7', '../images/foods/milks/milk7.png');
  scene.load.image('meat0', '../images/foods/meats/meat0.png');
  scene.load.image('meat1', '../images/foods/meats/meat1.png');
  scene.load.image('meat2', '../images/foods/meats/meat2.png');
  scene.load.image('meat3', '../images/foods/meats/meat3.png');
  scene.load.image('meat4', '../images/foods/meats/meat4.png');
  scene.load.image('meat5', '../images/foods/meats/meat5.png');
  scene.load.image('meat6', '../images/foods/meats/meat6.png');
  scene.load.image('meat7', '../images/foods/meats/meat7.png');
  scene.load.image('meat8', '../images/foods/meats/meat8.png');
  scene.load.image('meat9', '../images/foods/meats/meat9.png');
  scene.load.image('vegetable0', '../images/foods/vegetables/vegetable0.png');
  scene.load.image('vegetable1', '../images/foods/vegetables/vegetable1.png');
  scene.load.image('vegetable2', '../images/foods/vegetables/vegetable2.png');
  scene.load.image('vegetable3', '../images/foods/vegetables/vegetable3.png');
  scene.load.image('vegetable4', '../images/foods/vegetables/vegetable4.png');
  scene.load.image('vegetable5', '../images/foods/vegetables/vegetable5.png');
  scene.load.image('vegetable6', '../images/foods/vegetables/vegetable6.png');
  scene.load.image('vegetable7', '../images/foods/vegetables/vegetable7.png');
  scene.load.image('vegetable8', '../images/foods/vegetables/vegetable8.png');
  scene.load.image('vegetable9', '../images/foods/vegetables/vegetable9.png');
  scene.load.image('vegetable10', '../images/foods/vegetables/vegetable10.png');
  scene.load.image('vegetable11', '../images/foods/vegetables/vegetable11.png');
  scene.load.image('vegetable12', '../images/foods/vegetables/vegetable12.png');
  scene.load.image('fruit0', '../images/foods/fruits/fruit0.png');
  scene.load.image('fruit1', '../images/foods/fruits/fruit1.png');
  scene.load.image('fruit2', '../images/foods/fruits/fruit2.png');
  scene.load.image('fruit3', '../images/foods/fruits/fruit3.png');
  scene.load.image('fruit4', '../images/foods/fruits/fruit4.png');
  scene.load.image('fruit5', '../images/foods/fruits/fruit5.png');
  scene.load.image('fruit6', '../images/foods/fruits/fruit6.png');
  scene.load.image('fruit7', '../images/foods/fruits/fruit7.png');
  scene.load.image('fruit8', '../images/foods/fruits/fruit8.png');
  scene.load.image('fruit9', '../images/foods/fruits/fruit9.png');
  scene.load.image('fruit10', '../images/foods/fruits/fruit10.png');
  scene.load.image('fruit11', '../images/foods/fruits/fruit11.png');
  scene.load.image('fruit12', '../images/foods/fruits/fruit12.png');
  scene.load.image('grain0', '../images/foods/grains/grain0.png');
  scene.load.image('grain1', '../images/foods/grains/grain1.png');
  scene.load.image('grain2', '../images/foods/grains/grain2.png');
  scene.load.image('grain3', '../images/foods/grains/grain3.png');
  scene.load.image('grain4', '../images/foods/grains/grain4.png');
  scene.load.image('grain5', '../images/foods/grains/grain5.png');
  scene.load.image('grain6', '../images/foods/grains/grain6.png');
  scene.load.image('grain7', '../images/foods/grains/grain7.png');
  scene.load.image('grain8', '../images/foods/grains/grain8.png');
  scene.load.image('grain9', '../images/foods/grains/grain9.png');
}
// 定義拖動事件
const dragEvent = (scene) => {
  scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    gameObject.x = dragX;
    gameObject.y = dragY;
    // 將物件移至最上層
    gameObject.depth = 1;
  });
}
// 定義遊戲結束
const endgame = (scene, userAnswer = null) => {
  // 清除資料
  if (userAnswer !== null) Object.keys(userAnswer).forEach(category => { userAnswer[category].length = 0; });
  // 結束介面
  endView(scene);
}
// 定義拖動結束事件
const dragEventEnd = (scene, GameId, regions, statusText, userAnswer, colorSet = null) => {
  let checkInArea;
  let type;

  scene.input.on('dragend', function (pointer, gameObject) {
    let objName = gameObject.texture.key; // 移動物件的名稱
    gameObject.depth = 0;
    // 檢查並清除 userAnswer 中 objName 的紀錄
    findToClean(userAnswer, objName);

    // 紀錄答案
    // 檢查食物在哪一區
    for (const region of regions) {
      switch (GameId) {
        case 'game1':
          type = 'class'
          const circle = new Phaser.Geom.Circle(region.bounds.x - region.bounds.radius / 2, region.bounds.y - region.bounds.radius / 2, region.bounds.radius);
          checkInArea = Phaser.Geom.Circle.Contains(circle, gameObject.x, gameObject.y);
          break;
        case 'game2':
          type = 'color'
          checkInArea = Phaser.Geom.Polygon.Contains(region.bounds, gameObject.x, gameObject.y);
          break;
        case 'game4':
        case 'game5':
        case 'game6':
          type = (GameId === 'game6') ? 'class' : 'color';
          checkInArea = Phaser.Geom.Rectangle.Contains(region.bounds.getBounds(), gameObject.x, gameObject.y);
          break;
        default:
          console.log('ERROR');
      }
      if (checkInArea) {
        // 檢查userAnswer是否存在該類別的鍵，不存在則建立一個空陣列
        ckeckHasProperty(userAnswer, objName);
        userAnswer[region.name].push(objName);
        // console.log(`${objName} in ${region.name}`, userAnswer); // 驗證用途
        break;
      }
    }
    // 檢驗答案，都數量及答案正確則結束遊戲
    if (checkAnswer(type, numOfFood, statusText, userAnswer, colorSet)) { endgame(scene, userAnswer); }
  });
}

// 結束介面
const endView = (scene) => {
  scene.add.rectangle(w / 2, h / 2, w, h, 0x0, 0.8).setInteractive();
  const end = scene.add.image(w / 2, h / 2, 'end', 0.3).setDisplaySize(w * 0.5, w * 0.5 * (3 / 4));
  let backWeb = scene.add.rectangle(end.x - end.width / 1.75, end.y + end.height / 2.3, end.width, end.height).setInteractive();
  let again = scene.add.rectangle(end.x + end.width / 1.75, end.y + end.height / 2.3, end.width, end.height).setInteractive();
  backWeb.on('pointerup', () => { window.location.href = '/'; })
  again.on('pointerup', () => { scene.scene.start('gameStart'); })
}
// 隨機食物
const randomFood = () => {
  // 隨機選擇一個食物類型及食物編號
  const randomType = foodTypes[Math.floor(Math.random() * foodTypes.length)];
  const randomFoodNumber = Math.floor(Math.random() * foods[randomType]);
  const randomFoo = randomType + randomFoodNumber;
  return randomFoo;
}
// 隨機取用食物圖
const getRandomFoods = (count) => {
  const selectedFoods = [];
  while (selectedFoods.length < count) {
    const ramFoo = randomFood();
    // 檢查沒有重複，沒有則push進selectedFoods
    if (!selectedFoods.includes(ramFoo)) { selectedFoods.push(ramFoo); }

    // 檢查六大類食物都至少有1個
    if (selectedFoods.length === count) {
      const typesSet = new Set(selectedFoods.map(food => food.replace(/[0-9]|1[0-9]/g, '')));
      if (typesSet.size !== foodTypes.length) { selectedFoods.length = 0; }
    }
  }
  // 傳回選擇食物陣列
  return selectedFoods;
}

// 檢查並清除特定值
const findToClean = (array, value) => {
  Object.values(array).forEach(arr => {
    // 使用 indexOf 找出特定元素的 index
    const index = arr.indexOf(value);
    // 使用 splice 將特定元素做刪除
    if (index != -1) { arr.splice(index, 1); }
  });
}

// 檢查array是否存在該類別的鍵，不存在則建立一個空陣列
const ckeckHasProperty = (array, key) => { if (!array.hasOwnProperty(key)) { array[key] = []; } }

//  method 使用方法, numOfFoods 總食物數量, anwserStatusText 顯示作答狀態的文字, Arraies 使用者答案陣列集, colorSet=null 顏色分類定義陣列集
const checkAnswer = (method, numOfFoods, anwserStatusText, Arraies, colorSet = null) => {
  // 檢驗答案
  var AnswerNum = 0;
  var numOfWrong = 0;
  Object.keys(Arraies).forEach(category => {
    Arraies[category].forEach(obj => {
      // 紀錄總數
      AnswerNum++;
      // 檢驗是否有分類錯誤
      if (method === 'class') { if (category !== obj.split(/[0-9]|1[0-9]+/)[0]) { numOfWrong++ }; }
      else if (method === 'color') { if (colorSet[category].indexOf(obj) === -1) { numOfWrong++ }; }
      else { console.log('使用方法錯誤或尚未定義!'); }
    });
  });
  // 更新錯誤數量文本内容
  anwserStatusText.setText((AnswerNum === 0) ? '' : (numOfWrong === 0) ? `答對 ${AnswerNum} 個` : `有 ${numOfWrong} 個錯誤`).setColor((numOfWrong === 0) ? '#00FF00' : '#FF0000');
  // 如果放置總數與食物數量相同，並且沒有分類錯誤，則結束遊戲
  if (AnswerNum === numOfFoods && numOfWrong === 0) { return true; };
  return false;
}