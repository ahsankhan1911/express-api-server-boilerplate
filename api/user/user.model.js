/* -- DB Model --
    MongoDB models should be defined here
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  "username": { type: String, required: true, unique: true },
  "email": { type: String, required: true, unique: true },
  "password": { type: String, required: true },
  "fullname": { type: String, required: true },
  "phone": { type: String, required: true },
  "description": { type: String,  default: "" },
  "braintree_client_token": { type: String, required: true },
  "bank_details": {
    "bank_name": { type: String, default: "" },
    "account_number": { type: String, default: "" },
    "bank_sort_code": { type: String, default: "" }
  },
  "business_details": {
    "business_name": { type: String, default: "" },
    "business_reg_no": { type: String, default: "" },
    "registered_address": { type: String, default: "" },
    "vat_registration": { type: Number, default: "" }

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
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


module.exports = mongoose.model('User', UserSchema);

