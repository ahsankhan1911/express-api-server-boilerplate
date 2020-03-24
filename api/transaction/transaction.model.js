/* -- DB Model --
    MongoDB models should be defined here
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TransactionSchema = new Schema({
  "amount": { type: Number, required: true },
  "payment_method_nonce": { type: String, required: true },
  "made_by": { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  "is_deleted": { type: Boolean, default: false }
},{
  versionKey:false, 
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


module.exports = mongoose.model('Transaction', TransactionSchema);

