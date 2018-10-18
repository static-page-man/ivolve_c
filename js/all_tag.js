riot.tag2('hero-header', '<section id="hero-header" class="hero"> <div class="hero-body"> <div class="container"> <h1 class="title hero_title"> IVOLVER育成サイト </h1> <h2 class="hero_subtitle subtitle"> IVOLVEの一般的なコールや音源情報などをまとめました </h2> </div> </div> </section> <div class="tabs is-boxed is-fullwidth"> <ul> <li each="{tab in this.tabs}" class="header_tab {tab.active ? \'is-active\':\'\'}"> <a href="{tab.href}"> <span>{tab.title}</span> </a> </li> </ul> </div>', 'hero-header .hero-body,[data-is="hero-header"] .hero-body{ background-image: url("./image/016sukagamino17103_TP_V.jpg"); background-position: center; background-size: cover; } hero-header .hero_title,[data-is="hero-header"] .hero_title{ color: #fff; font-weight: bold; } hero-header .hero_subtitle,[data-is="hero-header"] .hero_subtitle{ color: #fff; font-size: 1rem; }', '', function(opts) {
  this.tabs = [
    {
      href:'./'
      ,active:location.hash === ''
      ,title:'コール'
    }
    ,{
      href:'./#sound-source'
      ,active: location.hash === '#sound-source'
      ,title:'音源'
    }
  ]
  this.init = function(){

    var hh = document.getElementById('site_header').offsetHeight;
    document.getElementById('hero-header').setAttribute('style','padding-top:'+hh+'px');
  }.bind(this)
  this.on('mount',this.init);
});
riot.tag2('index-page', '<top-page></top-page> <site-footer></site-footer>', '', '', function(opts) {
});
riot.tag2('site-footer', '<footer class="footer footer_clear"> <div class="container"> <div class="content has-text-centered"> <p> まずはスマホ用のレイアウトで作成しています。<br> 何か不具合がありましたらこちらまで <a href="https://twitter.com/PageStatic" target="_blank">@PageStatic</a> </p> </div> </div> <twitter-share-button></twitter-share-button> </footer>', '', '', function(opts) {
});
riot.tag2('site-header', '<header id="site_header" class="nav is-info"> <div class="nav-left"> <span class="nav-item"> <a id="siteTitle" href="./"></a> </span> </div> <div class="nav-right"> <span class="nav-item"> <a href="https://twitter.com/IVOLVE_4/status/1052472489215807489" class="button is-warning" target="_blank"> <i class="fa fa-ticket" aria-hidden="true"></i> <span class="ticketText">TOUR "Thanx a lot!"</span> </a> </div> </header>', 'site-header #site_header,[data-is="site-header"] #site_header{ position: fixed; width: 100%; }', '', function(opts) {
});
riot.tag2('song-list', '<div if="{!this.list}"> Now loading...</div> <ul if="{this.list}" class="call_ul"> <li if="{song.active === \'TRUE\'}" each="{song in this.list}" class="call_li"> <a href="{location.href}#song?title={song.title}"> <div class="media"> <figure class="media-left"> <p class="image is-64x64 call_li__image" riot-style="background-image:url({song.thumbnail_image_url})"></p> </figure> <div class="media-content"> <div class="content dandy_content"> <strong class="song_title">{song.title}</strong> <div if="{song.tag}" class="tags"> <span each="{t in song.tag.split(\',\')}" class="tags__tag tag is-danger">{t}</span> </div> </div> </div> </div> </a> </li> </ul>', 'song-list .song,[data-is="song-list"] .song{ background: #f00; } song-list .song_title,[data-is="song-list"] .song_title{ font-size: 1.25rem; color: #69707a; } song-list .song_content,[data-is="song-list"] .song_content{ display: flex; flex-direction: column; } song-list .tags__tag,[data-is="song-list"] .tags__tag{ margin-right: 0.25rem; }', '', function(opts) {
    var self = this;
    this.list = ARISU['songList'];

    this.relaodSongList = function() {
      self.list = ARISU['songList'];
      this.update();
    }.bind(this)
    this.observerList = [
      {
        event:'song_list:relaodSongList'
        ,callback:this.relaodSongList
      }
    ];

    this.init = function() {

      this.observerList.forEach(function(ob){
        if(ob['event'] && ob['callback']){
          riotObserver.on(ob['event'],ob['callback']);
        }
      });

      if(!ARISU['songList']){
        getSongList('song_list:relaodSongList');
      }
    }.bind(this)

    this.close = function(){

      this.observerList.forEach(function(ob){
        if(ob['event']){
          riotObserver.off(ob['event']);
        }
      });
    }.bind(this)

    this.on('mount', this.init)
    this.on('unmount', this.close)
});
riot.tag2('song-page', '<div class="youtube_wrap"> <div id="player"></div> </div> <div if="{this.song && this.song.lyric_file_url}" id="lyrics"> <iframe id="lyricsFrame" onload="{this.setLyricViewHeight}" riot-src="{this.song.lyric_file_url}?embedded=true"></iframe> </div> <twitter-share-button></twitter-share-button>', 'song-page #font_size_button,[data-is="song-page"] #font_size_button{ position: fixed; bottom: 1rem; right: 1rem; display: flex; } song-page #lyrics,[data-is="song-page"] #lyrics{ width: 100%; padding: 1rem; overflow-y: scroll; overflow-x: hidden; -webkit-overflow-scrolling: touch; } song-page #lyrics iframe,[data-is="song-page"] #lyrics iframe{ width: 100%; height: 200vh; }', '', function(opts) {
    var self = this;
    this.songTitle = opts.songTitle;

    this.setLyricViewHeight = function(e){
      var height = e.target.offsetHeight;
      console.log(height);
    }.bind(this)

    this.createFontChangeBtn = function(){
      var iframe = $('iframe#lyricsFrame').contents();
      var lyricDoc = iframe.find('html');
      if(!lyricDoc){return false;}
      this.showFontBtnFlag = false;
      if(lyricDoc){
        this.showFontBtnFlag = true;

        var fontSizeUpButton = document.getElementById('font_size_up');
        fontSizeUpButton.addEventListener('click', function() {
          var zoomNum = lyricBody.style.zoom;
          var sizeNum = zoomNum !== ''? parseFloat(zoomNum) : 1;

          lyricBody.style.zoom = (sizeNum + 0.1);
        });
        var fontSizeDownButton = document.getElementById('font_size_down');
        fontSizeDownButton.addEventListener('click', function() {
          var zoomNum = lyricBody.style.zoom;
          var sizeNum = zoomNum !== ''? parseFloat(zoomNum) : 1;

          lyricBody.style.zoom = (sizeNum - 0.1);
        });
      }
    }.bind(this)

    this.relaodSong = function() {
      this.song = serchSong(this.songTitle)
      ARISU['currentSong'] = this.song;
      poyyer(this.song);

      if(addedYoutubeApi()){
        onYouTubeIframeAPIReady();
      }else{
        youtubeApiInstall();
      }
      this.update()
    }.bind(this)

    this.observerList = [
      {
        event:'song_page:relaodSong'
        ,callback:this.relaodSong
      }
    ]

    this.init = function(){
      poyyer('init')

      this.observerList.forEach(function(ob){
        if(ob['event'] && ob['callback']){
          riotObserver.on(ob['event'],ob['callback']);
        }
      });

      this.song = ARISU['songList'] ? serchSong(this.songTitle) : null
      poyyer('init',this.song)

      if(this.song){
        ARISU['currentSong'] = this.song;

        if(addedYoutubeApi()){
          onYouTubeIframeAPIReady();
        }else{
          youtubeApiInstall();
        }
        this.update();
      }else{
        getSongList('song_page:relaodSong')
      }
    }.bind(this)

    this.close = function() {

      this.observerList.forEach(function(ob){
        if(ob['event']){
          riotObserver.off(ob['event']);
        }
      });
    }.bind(this)

    this.on('mount',this.init)
    this.on('unmout',this.close)
});


