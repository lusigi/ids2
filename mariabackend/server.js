const express = require("express");
const cors = require("cors");

const staff = require("./Routes/api/staff");

const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/staff", staff);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
