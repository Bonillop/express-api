const fs = require("fs");
var express = require("express");
var router = express.Router();
const Game = require("../models/game");
const Lobby = require("../models/lobby");

//Obtener listado de games en el lobby
router.get("/", async (req, res, next) => {
  try {
    const result = await Lobby.findOne();
    let games = [];
    for (gameId of result.games) {
      games.push(await Game.findById(gameId));
    }
    res.status(200).json({ games: games });
  } catch (e) {
    console.error(e);
    res.json(500, { message: "Hubo un error al buscar los games en el lobby" });
  }
});

//Crear Game
router.post("/", async (req, res, next) => {
  try {
    let game = new Game({
      name: req.body.name
    });
    let result = await game.save();
    let lobby = await Lobby.findOne();
    lobby.games.push(game.id);
    result = await lobby.save()
    res.json({ id: result.id });
  } catch (e) {
    console.error(e);
    res.json(500, { message: "Error al crear el Game" });
  }
});

//Eliminar game del lobby
router.delete("/", async (req, res, next) => {
  try {
    let game = await Game.findOne({ name: req.body.name });
    if (!game) {
      res.json({ message: "Ese game no existe" });
    }
    let lobby = await Lobby.findOne();
    if(lobby.games.includes(game.id)){
      for(let i = 0; i < lobby.games.length ; ++i){
        if(lobby.games[i] === game.id){
          lobby.games.splice(i, 1);
        }
      }
      game.remove();
      lobby.save();
      res.status(200).json({message: "El game se cerró bien"});
    }
    res.status(200).json({message: "El game no estaba creado"});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Ocurrio un error" });
  }
});

module.exports = router;
