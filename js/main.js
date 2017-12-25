// テーブルに入れるデータは文字列
// 黒 : B
// 白 : W
// 空白 : S
data[8][8];

/**
 * jQuery 初期呼び出し関数
 */
$(function(){
  init();
});

function init() {
  // 全てのデータにスペースを入れる。
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      data[i][j] = "S"
    }
  }
  // 最初は中央に黒石と白石が配置されている。
  data[3][3] = "B";
  data[3][4] = "W";
  data[4][3] = "W";
  data[4][4] = "B";

  draw();
}

function draw() {
  $('table#board td').each(function() {
  });
}
