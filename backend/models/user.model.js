const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String }, // URL to the avatar
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  purchaseHistory: [{ book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }, quantity: Number }],
  isBlocked: { type: Boolean, default: false }
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password'))
        return next;
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);