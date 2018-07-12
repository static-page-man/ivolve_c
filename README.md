# 開発環境構築
  - githubからソースを取ってくる！
  - [node](https://nodejs.org/en/)環境を頑張ってインストール 
  - npm(nodeのパッケージマネージャー)でライブラリをインストール(nodeと一緒に入ってるはず)

```bash
# アプリのカレントディレクトリで実行
cd {app_dir}
npm install
```
  - ここまで行けば

  ```bash
  npm start
  ```
で開発環境が立ち上がるはず！

# 使用してる主なライブラリ

- カスタムタグ＆routerを使用　<br>
 [riot.js](https://riot.js.org/ja/)
- cssをsassみたいにかけるやーつ <br>
[stylus](http://stylus-lang.com/)
- 開発時にリアルタイムにブラウザに反映してくれるやーつ <br>
[browser-sync](https://browsersync.io/)

# 開発時

npm startを実行する <br>
riotの xxx.tag ファイルの変更をwatchしてjsファイルにコンパイルしている。 <br>
watchしないと xxx.tagがコンパイルされない為、jsにならず変更が更新されない。

```bash
＃ riot tagをwatchしてコンパイルする
npm start
```