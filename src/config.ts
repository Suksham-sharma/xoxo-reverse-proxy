import fs from "node:fs/promises";
import { parse } from "yaml";
import { rootConfigSchema } from "./schema/config-schema";

export async function parseYAMLConfig(filepath: string) {
  const configFileContent = await fs.readFile(filepath, "utf-8");
  const parsedConfig = parse(configFileContent);
  return JSON.stringify(parsedConfig);
}

export async function validateConfigParams(config: string) {
  const validatedConfig = rootConfigSchema.parseAsync(JSON.parse(config));
  return validatedConfig;
}
