var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  name: {type: String, required: true },
  password: { type: String, required: true },
  email : {type : String, required: true, unique: true},
  address: {type:String },
  phone: {type: String},
  profilePicture: { type: String ,default:  '/images/default_user.jpeg'},
  isActive: {type: Boolean, default: true},
  accountType: {type: String, enum: ['employee', 'admin'], default: 'employee'}
  
},{
  versionKey:false,
  timestamps:true
});


module.exports = mongoose.model('User', UserSchema);

