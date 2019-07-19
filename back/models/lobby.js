const mongoose = require('mongoose');
const {Schema} = mongoose;

//Schema recibe un Json para definirlo
const LobbySchema = new Schema ({
    
    name: {type: String},
    users: [],
    games: []
});

LobbySchema.methods.getName = async () => {
    return this.name;
};

module.exports = mongoose.model("Lobby", LobbySchema);