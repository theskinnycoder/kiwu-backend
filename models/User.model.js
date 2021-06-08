import { hash, verify } from 'argon2';
import { model, Schema } from 'mongoose';
import { isEmail, isStrongPassword } from 'validator';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: [true, 'This email is already taken'],
      lowercase: [true, 'An email should be all lowercase'],
      validate: [isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      select: false,
      minlength: [6, "Password can't be shorter than 6 characters"],
      validate: [isStrongPassword, 'The password you entered is weak'],
    },
    role: {
      type: String,
      required: true,
      enum: ['ADMIN', 'DESIGNER', 'CUSTOMER'],
      default: 'CUSTOMER',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await hash(this.password);
});

userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await verify(this.password, enteredPassword);
};

const User = model('User', userSchema);

export default User;
