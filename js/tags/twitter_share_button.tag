<twitter-share-button>
<div class="footer__twitter_button">
  <a href="https://twitter.com/share" 
    class="twitter-share-button" 
    data-text="IVOLVEのコール練習中！"
    data-url="{this.dataUrl}"
    data-hashtags="IVOLVE,コール" 
    data-show-count="false">Tweet</a>
  <div class="footer__twitter_button">
  <style>
  .footer__twitter_button {
    text-align: center;
    margin: 2rem;
  }
  </style>
  <script>
    this.dataUrl = location.href;
    init(){
      // twitterボタン生成
      twttr.widgets.load();
    }
    this.on('mount',this.init);
  </script>
</twitter-share-button>