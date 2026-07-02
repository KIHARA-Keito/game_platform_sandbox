# game_platform_sandbox

小規模なミニゲームをいろいろ試すためのフロントエンド専用プラットフォーム。データ永続化なし。

## スタック

- React + TypeScript + Vite
- PixiJS — 各ゲームの描画・ループ
- Zustand — ゲーム間で共有する軽量な状態
- Tailwind CSS — プラットフォームUI
- React Router — ゲーム一覧 / 個別ゲームのページ遷移

## 構成

```
src/
  games/
    types.ts          # MiniGame / MiniGameModule インターフェース
    registry.ts        # 全ゲームの一覧
    reflex-game/        # サンプルゲーム(PixiJSの実装例)
  components/
    GameCanvasHost.tsx # MiniGameをマウント/アンマウントする共通コンポーネント
  pages/
    GameListPage.tsx
    GamePage.tsx
  store/
    useAppStore.ts     # Zustandストア
```

## 新しいゲームの追加方法

1. `src/games/<game-name>/` に `MiniGame` インターフェースを実装したクラスを作成
2. `MiniGameModule` オブジェクト(`id`, `title`, `description`, `create()`)をexport
3. `src/games/registry.ts` の `gameRegistry` 配列に追加

これだけで一覧ページ・詳細ページ・マウント処理は自動的に対応します。

## セットアップ

```bash
npm install
npm run dev
```
