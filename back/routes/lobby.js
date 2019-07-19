const fs = require("fs");
var express = require("express");
var router = express.Router();
const Lobby = require("../models/lobby");
const User = require("../models/user");

//Obtener usuarios en el lobby
router.get("/", async (req, res, next) => {
  try {
    const result = await Lobby.findOne();
    let users = [];
    for (userId of result.users) {
      users.push(await User.findById(userId));
    }
    res.status(200).json({ users: users });
  } catch (e) {
    console.error(e);
    res.json(500, {
      message: "Hubo un error al buscar a los usuarios en el lobby"
    });
  }
});

//Loggear usuario al lobby
router.post("/", async (req, res, next) => {
  try {
    let user = await User.findOne({ name: req.body.name });

    if (!user) {
      user = new User({
        name: req.body.name
      });

      let result = await user.save();
    }

    let lobby = await Lobby.findOne();
    //falta validar si el usuario ya estaba en el lobby para no ingresarlo 2 veces
    if (!lobby.users.includes(user.id)) {
      lobby.users.push(user.id);
      let result = await lobby.save();
      res.json({ id: result.id });
    } else {
      res.json({ message: "Ese usuario ya estaba logueado" });
    }
  } catch (e) {
    console.error(e);
    res.json(500, { message: "Ocurrio un error" });
  }
});

//Eliminar usuario del lobby
router.delete("/", async (req, res, next) => {
  try {
    let user = await User.findOne({ name: req.body.name });
    if (!user) {
      res.json({ message: "Ese usuario no existe" });
    }
    let lobby = await Lobby.findOne();
    if(lobby.users.includes(user.id)){
      for(let i = 0; i < lobby.users.length ; ++i){
        if(lobby.users[i] === user.id){
          lobby.users.splice(i, 1);
        }
      }
      lobby.save();
      res.status(200).json({message: "El usuario se deslogueó bien"});
    }
    res.status(200).json({message: "El usuario no estaba logueado"});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Ocurrio un error" });
  }
});

module.exports = router;
