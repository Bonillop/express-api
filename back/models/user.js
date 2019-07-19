const mongoose = require('mongoose');
const {Schema} = mongoose;

//Schema recibe un Json para definirlo
const UserSchema = new Schema ({
    name: {type: String},
    age: {type: Number},
    adress: {type: String}
});

UserSchema.methods.getName = async () => {
    return this.name;
};

module.exports = mongoose.model("User", UserSchema);