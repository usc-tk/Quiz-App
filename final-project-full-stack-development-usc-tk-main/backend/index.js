import express from "express";
import DBConnection from './model/index.js';
import userRoute from './route/userRoute.js';
import questionRoute from './route/questionRoute.js';
import leaderRoute from './route/leaderRoute.js';
import auth from './route/auth.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use("/user", userRoute);
app.use("/auth",auth);
app.use('/question',questionRoute);
app.use('/leadboard',leaderRoute);

app.listen(process.env.PORT || 8000, async () => {
    
    console.log("Server Started");
    try {
        await DBConnection;
    } catch (e) {
        console.log(e);
    }
})
