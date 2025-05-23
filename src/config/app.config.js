import { config } from "dotenv";

config()

const APP_PORT = parseInt(process.env.APP_PORT,10) || 4000;

export default APP_PORT;