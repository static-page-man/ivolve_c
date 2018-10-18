<hero-header>
  <section id='hero-header' class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title hero_title">
          IVOLVER育成サイト
        </h1>
        <h2 class="hero_subtitle subtitle">
          IVOLVEの一般的なコールや音源情報などをまとめました
        </h2>
      </div>
    </div>
  </section>

  <div class='tabs is-boxed is-fullwidth'>
    <ul>
      <li each={tab in this.tabs} class="header_tab {tab.active ? 'is-active':''}">
        <a href="{tab.href}">
          <span>{tab.title}</span>
        </a>
      </li>
    </ul>
  </div>
  <style>
  .hero{
    &-body {
      background-image: url('./image/016sukagamino17103_TP_V.jpg');
      background-position: center;
      background-size: cover;
    }
    &_title {
      color:white;
      font-weight: bold;
    }
    &_subtitle {
      color:white;
      font-size: 1rem;
    }
  }
  </style>
  <script>
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
  init(){
    // site-header分のpadding-topをつける
    var hh = document.getElementById('site_header').offsetHeight;
    document.getElementById('hero-header').setAttribute('style','padding-top:'+hh+'px');
  }
  this.on('mount',this.init);
  </script>
</hero-header>