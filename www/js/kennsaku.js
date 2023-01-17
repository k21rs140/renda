// This is a JavaScript file

function toKennsaku() {
  // データ取得
  checkKennsaku()
  window.location.href = "#kennsaku-page";
}

function fetchAll() {
  // データ取得
  let TestDataClass = ncmb.DataStore(db);
  TestDataClass.order("name", false).fetchAll()
    .then(function (results) {
      showResults(results);
    })
}

function searchName() {
  let name = $("#name").val();
  let TestDataClass = ncmb.DataStore(db);
  TestDataClass.equalTo("name", name).fetchAll()
    .then(function (results) {
      showResults(results);
    })
}

function searchScore() {
  let level = parseInt($("#score").val());
  let TestDataClass = ncmb.DataStore(db);
  TestDataClass.equalTo("score", level).fetchAll()
    .then(function (results) {
      showResults(results);
    })
}

function showResults(results) {
  // テーブルのヘッダを生成
  let msg = "<table><tr><th>name</th><th>score</th></tr>";
  for (let i = 0; i < results.length; i++) {
    // 各データを収めた表の列を生成
    msg += "<tr>";
    msg += "<td>" + results[i].name + "</td>";
    msg += "<td class='num'>" + results[i].score + "</td>";
    msg += "</tr>";
  }
  // テーブルのテイラを生成
  msg += "</table>";
  $("#message").html(msg);
}

function checkKennsaku() {

}