const express = require("express");

const pool = require("../../helpers/database");

const router = express.Router();

router.get("/allstaff", (req, res) => {
  pool.getConnection().then((conn) => {
    conn.query("SELECT * FROM staff").then((rows) => {
      res.json(rows);
    });
  });
});

router.post("/addstaff", (req, res) => {
  const idNumber = req.body.idNumber;
  const surname = req.body.surname;
  const employmentNumber = req.body.employmentNumber;
  const otherNames = req.body.otherNames;
  const region = req.body.region;
  const department = req.body.department;

  if (
    idNumber === "" ||
    surname === "" ||
    employmentNumber === "" ||
    otherNames === "" ||
    region === "" ||
    department === ""
  ) {
    res.status(400).json({ error: "Kindly input all fields" });
  } else {
    pool.getConnection().then((conn) => {
      conn
        .query(
          "INSERT INTO staff(idNumber,employmentNumber,surname,otherNames, region, department)VALUES(?,?,?,?,?,?)",
          [idNumber, employmentNumber, surname, otherNames, region, department]
        )
        .then((rows) => {
          res.json(rows);
        });
    });
  }
});

router.post("/individual", (req, res) => {
  const idNumber = req.body.idNumber;
  pool.getConnection().then((conn) => {
    conn
      .query("SELECT * FROM staff WHERE idNumber = ?", [idNumber])
      .then((rows) => {
        if (!rows) {
          console.log("No staff exists");
        }
        res.json(rows);
      })
      .catch((err) => console.log(err.message));
  });
});

module.exports = router;
