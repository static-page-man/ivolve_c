<song-page>
  <div class="youtube_wrap">
    <div id="player"></div>
  </div>
  <div if={this.song && this.song.lyric_file_url} id="lyrics">
    <iframe  id='lyricsFrame' onload='{this.setLyricViewHeight}' src="{this.song.lyric_file_url}?embedded=true"></iframe>
  </div>
  <twitter-share-button />
  <style>
    #font_size_button{
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      display: flex;
    }

    /* lyrics */
    #lyrics {
      width: 100%;
      padding: 1rem;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }

    #lyrics iframe {
      width: 100%;
      height: 200vh;
    }
  </style>
  <script>
    var self = this;
    this.songTitle = opts.songTitle;

    // iframeのheightを設定する
    setLyricViewHeight(e){
      var height = e.target.offsetHeight;
      console.log(height);
    }

    // 使えない
    // lyricのfontSizeを変更するボタン
    createFontChangeBtn(){
      var iframe = $('iframe#lyricsFrame').contents();
      var lyricDoc = iframe.find('html');
      if(!lyricDoc){return false;}
      this.showFontBtnFlag = false;
      if(lyricDoc){
        this.showFontBtnFlag = true;
        // functionをbind
        var fontSizeUpButton = document.getElementById('font_size_up');
        fontSizeUpButton.addEventListener('click', function() {
          var zoomNum = lyricBody.style.zoom;
          var sizeNum = zoomNum !== ''? parseFloat(zoomNum) : 1;    
          // fontSizeup
          lyricBody.style.zoom = (sizeNum + 0.1);
        });
        var fontSizeDownButton = document.getElementById('font_size_down');
        fontSizeDownButton.addEventListener('click', function() {
          var zoomNum = lyricBody.style.zoom;
          var sizeNum = zoomNum !== ''? parseFloat(zoomNum) : 1;    
          // fontSizeup
          lyricBody.style.zoom = (sizeNum - 0.1);
        });
      }
    }    

    // songListをセット observerで使われる
    relaodSong() {
      this.song = serchSong(this.songTitle)
      ARISU['currentSong'] = this.song;
      poyyer(this.song);

      // youtube api
      if(addedYoutubeApi()){
        onYouTubeIframeAPIReady();
      }else{
        youtubeApiInstall();
      }
      this.update()
    }

    this.observerList = [
      {
        event:'song_page:relaodSong'
        ,callback:this.relaodSong
      }
    ]

    init(){
      poyyer('init')
      // set ovserver
      this.observerList.forEach(function(ob){
        if(ob['event'] && ob['callback']){
          riotObserver.on(ob['event'],ob['callback']);
        }
      });

      // set song
      this.song = ARISU['songList'] ? serchSong(this.songTitle) : null
      poyyer('init',this.song)
      // songList取得
      if(this.song){
        ARISU['currentSong'] = this.song;
        
        // youtube api
        if(addedYoutubeApi()){
          onYouTubeIframeAPIReady();
        }else{
          youtubeApiInstall();
        }
        this.update();
      }else{
        getSongList('song_page:relaodSong')
      }
    }

    close() {
      // delete observer
      this.observerList.forEach(function(ob){
        if(ob['event']){
          riotObserver.off(ob['event']);
        }
      });
    }

    this.on('mount',this.init)
    this.on('unmout',this.close)
  </script>
</song-page>

