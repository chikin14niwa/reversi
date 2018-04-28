// テーブルに入れるデータは文字列
// 黒 : B
// 白 : W
// 空白 : S
const BOARD_SIZE = 8;

var data = [];
var turnNum;
var isBlackTurn;
var blackStoneNum = 0;
var whiteStoneNum = 0;
var computerColor = '';
var vsMode = 'M';
var computerLeverl = 1;

/**
 * jQuery 初期呼び出し関数
 */
$(function(){
  // 全てのセルにクリックイベントをつける。
  $('.board').on('click', 'td', clickCell);

  init();

  $('#startButton').on('click', function(e) {
    init();
  });

});

/**
 * テーブルのセルをクリックしたときに呼び出される関数
 */
function clickCell() {
  let td = $(this)[0];
  let tr = $(this).parent()[0];
  let x = td.cellIndex;
  let y = tr.rowIndex;
  // alert('座標 X: ' + td.cellIndex + ', Y: ' + tr.rowIndex);
  let canPutStone = false;
  let isPass = false;

  if (data[x][y] == 'S') {
    var tmpData = createArrayFromData();
    if (calc(x, y, isBlackTurn, tmpData) > 0) {
      copyToData(tmpData);
      if (checkChangeColor(!isBlackTurn)) {
        isBlackTurn = !isBlackTurn;
      } else {
        let msg = isBlackTurn ? "白" : "黒";
        msg += "は次のターン置くことができないので、パスします。";
        alert(msg);
        isPass = true;
      }
      turnNum++;
      canPutStone = true;
    }
  }

  if (!canPutStone) {
    alert('ここには石を置くことができません。');
    return;
  }

  
  if (vsMode == 'C' && !isPass) {
    computerTurn();
  }

  draw();

  // ゲーム終了のチェック
  if (!checkChangeColor(isBlackTurn) && !checkChangeColor(!isBlackTurn)) {
    let msg = "ゲーム終了です。\n黒:" + blackStoneNum + ", 白:" + whiteStoneNum + "\n";
    if (blackStoneNum > whiteStoneNum) {
      msg += "黒の勝ちです。";
    } else if (whiteStoneNum > blackStoneNum) {
      msg += "白の勝ちです。";
    } else {
      msg += "引き分けです。";
    }
    alert(msg);
  }

}

/**
 * 今回置いた手で盤面がどう変化するかを計算する。
 */
