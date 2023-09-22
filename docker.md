# dockerによる環境イメージ作成
## webアプリ環境作成(node.js)
DockerFileをつかってnode.jsの環境をつくる.


<!-- 以下にその他環境が増えたらそれぞれの作成メモを残す -->

複数コンテナを連携するときに使うdocker-compose.yml設定メモ
# docker composeの用意
`./docker-compose.yml`に記述する


## 実行
```
docker compose build
docker compose up -d
docker compose ps
curl localhost:8081
```

- docker compose ps : 現在の状態とポートの公開状態を表示
- 再ビルドするときは `docker-compose build --no-cache`でキャッシュを無効化する方が無難
## コンテナ内に入る方法
```
docker-compose exec alart-app sh
```
`alart-app`は`docker-compose.yml`のservice階層の要素名(サービス名)．

`sh`は`bash`とか`/bin/sh`とかじゃないと実行できない場合がある．

# 今後に向けてのメモ
- イメージの軽量化
    - マルチステージビルド
- アプリケーションの起動を全てdocker化

# 参考文献
- node.jsのdockerfile : https://github.com/nodejs/docker-node/blob/main/README.md#how-to-use-this-image
- node.js環境のサンプル(docker) : https://qiita.com/niwasawa/items/9673d31ee2a6c532dc5b
- dockerfileの書き方 : https://www.wakuwakubank.com/posts/270-docker-build-image/
- dockerのベストプラクティス : https://blog.shinonome.io/nodejs-docker/
- dockerfileとdocker-compose : https://qiita.com/sugurutakahashi12345/items/0b1ceb92c9240aacca02
- docker-compose利用ガイド例 : https://knowledge.sakura.ad.jp/16862/