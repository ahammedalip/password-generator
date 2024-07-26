import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    savedPasswords:{
        type:[passwordSchema],
        default :[]
    }

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
