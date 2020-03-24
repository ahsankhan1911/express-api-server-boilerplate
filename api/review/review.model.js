/* -- DB Model --
    MongoDB models should be defined here
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReviewSchema = new Schema({
    "title": { type: String, required: true },
    "description": { type: String, default: null },
    "given_by": { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    "map_file": { type: mongoose.Schema.Types.ObjectId, ref: "Map_file", required: true },
    "is_deleted": { type: Boolean, default: false },
},
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });


module.exports = mongoose.model('Review', ReviewSchema);

