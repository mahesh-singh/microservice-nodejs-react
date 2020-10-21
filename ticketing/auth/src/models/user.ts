import mongoose from "mongoose";

interface UserAttr{
    email: string,
    password: string
}

interface UserDoc extends mongoose.Document{
    email: string,
    password: string
}

interface UserModel extends mongoose.Model<UserDoc>{
    build(attr: UserAttr): UserDoc
}

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        requiredPaths: true
    }
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

userSchema.statics.build = (attr: UserAttr)=>{
    return new User(attr);
}

export {User};