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
envsample .env
```

## Unlink

グローバルリンクを解除します

```
npm unlink -g envsample
```

## Usage

.envファイルを作成します

```
EXAMPLE_ENV=example-env
AUTH_SECRET=ejXwfsdf-fsdf304Scs
API_KEY=api-key-for-envsample
CLIENT_ID=client-id-for-envsample
```

envsampleを実行します。第二引数は.envへパスを入力します。

```
envsample .env
```

.env.sampleが作成されます

```
EXAMPLE_ENV=
AUTH_SECRET=
API_KEY=
CLIENT_ID=
```
