# Map-app
行動を地図上に投影して表示するビジュアライザ

# 階層構造
- Dockerfile
- .dockerignore
- package.json (node.jsのnpmによるプラグインリスト)
- ./src
    - server.js (サーバ起動用 & ルーティング)
    - ./src/public (サイト本体)
        - index.html (トップページ)
        - ./src/public/register (畑登録ページ)
        - ./src/public/visualizer (行動履歴表示ページ)