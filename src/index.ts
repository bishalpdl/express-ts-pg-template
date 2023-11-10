import raceGroupApp from "./app";
import { EnvConfig } from "./config/envConfig";

const app = raceGroupApp();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
