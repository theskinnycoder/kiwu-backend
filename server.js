import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware';
import {
  authRoutes,
  categoryRoutes,
  designerRoutes,
  orderRoutes,
  productRoutes,
  profileRoutes,
} from './routes';
import { connectDB, IS_PROD, NODE_ENV, PORT } from './utils';

(async () => {
  try {
    await connectDB();

    const app = express();

    // -- Express Middlewares
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
    if (!IS_PROD) app.use(morgan('dev'));

    // -- Route Forwarding
    app.use('/api/auth', authRoutes);
    app.use('/api/designers', designerRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/me', profileRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/categories', categoryRoutes);

    // -- Custom Error-Handlers
    app.use(notFound);
    app.use(errorHandler);

    const server = app.listen(PORT, () => {
      console.log(
        `Server up & running in ${NODE_ENV} mode & is listening for requests at http://localhost:${PORT}`,
      );
    });

    process.on('unhandledRejection', (err) => {
      console.log('👋UNHANDLED REJECTION! 💥Shutting down gracefully');
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on('SIGTERM', () => {
      console.log('👋SIGTERM RECEIVED! 💥Shutting down gracefully');
      server.close();
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
