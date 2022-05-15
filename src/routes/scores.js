const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database.js");

//GET ALL SCORE
router.get("/", (req, res) => {
    var sqlcommand = "SELECT * FROM TB_SCORE";
    mysqlConnection.query(sqlcommand, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    });
});

//GET ONE SCORE
router.get("/:id", (req, res) => {
    const { id } = req.params;

    var sqlcommand = "SELECT * FROM TB_SCORE WHERE ID_SCORE = ?";
    mysqlConnection.query(sqlcommand, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    });
});
//POST SCORE

router.put("/", (req, res) => {
    const { id, puntuacion, colillas, puntos_totales, recompensas } = req.body;
    var query = `
  SET @ID_SCORE = ?;
  SET @PUNTUACION = ?;
  SET @COLILLAS = ?;
  SET @PUNTOS_TOTALES = ?;
  SET @RECOMPENSAS = ?;  
  CALL ScoreAddorUpdate(@ID_CLIENTE, @PUNTUACION , @COLILLAS,@PUNTOS_TOTALES, @RECOMPENSAS);
  `;
    mysqlConnection.query(
        query,
        [id, puntuacion, colillas, puntos_totales, recompensas],
        (err, rows, fields) => {
            if (err) throw err;
            else {
                res.send("SCORE EDITADO");
            }
        }
    );
});

//PUT SCORE
router.put("/:id", (req, res) => {
    const { puntuacion, colillas, puntos_totales, recompensas } = req.body;
    const { id } = req.params;
    var query = `
  SET @ID_SCORE = ?;
  SET @PUNTUACION = ?;
  SET @COLILLAS = ?;
  SET @PUNTOS_TOTALES = ?;
  SET @RECOMPENSAS = ?;  
  CALL ScoreAddorUpdate(@ID_CLIENTE, @PUNTUACION , @COLILLAS,@PUNTOS_TOTALES, @RECOMPENSAS);
  `;
    mysqlConnection.query(
        query,
        [id, puntuacion, colillas, puntos_totales, recompensas],
        (err, rows, fields) => {
            if (err) throw err;
            else {
                res.send("SCORE EDITADO");
            }
        }
    );
});

///DELETE SCORE
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    var sqlcommand = `DELETE FROM TB_SCORE WHERE ID_SCORE = ${id}`;
    mysqlConnection.query(sqlcommand, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json({ status: "SCORE Eliminado" });
        }
    });
});

module.exports = router;
