import { program } from "commander";
import { parseYAMLConfig, validateConfigParams } from "./config";
import cluster from "node:cluster";

interface createWorkerConfig {
  port: number;
  workerCount: number;
}

async function createWorker(config: createWorkerConfig) {
  const { port, workerCount } = config;
  const workers = new Array(workerCount);

  if (cluster.isPrimary) {
    console.log("Master Process is running");
    for (let i = 0; i < workerCount; i++) {
      cluster.fork();
      console.log(`Worker ${i + 1} is running`);
    }
  }
}

async function main() {
  program.option("--config <path>");
  program.parse();

  const options = program.opts();

  if (options && "config" in options) {
    const validatedConfig = await validateConfigParams(
      await parseYAMLConfig(options.config)
    );
    console.log(validatedConfig);
  }
}

main();
