<twitter-share-button>
<div class="footer__twitter_button">
  <a href="https://twitter.com/share" 
    class="twitter-share-button" 
    data-text="{this.dataText}"
    data-url="{this.dataUrl}"
    data-hashtags="{this.hashTags}" 
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
    this.dataText = getTwitterText();
    this.hashTags = getTwitterHashTags();
    function getTwitterHashTags(){
      var hash = location.hash;
      var text = 'IVOLVE'
      if(hash === '#sound-source'){
        text += ',IVOLVE音源リンク'
      }else {
        text += ',コール練習中'
      }
      return text; 
    }

    function getTwitterText(){
      var hash = location.hash;
      var text = 'IVOLVEのコール練習中'
      if(hash === '#sound-source'){
        text = 'IVOLVEの音源リンク'
      }else {

      }
      return text;
    }

    init(){
      // twitterボタン生成
      twttr.widgets.load();
    }
    this.on('mount',this.init);
  </script>
</twitter-share-button>