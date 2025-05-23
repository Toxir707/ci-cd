import winston from "winston";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm" }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ level: "error" }),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/info.log", level: "info" }),
        new winston.transports.File({ filename: "logs/debug.log", level: "debug" }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
})

export default logger;