function calc(x, y, isBlack, tmpData) {
  // 今回置いた石の色を記憶する。
  var putColor = isBlack ? 'B' : 'W';
  var turnOverNum = 0;

  tmpData[x][y] = putColor;
  // 左方向に確認
  for (var i = x - 1; i > -1; i--) {
    if (tmpData[i][y] != 'S') {
      if (tmpData[i][y] != putColor) {
        continue;
      }
      if (tmpData[i][y] == putColor) {
          for (var j = i + 1; j < x; j++) {
            tmpData[j][y] = putColor;
            turnOverNum++;
          }
          break;
      }
    } else {
      break;
    }
  }
  // 右方向に確認
  for (var i = x + 1; i < BOARD_SIZE; i++) {
    if (tmpData[i][y] != 'S') {
      if (tmpData[i][y] != putColor) {
        continue;
      }
      if (tmpData[i][y] == putColor) {
          for (var j = i - 1; j > x; j--) {
            tmpData[j][y] = putColor;
            turnOverNum++;
          }
          break;
      }
    } else {
      break;
    }
  }
  // 上方向に確認
  for (var i = y - 1; i > -1; i--) {
    if (tmpData[x][i] != 'S') {
      if (tmpData[x][i] != putColor) {
        continue;
      }
      if (tmpData[x][i] == putColor) {
          for (var j = i + 1; j < y; j++) {
            tmpData[x][j] = putColor;
            turnOverNum++;
          }
          break;
      }
    } else {
      break;
    }
  }
  // 下方向に確認
  for (var i = y + 1; i < BOARD_SIZE; i++) {
    if (tmpData[x][i] != 'S') {
      if (tmpData[x][i] != putColor) {
        continue;
      }
      if (tmpData[x][i] == putColor) {
          for (var j = i - 1; j > y; j--) {
            tmpData[x][j] = putColor;
            turnOverNum++;
          }
          break;
      }
    } else {
      break;
    }
  }
  // 左上方向に確認
  for (var i = x - 1, j = y - 1; i > -1 && j > -1; i--, j--) {
    if (tmpData[i][j] != 'S') {
      if (tmpData[i][j] != putColor) {
        continue;
      }
      if (tmpData[i][j] == putColor) {
          for (var k = i + 1, l = j + 1; k < x && l < y; k++, l++) {
            tmpData[k][l] = putColor;
            turnOverNum++;
          }
          break;
      }
    } else {
      break;
    }
  }
  // 左下方向に確認
  for (var i = x - 1, j = y + 1; i > -1 && j < BOARD_SIZE; i--, j++) {
    if (tmpData[i][j] != 'S') {
      if (tmpData[i][j] != putColor) {
        continue;
      }
      if (tmpData[i][j] == putColor) {
          for (var k = i + 1, l = j - 1; k < x && l > y; k++, l--) {
            tmpData[k][l] = putColor;
            turnOverNum++;
          }
          break;
      }
    } else {
      break;
    }
  }
  // 右上方向に確認
  for (var i = x + 1, j = y - 1; i < BOARD_SIZE && j > -1; i++, j--) {
    if (tmpData[i][j] != 'S') {
      if (tmpData[i][j] != putColor) {
        continue;
      }
      if (tmpData[i][j] == putColor) {
          for (var k = i - 1, l = j + 1; k > x && l < y; k--, l++) {
            tmpData[k][l] = putColor;
            turnOverNum++;
          }
          break;
      }
    } else {
      break;
    }
  }
  // 右下方向に確認
  for (var i = x + 1, j = y + 1; i < BOARD_SIZE && j < BOARD_SIZE; i++, j++) {
    if (tmpData[i][j] != 'S') {
      if (tmpData[i][j] != putColor) {
        continue;
      }
      if (tmpData[i][j] == putColor) {
          for (var k = i - 1, l = j - 1; k > x && l > y; k--, l--) {
            tmpData[k][l] = putColor;
            turnOverNum++;
          }
          break;
      }
    } else {
      break;
    }
  }

  return turnOverNum;
}

/**
 * リバーシ初期化関数
 */
function init() {
  // フォームのデータを受け取る。
  vsMode = $('input[name=vsMode]:checked').val();
  computerColor = $('input[name=manColor]:checked').val() == 'B' ? 'W' : 'B';
  computerLevel = $('input[name=computerLevel]:checked').val();

  // 全てのデータにスペースを入れる。
  for (i = 0; i < BOARD_SIZE; i++) {
    data[i] = [];
    for (j = 0; j < BOARD_SIZE; j++) {
      data[i][j] = "S"
    }
  }
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
  $('#turnNum').text(turnNum);
  $('#turnColor').text(isBlackTurn ? '黒' : '白');

  blackStoneNum = 0;
  whiteStoneNum = 0;

  for (var i = 0; i < BOARD_SIZE; i++) {
    for (var j = 0; j < BOARD_SIZE; j++) {
      var cell = $('.board tr:nth-child(' + (j + 1) + ') td:nth-child(' + (i + 1) + ')')
      if (data[i][j] == 'B') {
        cell.html('<div class="black-circle"></div>');
        blackStoneNum++;
      } else if (data[i][j] == 'W') {
        cell.html('<div class="white-circle"></div>');
        whiteStoneNum++;
      } else if (data[i][j] == 'S') {
        cell.html('');
      } else {
        cell.html('<div class="red-circle"></div>');
      }
    }
  $('#blackStoneNum').text(blackStoneNum);
  $('#whiteStoneNum').text(whiteStoneNum);
  }
}

/**
 * 黒→白、白→黒にターンを変更できるか確認する。
 */
function checkChangeColor(isBlack) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      let tmpData = createArrayFromData();
      if (tmpData[i][j] == 'S') {
        if (calc(i, j, isBlack, tmpData) > 0) {
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * 現在のデータをコピーしたものを作成する。
 * calcの結果で処理を変えたいので使用する。
 */
function createArrayFromData() {
  var tmpData = [];
  for (i = 0; i < BOARD_SIZE; i++) {
    tmpData[i] = [];
    for (j = 0; j < BOARD_SIZE; j++) {
      tmpData[i][j] = data[i][j];
    }
  }
  return tmpData;
}

/**
 * dataオブジェクトにデータをコピーする。
 */
function copyToData(arr) {
  if (arr.length != BOARD_SIZE && arr[0].length != BOARD_SIZE) {
    return false;
  }
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      data[i][j] = arr[i][j];
    }
  }
  return true;
}

