// テーブルに入れるデータは文字列
// 黒 : B
// 白 : W
// 空白 : S
const BOARD_SIZE = 8;

var data = [];
var turnNum;
var isBlackTurn;

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
  var x = td.cellIndex;
  var y = tr.rowIndex;
  // alert('座標 X: ' + td.cellIndex + ', Y: ' + tr.rowIndex);

  if (data[x][y] == 'S') {
    calc(x, y);
    isBlackTurn = !isBlackTurn;
    turnNum++;
  }

  draw();
}

/**
 * 今回置いた手で盤面がどう変化するかを計算する。
 */
function calc(x, y) {
  // 今回置いた石の色を記憶する。
  var putColor = isBlackTurn ? 'B' : 'W';

  data[x][y] = putColor;
  // 左方向に確認
  if (x > 1 && data[x - 1][y] != 'S' && data[x - 1][y] != putColor) {
    for (var i = x - 2; i > -1; i--) {
      if (data[i][y] != 'S') {
        if (data[i][y] != putColor) {
          continue;
        }
        if (data[i][y] == putColor) {
            for (var j = i + 1; j < x; j++) {
              data[j][y] = putColor;
            }
            break;
        }
      } else {
        break;
      }
    }
  }
  // 右方向に確認
  if (x < BOARD_SIZE - 2 && data[x + 1][y] != 'S' && data[x + 1][y] != putColor) {
    for (var i = x + 2; i < BOARD_SIZE; i--) {
      if (data[i][y] != 'S') {
        if (data[i][y] != putColor) {
          continue;
        }
        if (data[i][y] == putColor) {
            for (var j = i - 1; j > x; j--) {
              data[j][y] = putColor;
            }
            break;
        }
      } else {
        break;
      }
    }
  }
  // 上方向に確認
  if (y > 1 && data[x][y - 1] != 'S' && data[x][y - 1] != putColor) {
    for (var i = y - 2; i > -1; i--) {
      if (data[x][i] != 'S') {
        if (data[x][i] != putColor) {
          continue;
        }
        if (data[x][i] == putColor) {
            for (var j = i + 1; j < y; j++) {
              data[x][j] = putColor;
            }
            break;
        }
      } else {
        break;
      }
    }
  }
  // 下方向に確認
  if (y < BOARD_SIZE - 2 && data[x][y + 1] != 'S' && data[x][y + 1] != putColor) {
    for (var i = y + 2; i < BOARD_SIZE; i--) {
      if (data[x][i] != 'S') {
        if (data[x][i] != putColor) {
          continue;
        }
        if (data[x][i] == putColor) {
            for (var j = i - 1; j > y; j--) {
              data[x][j] = putColor;
            }
            break;
        }
      } else {
        break;
      }
    }
  }
  // 左上方向に確認
  if (x > 1 && y > 1 && data[x - 1][y - 1] != 'S' && data[x - 1][y - 1] != putColor) {
    for (var i = x - 2, j = y - 2; i > -1 && j > -1; i--, j--) {
      if (data[i][j] != 'S') {
        if (data[i][j] != putColor) {
          continue;
        }
        if (data[i][j] == putColor) {
            for (var k = i + 1, l = j + 1; k < x && l < y; k++, l++) {
              data[k][l] = putColor;
            }
            break;
        }
      } else {
        break;
      }
    }
  }
  // 左下方向に確認
  if (x > 1 && y < BOARD_SIZE - 2 && data[x - 1][y + 1] != 'S' && data[x - 1][y + 1] != putColor) {
    for (var i = x - 2, j = y + 2; i > -1 && j < BOARD_SIZE; i--, j++) {
      if (data[i][j] != 'S') {
        if (data[i][j] != putColor) {
          continue;
        }
        if (data[i][j] == putColor) {
            for (var k = i + 1, l = j - 1; k < x && l > y; k++, l--) {
              data[k][l] = putColor;
            }
            break;
        }
      } else {
        break;
      }
    }
  }
  // 右上方向に確認
  if (x < BOARD_SIZE - 2 && y > 1 && data[x + 1][y - 1] != 'S' && data[x - 1][y - 1] != putColor) {
    for (var i = x + 2, j = y - 2; i < BOARD_SIZE && j > -1; i++, j--) {
      if (data[i][j] != 'S') {
        if (data[i][j] != putColor) {
          continue;
        }
        if (data[i][j] == putColor) {
            for (var k = i - 1, l = j + 1; k > x && l < y; k--, l++) {
              data[k][l] = putColor;
            }
            break;
        }
      } else {
        break;
      }
    }
  }
  // 右下方向に確認
  if (x < BOARD_SIZE - 2 && y < BOARD_SIZE - 2 && data[x + 1][y + 1] != 'S' && data[x + 1][y + 1] != putColor) {
    for (var i = x + 2, j = y + 2; i < BOARD_SIZE && j < BOARD_SIZE; i++, j++) {
      if (data[i][j] != 'S') {
        if (data[i][j] != putColor) {
          continue;
        }
        if (data[i][j] == putColor) {
            for (var k = i - 1, l = j - 1; k > x && l > y; k--, l--) {
              data[k][l] = putColor;
            }
            break;
        }
      } else {
        break;
      }
    }
  }
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

  // ターン数をセットする。
  turnNum = 1;
  // リバーシは置けない場合はパスするため、単純に偶数奇数でどちらの手かを判断できない。
  isBlackTurn = true;

  draw();
}

/**
 * リバーシ描画関数
 */
function draw() {
  for (var i = 0; i < BOARD_SIZE; i++) {
    for (var j = 0; j < BOARD_SIZE; j++) {
      var cell = $('.board tr:nth-child(' + (j + 1) + ') td:nth-child(' + (i + 1) + ')')
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
