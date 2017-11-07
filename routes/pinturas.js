var express = require('express');
var router = express.Router();

router.get("/", function (req, res, next) {
    req.db.query("SELECT * FROM pintura", (err, result) => {
        if (err) res.status(500).send({ err: err });
        else res.send(result);
    });
});

router.get("/:id", function (req, res, next) {
    let id = req.params.id;
    req.db.query("SELECT * FROM pintura WHERE idnfc = ?", [id], (err, result) => {
        if (err) res.status(500).send({ err: err });
        else if (result.length == 0) res.status(404).send({ err: "No encontrado" });
        else res.send(result[0]);
    });
});

router.post("/", function (req, res, next) {
    let obj = req.body;
    req.db.query("INSERT INTO pintura SET ?", obj, (err, result) => {
        if (err) res.status(500).send({ err: err });
        else res.send({ success: true });
    });
});

router.put("/:id", function (req, res, next) {
    let id = req.params.id;
    let obj = req.body;
    // req.db.query("UPDATE INTO pintura SET nombre = ?,"
    //     + " autor=?,"
    //     + " tecnica = ?,"
    //     + " precio = ?,"
    //     + "idnfc = ? WHERE idpintura = ?",
    //     [obj.nombre, obj.autor, obj.tecnica, obj.precio, obj.idnfc, id],
    //     (err, result) => {
    //         if (err) res.status(500).send({ err: err });
    //         else res.send({ success: true });
    //     });
    req.db.query("UPDATE pintura SET ? WHERE idpintura = ?", [obj, id],
        (err, result) => {
            if (err) res.status(500).send({ err: err });
            else res.send({ success: true });
        });
});

router.delete("/:id", function (req, res, next) {
    let id = req.params.id;
    req.db.query("DELETE FROM pintura WHERE idpintura = ?", [id], (err, result) => {
        if (err) res.status(500).send({ err: err });
        else res.send({ success: true });
    });
});

module.exports = router;