import { config } from "dotenv";
import { join } from "path";
import { ExpressError } from "../common/class/error";

config({
  path: join(__dirname, "..", "..", ".env"),
});

export class EnvConfig {
  constructor() {
    throw new ExpressError(400, `Can't instance static class`);
  }

  public static appConfig = {
    port: EnvConfig.parseInt(EnvConfig.getFromEnv("PORT")),
    nodeEnv: EnvConfig.parseString(EnvConfig.getFromEnv("NODE_ENV")),
    isDev:
      EnvConfig.parseString(EnvConfig.getFromEnv("NODE_ENV")) === "development",
  };

  public static dbConfig = {
    dbName: this.parseString(this.getFromEnv("DB_NAME")),
    dbPort: this.parseInt(this.getFromEnv("DB_PORT")),
    dbHost: this.parseString(this.getFromEnv("DB_HOST")),
    dbUsername: this.parseString(this.getFromEnv("DB_USERNAME")),
    dbPassword: this.parseString(this.getFromEnv("DB_PASSWORD")),
    dbSync: this.parseBoolean(this.getFromEnv("DB_SYNCHRONIZE")),
  };

  private static getFromEnv(key: string) {
    return process.env[key];
  }

  private static parseInt(value: string | undefined): number {
    if (!value) {
      throw new Error(`${value} is missing in Config. type: number`);
    }
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      throw new Error("This config is not of correct type");
    }
    return parsedValue;
  }

  private static parseString(value: string | undefined): string {
    if (!value) {
      throw new Error(`${value} is missing in Config. type: string`);
    }
    return value;
  }

  private static parseBoolean(value: string | undefined): boolean {
    if (!value) {
      throw new Error(`Boolean value is missing in Config.`);
    }

    if (!(value === "true" || value === "false")) {
      throw new Error(`Boolean valve is invalid.`);
    }

    return value === "true" ? true : false;
  }

  private static parseArrayOfString(value: string | undefined) {
    if (!value) {
      throw new Error(`Missing Env value in Conig type: arrayOfString.`);
    }
    return value.split(",");
  }
}
