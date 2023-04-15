import * as express from "express";
import router from "./routes";
import * as cors from "cors";

const app = express();
app.use(express.json());
app.use(router);
cors({ origin: true });

app.listen(3000);
