import raceGroupApp from "./app";
import { EnvConfig } from "./config/envConfig";
import { AppDataSource } from "./data-source";

const app = raceGroupApp();

const PORT = EnvConfig.appConfig.port;
app.listen(PORT, async () => {
  console.log(
    `Server is running on port ${PORT} in ${EnvConfig.appConfig.nodeEnv} mode. `
  );
  await AppDataSource.initialize();
  console.log("DB is connected.");
});
