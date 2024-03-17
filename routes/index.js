var express = require('express');
var router = express.Router();

const toneRegex = /[ˋˇˊ]/;
const word = [
  { original: '食物分類', pinyin: ['ㄕˊ', 'ㄨˋ', 'ㄈㄣ', 'ㄌㄟˋ'] },
  { original: '食物的家', pinyin: ['ㄕˊ', 'ㄨˋ', '˙ㄉㄜ', 'ㄐㄧㄚ'] },
  { original: '念謠配對', pinyin: ['ㄋㄧㄢˋ', 'ㄧㄠˊ', 'ㄆㄟˋ', 'ㄉㄨㄟˋ'] },
  { original: '彩虹蔬果的家', pinyin: ['ㄘㄞˇ', 'ㄏㄨㄥˊ', 'ㄕㄨ', 'ㄍㄨㄛˇ', '˙ㄉㄜ', 'ㄐㄧㄚ'] },
  { original: '蔬果配對身體', pinyin: ['ㄕㄨ', 'ㄍㄨㄛˇ', 'ㄆㄟˋ', 'ㄉㄨㄟˋ', 'ㄕㄣ', 'ㄊㄧˇ'] },
  { original: '我的餐盤', pinyin: ['ㄨㄛˇ', '˙ㄉㄜ', 'ㄘㄢ', 'ㄆㄢˊ'] },
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '數位遊戲', word, toneRegex });
});
/* GET test page. */
router.get('/game1', function (req, res, next) { res.render('game', { game: 'game1', title: word.original }); });
router.get('/game2', function (req, res, next) { res.render('game', { game: 'game2', title: word.original }); });
router.get('/game3', function (req, res, next) { res.render('game', { game: 'game3', title: word.original }); });
router.get('/game4', function (req, res, next) { res.render('game', { game: 'game4', title: word.original }); });
router.get('/game5', function (req, res, next) { res.render('game', { game: 'game5', title: word.original }); });
router.get('/game6', function (req, res, next) { res.render('game', { game: 'game6', title: word.original }); });

module.exports = router;
