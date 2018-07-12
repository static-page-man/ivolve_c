<song-list>
  <div if={!this.list}> Now loading...</div>
  <ul  if={this.list} class="call_ul">
    <li each={song in this.list} class="call_li">
      <a href="/#song?title={song.title}">
        <div class="media">
          <figure class="media-left">
            <p class="image is-64x64 call_li__image" style="background-image:url({song.thumbnail_image_url})"></p>
          </figure>
          <div class="media-content">
            <div class="content dandy_content">
              <strong class='song_title'>{song.title}</strong>
              <div if={song.tag}  class='tags'>
                <span each={ t in song.tag.split(',')} class="tags__tag tag is-danger">{t}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  </ul>
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
    this.list = ARISU['songList'];

    // songListをセット observerで使われる
    relaodSongList() {
      self.list = ARISU['songList'];
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
</song-list>