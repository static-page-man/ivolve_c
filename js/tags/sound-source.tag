<sound-source>
  <hero-header></hero-header>
  <div class="container">
    <div if={!this.list}> Now loading...</div>
    <ul if={this.list} class="call_ul">
      <li each={item in this.list} class="call_li">
        <a href="{item.href}">
          <div class="media">
            <figure class="media-left">
              <p class="image is-64x64 call_li__image" style="background-image:url({item.thumbnail_image_url})"></p>
            </figure>
            <div class="media-content">
              <div class="content dandy_content">
                <strong class='song_title'>{item.title}</strong>
                <div if={item.tag}  class='tags'>
                  <span each={ t in item.tag.split(',')} class="tags__tag tag is-danger">{t}</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <site-footer></site-footer>
  <style>
  .song {
    background: red;
    &_title {
      font-size: 1.25rem;
      color: #69707a;
    }
    &_content {
    display:flex;
    flex-direction: column;
   }
  }
  .tags {
    &__tag {
      margin-right: .25rem;
    }
  }
  </style>

  <script>
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

    // songListをセット observerで使われる
    relaodSongList() {
      self.list = this.list;
      this.update();
    }
    this.observerList = [
      {
        event:'song_list:relaodSongList'
        ,callback:this.relaodSongList
      }
    ];
    
    init() {
      // set ovserver
      this.observerList.forEach(function(ob){
        if(ob['event'] && ob['callback']){
          riotObserver.on(ob['event'],ob['callback']);
        }
      });

      // songList取得
      if(!ARISU['songList']){
        getSongList('song_list:relaodSongList');
      }
    }

    close(){
      // delete observer
      this.observerList.forEach(function(ob){
        if(ob['event']){
          riotObserver.off(ob['event']);
        }
      });
    }

    this.on('mount', this.init)
    this.on('unmount', this.close)
  </script>
</sound-source>