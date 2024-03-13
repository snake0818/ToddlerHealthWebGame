const w = 7680;
const h = 4320;
console.log(`width: ${w}, height: ${h}`);

const foods = { nut: 10, milk: 8, meat: 9, vegetable: 13, fruit: 13, grain: 10 };
// 取得所有 foods 的鍵(食物類型)
const foodTypes = Object.keys(foods);

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