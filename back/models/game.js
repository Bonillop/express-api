const mongoose = require('mongoose');
const {Schema} = mongoose;

//Schema recibe un Json para definirlo
const GameSchema = new Schema ({
    
    name: {type: String},
    users: []
});

GameSchema.methods.getName = async () => {
    return this.name;
};

module.exports = mongoose.model("Game", GameSchema);