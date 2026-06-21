#!/usr/bin/env node
import * as fs from "fs";
import path from "node:path";
import { allowedFiles } from "./constants/env.js";
import { filterDuplicateEnv } from "./utils/filter-duplicate-env.js";

const main = () => {
  const args = process.argv.slice(2);

  // ヘルプ
  if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage: envsample <file>");
    process.exit(0);
  }

  // 引数不正
  if (args.length !== 1) {
    console.error(
      "Error: please provide exactly one env file path. Use -h or --help for usage."
    );
    process.exit(2);
  }

  const filePath: string = args[0];

  // ファイルパス確認
  if (!fs.existsSync(filePath)) {
    console.error(`Error: file not found: ${filePath}`);
    process.exit(2);
  }

  const fileName: string = path.basename(filePath);

  // ファイル名確認
  if (fileName === "" || !allowedFiles.has(fileName)) {
    console.error(
      "Error: file name must be one of .env, .env.local, .env.test, .env.prd, or .env.stg."
    );
    process.exit(2);
  }

  // 環境変数取得
  let rows: string[];
  try {
    rows = fs.readFileSync(filePath, "utf-8").split("\n");
  } catch {
    console.error(`Error: failed to read file: ${filePath}`);
    process.exit(1);
  }

  const envLabels: string[] = [];

  rows.forEach((row) => {
    if (row.trim() === "") {
      return;
    }

    const label = row.split("=")[0];

    // 大文字確認
    if (!/^[A-Z][A-Z0-9_]*$/.test(label)) {
      console.error(
        `Error: invalid env name "${label}". Use uppercase letters, numbers, and underscores, starting with a letter.`
      );
      process.exit(1);
    }

    envLabels.push(label);
  });

  // ファイル書き込み
  const outDir = path.dirname(filePath);
  const outPath = path.join(outDir, ".env.sample");

  try {
    // 既存ファイルの存在確認
    let filteredEnvs: string[] = envLabels;
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0) {
      const currentText = fs.readFileSync(outPath, "utf-8");
      filteredEnvs = filterDuplicateEnv(currentText, envLabels);

      // 既存ファイルの改行確認
      if (!currentText.endsWith("\n")) {
        fs.appendFileSync(outPath, "\n", "utf-8");
      }
    }

    const outTexts = filteredEnvs.map((label) => `${label}=`).join("\n") + "\n";
    fs.appendFileSync(outPath, outTexts, "utf-8");

    console.log(`Success: .env.sample created (${outPath}).`);
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
    console.error("Error: failed to generate .env.sample.");
    process.exit(1);
  }
};

main();
