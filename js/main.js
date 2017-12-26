// テーブルに入れるデータは文字列
// 黒 : B
// 白 : W
// 空白 : S
const BOARD_SIZE = 8;

var data = [];

/**
 * jQuery 初期呼び出し関数
 */
$(function(){
  init();
});

/**
 * テーブルのセルをクリックしたときに呼び出される関数
 */
function clickCell() {
  var td = $(this)[0];
  var tr = $(this).parent()[0];
  alert('座標 X: ' + td.cellIndex + ', Y: ' + tr.rowIndex);
}

/**
 * リバーシ初期化関数
 */
function init() {
  // 全てのデータにスペースを入れる。
  for (i = 0; i < BOARD_SIZE; i++) {
    data[i] = [];
    for (j = 0; j < BOARD_SIZE; j++) {
      data[i][j] = "S"
    }
  }
  // 全てのセルにクリックイベントをつける。
  $('.board').on('click', 'td', clickCell);

  // 最初は中央に黒石と白石が配置されている。
  data[3][3] = "B";
  data[3][4] = "W";
  data[4][3] = "W";
  data[4][4] = "B";

  draw();
}

/**
 * リバーシ描画関数
 */
function draw() {
  for (var i = 0; i < BOARD_SIZE; i++) {
    for (var j = 0; j < BOARD_SIZE; j++) {
      var cell = $('.board tr:nth-child(' + (i + 1) + ') td:nth-child(' + (j + 1) + ')')
      if (data[i][j] == 'B') {
        cell.html('<div class="black-circle"></div>');
      } else if (data[i][j] == 'W') {
        cell.html('<div class="white-circle"></div>');
      } else if (data[i][j] == 'S') {
        cell.html('');
      } else {
        cell.html('<div class="red-circle"></div>');
      }
    }
  }
}
