const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const route = require("./routes");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.locals.baseUrl = process.env.BASE_URL;
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "/views/pages"));
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.use("/", route);

app.listen(PORT, () => {
	console.log(`listening on http://localhost:${PORT}`);
});
