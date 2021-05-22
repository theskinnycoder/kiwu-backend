import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import adminURLs from "./urls/admin.urls.js";
import authURLs from "./urls/auth.urls.js";
import orderURLs from "./urls/order.urls.js";
import productURLs from "./urls/product.urls.js";
import profileURLs from "./urls/profile.urls.js";
import categoryURLs from "./urls/category.urls.js";
import connectDB from "./utils/connectDB.js";
import { NODE_ENV, PORT, __is_prod__ } from "./utils/constants.js";
import colors from "colors";

// Main Async IIFE
(async () => {
  await connectDB();

  const app = express();

  // -- Express Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
  if (!__is_prod__) app.use(morgan("dev"));

  // -- Route Forwarding
  app.use("/api/auth", authURLs);
  app.use("/api/admins", adminURLs);
  app.use("/api/products", productURLs);
  app.use("/api/me", profileURLs);
  app.use("/api/orders", orderURLs);
  app.use("/api/categories", categoryURLs);

  // -- Custom Error-Handlers
  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () =>
    console.log(
      `Server up & running in ${NODE_ENV} mode & is listening for requests at http://localhost:${PORT}`
        .yellow.bold,
    ),
  );
})();
