import fs from "node:fs/promises";
async function parseYAMLConfig(filepath: string) {
  try {
    const configFileContent = await fs.readFile(filepath, "utf-8");
  } catch (error) {}
}
