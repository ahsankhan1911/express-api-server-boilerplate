/* -- DB Model --
    MongoDB models should be defined here
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Map_fileSchema = new Schema({
  "make": { type: String, required: true },
  "model": { type: String, required: true },
  "build_ECU_type": { type: String, required: true },
  "engine_BHP": { type: Number, required: true },
  "hardware_number": { type: String, required: true },
  "price": { type: Number, required: true },
  "map_file_path": {type: String, required: true},
  "description": { type: String },
  "created_by": { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  "bought_by": [
      {
          "user_id": { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          "transaction_id": { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }

      }
  ],
  "reviews": [
      { type: mongoose.Schema.Types.ObjectId, ref: "Review" }
  ],
  "is_active": { type: Boolean, default: true },
  "is_deleted": { type: Boolean, default: false },
},{
  versionKey:false, 
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


module.exports = mongoose.model('Map_file', Map_fileSchema);

