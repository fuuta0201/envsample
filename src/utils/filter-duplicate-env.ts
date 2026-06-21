/**
 * 既存ファイル内に同様の環境変数が存在するかをチェック
 */
export const filterDuplicateEnv = (
  prevText: string,
  inputList: string[]
): string[] => {
  const prevMap = new Set<string>();

  prevText.split("\n").forEach((text) => {
    prevMap.add(text);
  });

  // 既存環境変数に登録されている値は除外
  const nextList: string[] = [];

  inputList.forEach((text) => {
    if (!prevMap.has(text + "=")) {
      nextList.push(text);
    }
  });

  return nextList;
};
