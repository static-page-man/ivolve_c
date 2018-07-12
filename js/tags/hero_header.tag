<hero-header>
  <section id='hero-header' class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title hero_title">
          IVOLVE
        </h1>
        <h2 class="hero_subtitle subtitle">
          IVOLVEの一般的なコールをまとめました
        </h2>
      </div>
    </div>
  </section>
  <style>
  .hero{
    &_title {
    font-weight: bold;
    }
    &_subtitle {
    font-size: 1rem;
    }
  }
  </style>
  <script>
  init(){
    // site-header分のpadding-topをつける
    var hh = document.getElementById('site_header').offsetHeight;
    document.getElementById('hero-header').setAttribute('style','padding-top:'+hh+'px');
  }
  this.on('mount',this.init);
  </script>
</hero-header>