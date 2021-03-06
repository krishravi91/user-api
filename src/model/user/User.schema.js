import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
      type: String,
      maxlength:50,
      required: true
  },
  company: {
    type: String,
    maxlength:50,
    required: true
  },
  address: {
    type: String,
    maxlength:50,
    required: true
  },
  phone: {
    type: String,
    maxlength:11
  },
  email:{
    type: String,
    maxlength:50,
    required: true
  },
  password: {
    type: String,
    minlength:8,
    maxlength:100,
    required: true
  },
  refreshJWT:{
    token:{
      type: String,
      maxlength:500,
      default:''
    },
    addedAt:{
      type:Date,
      required:true,
      default:Date.now()
    },
  }
});

const uSchema = mongoose.model('user', UserSchema);

export {uSchema};

// export {UserSchema};