/**
 * コンピュータのターンを再計算する。
 */
function computerTurn() {
  let isBlack = computerColor == 'B';
  let x = 0;
  let y = 0;
  let turnOverNum = 0;

  if (computerLevel == 1) {
    // 一番多く取れるところに置きます。
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        let tmpData = createArrayFromData();
        if (tmpData[i][j] == 'S') {
          let tmpTurnOverNum = calc(i, j, isBlack, tmpData);
          if (tmpTurnOverNum > turnOverNum) {
            x = i;
            y = j;
            turnOverNum = tmpTurnOverNum;
          }
        }
      }
    }
  } else if (computerLevel == 2) {
    // 一番少なく取れるところに置きます。
    turnOverNum = 99;
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        let tmpData = createArrayFromData();
        if (tmpData[i][j] == 'S') {
          let tmpTurnOverNum = calc(i, j, isBlack, tmpData);
          if (tmpTurnOverNum > 0 && tmpTurnOverNum < turnOverNum) {
            x = i;
            y = j;
            turnOverNum = tmpTurnOverNum;
          }
        }
      }
    }
    turnOverNum = turnOverNum == 99 ? 0 : turnOverNum;
  } else if (computerLevel == 3) {
    // 基本一番少なく取れるところに置きますが、端をとることを最優先にします。
    turnOverNum = 99;
    let dangerX = -1;
    let dangerY = -1;
    let priorityX = -1;
    let priorityY = -1;
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        let tmpData = createArrayFromData();
        if (tmpData[i][j] == 'S') {
          let tmpTurnOverNum = calc(i, j, isBlack, tmpData);
          if (tmpTurnOverNum > 0) {
            if ((i == 0 && j == 0) || (i == 0 && j == BOARD_SIZE - 1) ||
                (i == BOARD_SIZE - 1 && j == 0) || (i == BOARD_SIZE -1 && j == BOARD_SIZE - 1)) {
              priorityX = i;
              priorityY = j;
            } else if ((i == 0 && j == 1) || (i == 1 && j == 0) || (i == 1 && j == 1) ||
                       (i == 0 && j == BOARD_SIZE - 2) || (i == 1 && j == BOARD_SIZE - 2) || (i == 1 && j == BOARD_SIZE - 2) ||
                       (i == BOARD_SIZE - 2 && j == 0) || (i == BOARD_SIZE - 2 && j == 1) || (i == BOARD_SIZE - 1 && j == 0) ||
                       (i == BOARD_SIZE - 2 && j == BOARD_SIZE - 2) || (i == BOARD_SIZE - 2 && j == BOARD_SIZE - 1) || (i == BOARD_SIZE - 1 && j == BOARD_SIZE - 2)) {
              dangerX = i;
              dangerY = j;
              continue;
           }
          }
          if (tmpTurnOverNum > 0 && tmpTurnOverNum < turnOverNum) {
              x = i;
              y = j;
              turnOverNum = tmpTurnOverNum;
          }
        }
      }
    }
    turnOverNum = turnOverNum == 99 ? 0 : turnOverNum;
    if (priorityX > -1) {
      x = priorityX;
      y = priorityY;
    } else if (turnOverNum == 0 && dangerX > -1) {
      x = dangerX;
      y = dangerY;
      turnOverNum = 1;
    }
  }

  if (turnOverNum > 0) {
    let tmpData = createArrayFromData();
    calc(x, y, isBlack, tmpData);
    copyToData(tmpData);
    if (checkChangeColor(!isBlackTurn)) {
      isBlackTurn = !isBlackTurn;
    } else {
      let msg = isBlackTurn ? "白" : "黒";
      msg += "は次のターン置くことができないので、パスします。";
      alert(msg);
    }
    turnNum++;
  }
}

/**
 * 疑似スリープ
 * @param ms
 */
function sleep(t) {
  let baseDate = new Date();
  while (true) {
    let compareDate = new Date();
    if (compareDate - baseDate > t) {
      break;
    }
  }
}
