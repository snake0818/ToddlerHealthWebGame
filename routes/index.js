var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '數位遊戲' });
});
/* GET test page. */
router.get('/game1', function (req, res, next) { res.render('game', { game: 'game1', title: '金字塔遊戲之食物分類' }); });
router.get('/game2', function (req, res, next) { res.render('game', { game: 'game2', title: '金字塔遊戲之找食物的家' }); });
router.get('/game3', function (req, res, next) { res.render('game', { game: 'game3', title: '念謠配對圖卡' }); });
router.get('/game4', function (req, res, next) { res.render('game', { game: 'game4', title: '彩虹蔬果的家' }); });
router.get('/game5', function (req, res, next) { res.render('game', { game: 'game5', title: '蔬果顏色身體配對遊戲' }); });
router.get('/game6', function (req, res, next) { res.render('game', { game: 'game6', title: '我的餐盤遊戲' }); });

module.exports = router;
