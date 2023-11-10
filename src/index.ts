import raceGroupApp from "./app";
import { EnvConfig } from "./config/envConfig";
import { AppDataSource } from "./data-source";

const app = raceGroupApp();

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await AppDataSource.initialize();
  console.log("DB is connected.");
});
