import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"
import morgan from "morgan";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import chartRoutes from "./routes/chart.route.js";
import applicationRoute from "./routes/application.route.js";
import blogRoutes from "./routes/blog.route.js"
import setupSwagger from './docs/swaggerDocs.js';
import { accessLogStream } from "./utils/morganConfig.js";
dotenv.config({});

const app = express();

// Application level middlewares (1)

// External middlewares (3rd party) (2)
app.use(helmet());
// app.use(rate_limiter);          // To prevent DOS attacks  [Fix too many requests error]
app.use(cookieParser());
app.use(morgan("combined", { stream: accessLogStream }));
// :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"

// Built-in middlewares (3)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions = {
    origin: ['http://localhost:5173', "https://cubicles.netlify.app/"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma']
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's / Router level middlewares (4)
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/blog" ,blogRoutes);
app.use('/api/v1/charts', chartRoutes);
// Setup Swagger documentation
setupSwagger(app);

// Global Error Handling Middleware (5)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
});