import { Schema, model } from 'mongoose';

import { genSaltSync, hash, compare } from 'bcryptjs';

const userSchema = Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
      pic: {
        type: String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    },
    {
      timestamps: true,
    }
  );
  userSchema.pre("save",async function (next){
    if (!this.isModified("password")){
        next();
    }
    const salt = await genSaltSync(10)
    this.password = await hash(this.password,salt)
  })


userSchema.methods.matchPassword = async function (enterPW) {
     return await compare(enterPW,this.password)
}

  const User = model("User",userSchema)

  export default User;