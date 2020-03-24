/* -- DB Model --
    MongoDB models should be defined here
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  "username": { type: String, required: true, unique: true },
  "email": { type: String, required: true, unique: true },
  "fullname": { type: String , required: true},
  "phone": { type: String, required: true },
  "description": { type: String },
  "braintree_client_token": { type: String, required: true },
  "bank_details": {
      "bank_name": { type: String },
      "account_number": { type: String },
      "bank_sort_code": { type: String }
  },
  "business_details": {
      "business_name": { type: String },
      "business_reg_no": { type: String },
      "registered_address": { type: String },
      "vat_registration": { type: Number }

  },
  "map_files_created": [
      { type: mongoose.Schema.Types.ObjectId, default: [], ref: 'Map_file' }
  ]
  ,
  "map_files_bought": [
      {
          "map_file_id": { type: mongoose.Schema.Types.ObjectId, ref: 'Map_file' },
          "transaction_id": { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }

      }

  ],
  "roles": [{ type: String, required: true, enums: ['admin', 'buyer', 'tuner'] }],
  "is_active": { type: Boolean, default: true },
  "is_deleted": { type: Boolean, default: false },
},{
  versionKey:false, 
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


module.exports = mongoose.model('User', UserSchema);