riot.tag2('sound-source', '<hero-header></hero-header> <div class="container"> <div if="{!this.list}"> Now loading...</div> <ul if="{this.list}" class="call_ul"> <li each="{item in this.list}" class="call_li"> <a href="{item.href}"> <div class="media"> <figure class="media-left"> <p class="image is-64x64 call_li__image" riot-style="background-image:url({item.thumbnail_image_url})"></p> </figure> <div class="media-content"> <div class="content dandy_content"> <strong class="song_title">{item.title}</strong> <div if="{item.tag}" class="tags"> <span each="{t in item.tag.split(\',\')}" class="tags__tag tag is-danger">{t}</span> </div> </div> </div> </div> </a> </li> </ul> </div> <site-footer></site-footer>', 'sound-source .song,[data-is="sound-source"] .song{ background: #f00; } sound-source .song_title,[data-is="sound-source"] .song_title{ font-size: 1.25rem; color: #69707a; } sound-source .song_content,[data-is="sound-source"] .song_content{ display: flex; flex-direction: column; } sound-source .tags__tag,[data-is="sound-source"] .tags__tag{ margin-right: 0.25rem; }', '', function(opts) {
    var self = this;

    this.list = [
      {
        title:'YouTube'
        ,href:'https://www.youtube.com/channel/UCPUtHmTRUendX7aIQ1zDN1w/featured'
        ,tag:'MV,ライブ動画'
        ,thumbnail_image_url:'https://pbs.twimg.com/media/DpyAO5hU8AA2lqt.jpg'}
      ,{
        title:'Soundcloud'
        ,href:'https://soundcloud.com/ivolve_4'
        ,tag:'限定配信音源'
        ,thumbnail_image_url:'https://pbs.twimg.com/media/DpyAqAPUcAEk0xG.jpg'}
      ,{
        title:'LINE MUSIC'
        ,href:'https://music.line.me/artist/mi000000000f42091b'
        ,tag:'ストリーミングサービス'
        ,thumbnail_image_url:'https://pbs.twimg.com/media/DpyAwyeU8AAGnoi.jpg'}
      ,{
        title:'Apple Music'
        ,href:'https://itunes.apple.com/jp/artist/ivolve/981467372'
        ,tag:'ストリーミングサービス'
        ,thumbnail_image_url:'https://pbs.twimg.com/media/DpyA-SUU0AA8Ayb.jpg'}
      ,{
        title:'Google Play Music'
        ,href:'https://play.google.com/store/music/artist/IVOLVE?id=A6a5wskvmlr4xfgim5ksihpdn4y'
        ,tag:'ストリーミングサービス'
        ,thumbnail_image_url:'https://pbs.twimg.com/media/DpyBLZYU0AASsqJ.jpg'}
      ,{
        title:'Spotify'
        ,href:'https://open.spotify.com/artist/1wwQQN5vWUHSZxehN4VsWZ?si=kZile3ZuT7qrpwzV5tMXEA'
        ,tag:'ストリーミングサービス'
        ,thumbnail_image_url:'https://pbs.twimg.com/media/DpyBe4yVAAAIb-9.jpg'}
      ,{
        title:'AWA'
        ,href:'https://mf.awa.fm/2PG3Qgv'
        ,tag:'ストリーミングサービス'
        ,thumbnail_image_url:'https://pbs.twimg.com/media/DpyBnwCU4AEc-XS.jpg'}
      ,{
        title:'amazon music'
        ,href:'https://music.amazon.co.jp/artists/B00VGF07TC/CATALOG?ref=dm_wcp_artist_link_pr_s'
        ,tag:'ストリーミングサービス'
        ,thumbnail_image_url:'https://pbs.twimg.com/media/DpyBy7DU0AIkp9i.jpg'}
    ];

    this.relaodSongList = function() {
      self.list = this.list;
      this.update();
    }.bind(this)
    this.observerList = [
      {
        event:'song_list:relaodSongList'
        ,callback:this.relaodSongList
      }
    ];

    this.init = function() {

      this.observerList.forEach(function(ob){
        if(ob['event'] && ob['callback']){
          riotObserver.on(ob['event'],ob['callback']);
        }
      });

      if(!ARISU['songList']){
        getSongList('song_list:relaodSongList');
      }
    }.bind(this)

    this.close = function(){

      this.observerList.forEach(function(ob){
        if(ob['event']){
          riotObserver.off(ob['event']);
        }
      });
    }.bind(this)

    this.on('mount', this.init)
    this.on('unmount', this.close)
});
riot.tag2('top-page', '<hero-header></hero-header> <div class="container"> <song-list><song-list> </div>', '', '', function(opts) {
});
riot.tag2('twitter-share-button', '<div class="footer__twitter_button"> <a href="https://twitter.com/share" class="twitter-share-button" data-text="{this.dataText}" data-url="{this.dataUrl}" data-hashtags="{this.hashTags}" data-show-count="false">Tweet</a> <div class="footer__twitter_button">', 'twitter-share-button .footer__twitter_button,[data-is="twitter-share-button"] .footer__twitter_button{ text-align: center; margin: 2rem; }', '', function(opts) {
    this.dataUrl = location.href;
    this.dataText = getTwitterText();
    this.hashTags = getTwitterHashTags();
    function getTwitterHashTags(){
      var hash = location.hash;
      var text = 'IVOVLE'
      if(hash === '#sound-source'){
        text += ',IVOLVE音源リンク'
      }else {
        text += ',コール練習中'
      }
      return text;
    }

    function getTwitterText(){
      var hash = location.hash;
      var text = 'IVOVLEのコール練習中'
      if(hash === '#sound-source'){
        text = 'IVOLVEの音源リンク'
      }else {

      }
      return text;
    }

    this.init = function(){

      twttr.widgets.load();
    }.bind(this)
    this.on('mount',this.init);
});