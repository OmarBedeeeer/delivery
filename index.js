import express from "express";
import dotenv from "dotenv";
import { AppError } from "./src/utils/error.handler.js";
import userRouter from "./src/modules/router/user.router.js";
import productRouter from "./src/modules/router/product.router.js";
import connectToDb from "./dbConnection/db.connection.js";
import cartRouter from "./src/modules/router/cart.router.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);

app.all("*", (req, res, next) => {
  throw new AppError("Can't find this route", 400);
});

app.use((error, req, res, next) => {
  const { status, message, stack } = error;
  res.status(status || 500).json({
    message,
    stack,
  });
});
connectToDb();
app.listen(process.env.PORT, () => console.log(`Server running on port!`));
