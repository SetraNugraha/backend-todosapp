import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { prisma } from "./config/database";
import { errorMiddleware } from "./middlewares/error.middleware";
import router from "./features/routing";

const app: Express = express();
dotenv.config();
const PORT = process.env.PORT || 3001;

app.use(morgan(":method :url :status - :response-time ms"));
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api", router);

// Error Middleware
app.use(errorMiddleware);

async function startServer() {
  try {
    await prisma.$connect();
    console.log("connected to database successfuly");

    app.listen(PORT, () => {
      console.log(`server running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("failed to connect database: ", error);
    process.exit(1);
  }
}

async function shutdown() {
  console.log("\n shutting down server ...");
  await prisma.$disconnect();
  process.exit(0);
}

// SIGNAL INTERRUPT
process.on("SIGINT", shutdown);
// SIGNAL TERMINATE
process.on("SIGTERM", shutdown);

startServer();
