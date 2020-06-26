import express, { Handler } from "express";
import * as appInsights from "applicationinsights";
import { makeGetRequiredENVVar } from "./envs";
import { getLogger } from "./logs";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const logger = getLogger(process.env.LOG_LEVEL || "info");

const getRequiredENVVar = makeGetRequiredENVVar(logger);

// Start Application Insight
appInsights.setup();
appInsights.defaultClient.context.tags[
    appInsights.defaultClient.context.keys.cloudRole
] = "appservice-log";
appInsights.start();

app.get("/test", (req, res) => {
    res.send("test ok!");
    logger.info("test log");
});

app.listen(process.env.PORT || 8080);