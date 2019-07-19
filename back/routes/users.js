const fs = require("fs");
var express = require("express");
var router = express.Router();
const User = require("../models/user");

//Obtener listado de users
router.get("/", async (req, res, next) => {
  try {
    const result = await User.find();
    if (!result) {
      res.json(404, { message: "Usuario no encontrado" });
      return;
    }
    res.json(200, { data: result });
  } catch (e) {
    console.error(e);
    res.json(500, { message: "Hubo un error al buscar al usuario" });
  }
});

//Crear User
router.post("/", async (req, res, next) => {
  let user = new User({
    name: req.body.name,
    age: req.body.age,
    adress: req.body.adress
  });

  try {
    let result = await user.save();
    res.json({ id: result.id });
  } catch (e) {
    console.error(e);
    res.json(500, { message: "Error al crear el usuario" });
  }
});

//Obtener usuario por nombre
router.get("/:name", async (req, res, next) => {
  try {
    const result = await User.findOne({ name: req.params.name });
    if (!result) {
      res.json(404, { message: "Usuario no encontrado" });
      return;
    }
    res.json(200, { data: result });
  } catch (e) {
    console.error(e);
    res.json(500, { message: "Hubo un error al buscar al usuario" });
  }
});

module.exports = router;
