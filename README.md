# envsample

.envから.env.sampleを生成するスクリプト

## Development

```
npm run dev -- .env
```

## Build

./distにビルド後のファイルが生成されます

```
npm run build
```

## Global link

別プロジェクト内でも利用可能にします

```
npm link
```

その後、別プロジェクト内でも以下のように使用できます
第二引数にはenvファイルパスを指定します

```
envsample hoge.env
```

## Unlink

グローバルリンクを解除します

```
npm unlink -g envsample
```
