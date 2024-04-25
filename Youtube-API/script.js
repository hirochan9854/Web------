function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: youtubeId,
    playerVars: {
      controls: 0,
    },
    events: {
      onReady: onPlayerReady, //エラーで効かない。
      onStateChange: onPlayerStateChange,
    },
  });
  document.querySelector(".ytTitle").textContent = youtubeTitle;
  document.querySelector(".ytChannel").textContent = youtubeChannel;
  document.querySelector(".ytDescription").textContent = youtubeDescription;
}

// 4. このAPIは、video playderが準備でしたら、この関数を呼び出します。
function onPlayerReady(event) {
  event.target.playVideo();
  let currentVol = 5; //②最初のボリュームを設定（0〜100）
  event.target.setVolume(currentVol); //③Playerのボリュームに設定
  document.querySelector("#volume").value = currentVol; //④rangeFormに音量を設定
  document.querySelector("#volumeNum").textContent = currentVol; //⑤テキストにも音量を数値で表示
}

function ytSearch(val) {
  const key = "AIzaSyBBQ0KbPhmc6a_TYM5ka-kcP5iuhjF4s9o";
  const num = 100;
  const part = "snippet";
  const type = "video";
  const query = val;
  const selectvideo = document.querySelector(".videos");
  const ytId = [];
  const ytTitle = [];
  const ytDescription = [];
  const ytChannel = [];
  fetch(
    `https://www.googleapis.com/youtube/v3/search?type=${type}&part=${part}&maxResults=${num}&key=${key}&q=${query}&playsinline=1`
  )
    .then((data) => data.json())
    .then((obj) => {
      selectvideo.innerHTML = "";
      for (let i in obj["items"]) {
        //各videoIdとタイトルを取得して変数に代入
        ytId[i] = obj["items"][i]["id"]["videoId"];
        ytTitle[i] = obj["items"][i]["snippet"]["title"];
        ytDescription[i] = obj["items"][i]["snippet"]["description"];
        ytChannel[i] = obj["items"][i]["snippet"]["channelTitle"];
        const ytThumb =
          obj["items"][i]["snippet"]["thumbnails"]["medium"]["url"];
        selectvideo.innerHTML =
          selectvideo.innerHTML +
          `<div class="video"><img class="ytThumb" src="${ytThumb}"><dl class="ytText"><dt>${ytTitle}</dt><dd class="ytChannel">${ytChannel}</dt><dd class="ytDescription">${ytDescription}</dd></dl</div>`;
        const ytVideo = document.querySelector(".videos");
      }
    });
  const video = document.querySelectorAll(".video");
  console.log(video);
  console.log(ytId[0]);
  for (let i = 0; i < video.length; i++) {
    video[i].addEventListener("click", function () {
      console.log(i);
      youtubeId = ytId[i];
      youtubeTitle = ytTitle[i];
      youtubeChannel = ytChannel[i];
      youtubeDescription = ytDescription[i];

      console.log(youtubeTitle);
      console.log(i);
      player.destroy();

      onYouTubeIframeAPIReady();
    });
  }
}

//停止関数
function stopVideo() {
  player.stopVideo();
}

//再生関数
function playTheVideo() {
  player.playVideo();
}

//一時停止関数
function pauseTheVideo() {
  player.pauseVideo();
}

//ボリューム関数
function volumeFn(vol) {
  let currentVol = player.getVolume();
  player.setVolume(vol);
}

//ミュート関数
function onMute() {
  //ミュートの時、trueを返すのでミュートを解除します。
  if (player.isMuted()) {
    player.unMute();
  } else {
    //ミュートが解除されている時はfalseなので、ミュートにします。
    player.mute();
  }
}

//再生スピード関数
function playSpeed(num) {
  //setPlaybackRateが再生スピードをセットするメソッド
  console.log(num);
  player.setPlaybackRate(num);
  player.playVideo();
}

// 2. 変数tagにscriptタグを作って入れる。Element=要素、Attrubute=属性
var tag = document.createElement("script");
let youtubeId = "ixg-bJxY5gY";

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. APIのコードを読み込んでから、この関数を<iframe>内に影響させる。
var player;

/* 5. video playerのステート（状態）が変更されたら、この関数を呼び出す。
                  動画を再生するときの設定は、state=1にしておきます。
                  プレイヤーは、6000ミリ秒後に終了します。 */
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}

//再生イベント
let doplayBtn = document.querySelector("#doplay");
doplayBtn.addEventListener("click", function () {
  playTheVideo(); //関数名に変更
  document.querySelector("#dopause").style.display = "block";
  document.querySelector("#doplay").style.display = "none";
});

//停止イベント
let dostopBtn = document.querySelector("#dostop");
dostopBtn.addEventListener("click", function () {
  stopVideo();
  document.querySelector("#doplay").style.display = "block";
  document.querySelector("#dopause").style.display = "none";
});

//一時停止イベント
let dopauseBtn = document.querySelector("#dopause");
dopauseBtn.addEventListener("click", function () {
  pauseTheVideo();
  document.querySelector("#doplay").style.display = "block";
  document.querySelector("#dopause").style.display = "none";
});

//ミュートイベント
let onMuteBtn = document.querySelector("#mute img");
onMuteBtn.addEventListener("click", function () {
  onMute();
  if (onMuteBtn.getAttribute("src") === "./vol-off.svg") {
    onMuteBtn.setAttribute("src", "./vol-on.svg");
  } else {
    onMuteBtn.setAttribute("src", "./vol-off.svg");
  }
});

//10秒前にの関数
function onePrev() {
  let currentTime = player.getCurrentTime();
  player.seekTo(currentTime - 10);
}

//10秒後にの関数
function oneNext() {
  let currentTime = player.getCurrentTime();
  player.seekTo(currentTime + 10);
}

//10秒前へイベント
let onePrevBtn = document.querySelector("#do10sPrev");
onePrevBtn.addEventListener("click", function () {
  onePrev();
});

//10秒後へイベント
let oneNextBtn = document.querySelector("#do10sNext");
oneNextBtn.addEventListener("click", function () {
  oneNext();
});

//ボリュームイベント
let volumeBtn = document.querySelector("#volume");
let volumeTxt = document.querySelector("#volumeNum");
volumeBtn.addEventListener("change", function () {
  volumeFn(this.value);
  volumeTxt.textContent = this.value;
});

//再生スピードイベント
let speedBtn = document.querySelector("#doSpeed");
speedBtn.addEventListener("change", function () {
  //数値でないと効かないので、文字列から数値に変換
  playSpeed(parseFloat(speedBtn.speed.value));
});

const ytSearchBtn = document.querySelector("#searchBtn");
ytSearchBtn.addEventListener("click", function (e) {
  const ytSearchVal = document.querySelector("#ytSearch").value;
  console.log(ytSearchVal);

  ytSearch(ytSearchVal);

  e.preventDefault(); //検索ボタンの送信をストップしておく。
});

ytSearch();
