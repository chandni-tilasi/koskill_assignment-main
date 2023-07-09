import express from "express";
import cors from "cors";
import connect from "./src/connect/connect.js";
import router from "./src/routes/routes.js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 8000;
console.log(PORT);
app.use("/", router);

app.listen(PORT, () => {
  connect();
  console.log(`Server running on ${PORT}`);
});


