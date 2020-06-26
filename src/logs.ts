import logform from "logform";
import { createLogger, format } from "winston";

const azureBlobTransport = require("winston3-azureblob-transport");

const { timestamp, printf } = logform.format;

export const getLogger = (level: string) =>
  createLogger({
    format: format.combine(
      timestamp(),
      format.splat(),
      format.simple(),
      printf((nfo) => {
        return `${nfo.timestamp} [${nfo.level}]: ${nfo.message}`;
      })
    ),
    level,
    transports: [
      new (azureBlobTransport)({
        account: {
          name: process.env.LOG_BLOBSTORAGE_STORAGEACCOUNT,
          key: process.env.LOG_BLOBSTORAGE_PRIMARYKEY || "" // base64 connection string
        },
        containerName: process.env.LOG_BLOBSTORAGE_CONTAINERNAME,
        blobName: process.env.LOG_BLOBSTORAGE_BLOBNAME,
        level: "info",
        rotatePeriod: "YYYY-MM-DD"
      })
    ]
  });
