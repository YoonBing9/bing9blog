import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Account = new Schema({
    username: String,
    password1: String,
    password2: String,
});

// generates hash
Account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password1
Account.methods.validateHash1 = function(password) {
    return bcrypt.compareSync(password, this.password1);
};

// compares the password2
Account.methods.validateHash2 = function(password) {
    return bcrypt.compareSync(password, this.password2);
};

export default mongoose.model('account', Account);
