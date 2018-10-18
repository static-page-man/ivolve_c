// site title
var siteTitle = "IVOLVER育成サイト";

// App情報を持つオブジェクト
if (typeof ARISU === "undefined") {
  ARISU = {};
  // ARISU['isDebag'] = true;
  ARISU["isDebag"] = location.host === "localhost:3000";
}

// consoleにlogをはく
// loggerではなくpoyyer
// isDebagがfalseの場合はスルー
function poyyer() {
  if (ARISU["isDebag"]) {
    console.log(arguments[0]);
  }
}

// this.songTitleをもとにARISU['songList']から曲を取得
// @param   {string} song title
// @returns {null or object} 見つけたsongオブジェクト
function serchSong(songTitle) {
  if (!ARISU["songList"]) {
    return null;
  }

  let findSong = null;
  ARISU["songList"].forEach(function(s) {
    if (s.title === songTitle) {
      findSong = s;
    }
  });
  return findSong;
}

// スプレッドシートからsong情報を取得してjsonで返却
// @param {string} callbackName observerで呼び出すcallback
function getSongList(callbackName) {
  $.ajax({
    type: "GET",
    url:
      "https://spreadsheets.google.com/feeds/cells/1S1EZVG5nYMZ-D2GhiWXWWGQz7vReGLbIt5qu4daIukI/od6/public/values?alt=json&json-in-script&callback=test",
    dataType: "jsonp",
    jsonpCallback: "test"
  }).then(function(json) {
    poyyer(json);
    var header = [];
    var songData = [];
    json.feed.entry.forEach(function(entry) {
      if (entry.gs$cell.row == 1) {
        header.push(entry.content.$t);
      } else {
        var row = entry.gs$cell.row - 2;
        var col = entry.gs$cell.col - 1;
        if (!songData[row]) {
          songData[row] = {};
        }
        songData[row][header[col]] = entry.content.$t;
      }
    });
    poyyer(songData);
    ARISU["songList"] = songData;
    if (callbackName) {
      riotObserver.trigger(callbackName);
    }
    return songData;
  });
}

// youtube apiが設定済みか判定
// @return {boolean}
function addedYoutubeApi() {
  var tagId = "youtube_api";
  return !!document.getElementById(tagId);
}
function youtubeApiInstall() {
  poyyer("youtube install");
  var tagId = "youtube_api";
  // 使用済みのapiを削除
  var oldTag = document.getElementById(tagId);
  if (oldTag) {
    oldTag.parentNode.removeChild(oldTag);
  }

  // api install
  var tag = document.createElement("script");

  tag.id = tagId;
  tag.src = "https://www.youtube.com/iframe_api";

  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function createPlayer(videoIdKey) {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: videoIdKey,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    },
    playerVars: {
      // controls: 0, // UIを非表示にする
      disablekb: 0, // キーボードによる操作を不可にする
      fs: 0, // フルスクリーンボタンを消す
      iv_load_policy: 3, // アノテーションを非表示にする
      modestbranding: 1, // ロゴを非表示にする
      playsinline: 1,
      rel: 0, // 関連動画を非表示にする
      showinfo: 0 // インフォメーションを非表示にする
    }
  });

  // playerにheader分のpadding-topをつける
  var hh = document.getElementById("site_header").offsetHeight;
  document
    .getElementById("player")
    .setAttribute("style", "margin-top:" + hh + "px");
}

function onYouTubeIframeAPIReady() {
  // currentSong
  var currentSong = ARISU["currentSong"];
  var currentSongVideo = currentSong.youtube_url;
  if (!currentSongVideo) {
    return fasle;
  }

  // youtubeのvideoIdを取得
  var r = currentSongVideo.match(/https\:\/\/youtu.be\/(.*)/);
  if (r[1]) {
    var videoIdKey = r[1];
  } else {
    return false;
  }

  // lyricのpadding topを設定
  var yh = document.getElementsByClassName("youtube_wrap")[0].offsetHeight;
  var hh = document.getElementById("site_header").offsetHeight;
  var wh = window.innerHeight;
  var lyricEle = document.getElementById("lyrics");
  if (lyricEle) {
    lyricEle.style.paddingTop = hh + yh + "px";
    // lyricEle.style.height = (wh)+'px';
  }

  createPlayer(videoIdKey);
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // ios safariは動かないよー
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

/**
 * URL解析して、クエリ文字列を返す
 * @returns {Array} クエリ文字列
 */
function getUrlVars() {
  var vars = [],
    max = 0,
    hash = "",
    array = "";
  var url = window.location.search;

  //?を取り除くため、1から始める。複数のクエリ文字列に対応するため、&で区切る
  hash = url.slice(1).split("&");
  max = hash.length;
  for (var i = 0; i < max; i++) {
    array = hash[i].split("="); //keyと値に分割。
    vars.push(array[0]); //末尾にクエリ文字列のkeyを挿入。
    vars[array[0]] = array[1]; //先ほど確保したkeyに、値を代入。
  }

  return vars;
}
