import "reflect-metadata";
import { DataSource } from "typeorm";
import { EnvConfig } from "./config/envConfig";
import { readFileSync } from "fs";
import path, { join } from "path";

const dbConfig = EnvConfig.dbConfig;
const appConfig = EnvConfig.appConfig;

export let typeormConfig: any = {
  type: "postgres",
  host: dbConfig.dbHost,
  port: dbConfig.dbPort,
  username: dbConfig.dbUsername,
  password: dbConfig.dbPassword,
  database: dbConfig.dbName,
  synchronize: dbConfig.dbSync, // change to false during production
  logging: false,
  entities: [join(__dirname, "entities", "*.{js,ts}")],
  migrations: [join(__dirname, "migration", "*.{js,ts}")],
  subscribers: [join(__dirname, "modules", "**", "*.subscriber.{js,ts}")],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

if (appConfig.nodeEnv === "testing") {
  typeormConfig.ssl = {
    ca: readFileSync(
      path.join(__dirname, "../testingdb_certificate.crt")
    ).toString(),
  };
} else if (appConfig.nodeEnv === "production") {
  typeormConfig.ssl = {
    ca: readFileSync(
      path.join(__dirname, "../productiondb_certificate.crt")
    ).toString(),
  };
}

export const AppDataSource = new DataSource(typeormConfig);
