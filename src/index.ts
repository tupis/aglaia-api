import * as express from "express";
import router from "./routes";
import * as cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(6000);
