import raceGroupApp from "./app";
import { EnvConfig } from "./config/envConfig";
import { AppDataSource } from "./data-source";

const app = raceGroupApp();

app.listen(EnvConfig.appConfig.nodeEnv, async () => {
  console.log(
    `Server is running on port ${EnvConfig.appConfig.port} in ${EnvConfig.appConfig.nodeEnv} mode. `
  );
  await AppDataSource.initialize();
  console.log("DB is connected.");
});
