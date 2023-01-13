//
//  tapGame.js
//  MonacaFirstApp
//
//  Created by Natsumo Ikeda on 2016/07/01.
//  Copyright 2017 FUJITSU CLOUD TECHNOLOGIES LIMITED All Rights Reserved.
//

/******************************************************/
    // APIキーの設定
    var APPLICATION_KEY ="02047ec487f8c28342c1e090145ba7d835b9e3e7faf78d43ee6033ab3558e064";
    var CLIENT_KEY ="4d3ee93823b460166c6f36e7e4df1c502f2e2abdeaf0251d46d7227deb04971a";
/******************************************************/

// mBaaSの初期化
var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
// タイマー設定
var countTimer = 13;
// タップ回数カウンター
var counter = 0;
// 「tapFlag」的のタップ可否設定
var tapFlag = false;

// 「Start」ボタン押下時の処理
function startGame() {
    // ボタンの無効化
    document.gameForm.start.disabled = true;
    document.gameForm.ranking.disabled = true;
    
    // タップカウンターリセット
    this.counter = 0;
    $("#list-page strong").html(String(0));
    // タイマーリセット
    this.countTimer = 13;
    // タイマーを起動
    countTime(countTimer);
}

// 【mBaaS】データの保存
function saveScore (name, score) {
    // **********【問題１】名前とスコアを保存しよう！**********
    var GameScore = ncmb.DataStore("GameScore");
    var gameScore = new GameScore();
    gameScore.set("name",name);
    gameScore.set("score",score);
    gameScore.save().then(function(){
        console.log("保存に成功しました。");
    })
    .catch(function (error){
        console.log("保存に失敗しました。エラー:" + error);
    });
    
    
    
    
    
    
    
    
    
    
    // ********************************************************
}

// タイマー
function countTime(time) {
    if (time > 0){
        if (time >= 10) {
            this.tapFlag = false;
            $("#list-page p").html(String(time-10));
        } else if (time == 10) {
            this.tapFlag = true;
            $("#list-page p").html("スタート！");
        } else{
            this.tapFlag = true;
            $("#list-page p").html(String(time));
        }
        if (time == 3) {
            this.tapFlag = true;
            $("#list-page p").html("残り3秒!");
        }
        if (time == 2) {
            this.tapFlag = true;
            $("#list-page p").html("残り2秒!!");
        }
        if (time == 1) {
            this.tapFlag = true;
            $("#list-page p").html("残り1秒!!!");
        }
        this.countTimer -= 1;
        // １秒後にcountTime()を呼び出す
        setTimeout("countTime(countTimer)",1000);
    } else {
        this.tapFlag = false;
        $("#list-page p").html("タイムアップ！");
        imputName(this.counter);
    }    
}

// 名前入力アラートの表示
function imputName(count){
    // 入力アラートを表示
	var name = window.prompt("名前を入力してください", "");
    if (name == null || name == "") {
        $("#list-page p").html("保存がキャンセルされました");        
    } else {
        // スコアと入力した名前を保存
        saveScore(name, count);
        $("#list-page p").html(name + "さんのスコアは" + String(count) + "連打でした"); 
    }
    // ボタンの有効化
    document.gameForm.start.disabled = false;
    document.gameForm.ranking.disabled = false;
}

// タップ数カウント
function tapCount() {
    if (tapFlag) {
        this.counter += 1;
        $("#list-page strong").html(String(this.counter));
    }
}
