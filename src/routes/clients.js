const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database.js");

// GET all Clientes
router.get("/", (req, res) => {
    var sqlcommand = "SELECT * FROM TB_CLIENTE";
    mysqlConnection.query(sqlcommand, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    });
});

//GET ONE CLIENTE
router.get("/:id", (req, res) => {
    var { id } = req.params;
    var sqlcommand = "SELECT * FROM TB_CLIENTE WHERE ID_CLIENTE = ?";
    mysqlConnection.query(sqlcommand, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    });
});

//POST CLIENTE
router.post("/", (req, res) => {
    const { id, nombre, telefono, direccion, id_usuario, id_score } = req.body;
    var query = `
SET @ID_CLIENTE = ?;
SET @NOMBRE = ?;
SET @TELEFONO = ?;
SET @DIRECCION = ?;
SET @ID_USUARIO = ?;
SET @ID_SCORE = ?;
CALL ClienAddorUpdate(@ID_CLIENTE, @NOMBRE, @TELEFONO,@DIRECCCION, @ID_USUARIO,@ID_SCORE);
`;
    mysqlConnection.query(
        query,
        [id, nombre, telefono, direccion, id_usuario, id_score],
        (err, rows, fields) => {
            if (err) throw err;
            else {
                res.send("Cliente Agregado");
            }
        }
    );
});

//UPDATE CLIENTE
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, direccion, id_usuario, id_score } = req.body;
    var query = `
SET @ID_CLIENTE = ?;
SET @NOMBRE = ?;
SET @TELEFONO = ?;
SET @DIRECCION = ?;
SET @ID_USUARIO = ?;
SET @ID_SCORE = ?;
CALL ClienAddorUpdate(@ID_CLIENTE, @NOMBRE, @TELEFONO,@DIRECCCION, @ID_USUARIO,@ID_SCORE);
`;
    mysqlConnection.query(
        query,
        [id, nombre, telefono, direccion, id_usuario, id_score],
        (err, rows, fields) => {
            if (err) throw err;
            else {
                res.send("Cliente Agregado");
            }
        }
    );
});

//DELETE CLIENTE
router.delete("/:id", (req, res) => {
    const { id } = req.params.id;

    var sqlcommand = `DELETE FROM TB_CLIENTE WHERE ID_CLIENTE = '${id}'`;
    mysqlConnection.query(sqlcommand, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json({ status: "Cliente Agregado" });
        }
    });
});

module.exports = router;
