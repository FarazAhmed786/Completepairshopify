const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    shopDomain:{
        type: String,
        required:true,
    },
    sessionToken:{
        type: String,
        required:true,
    },
})

module.exports = mongoose.models.Shop || mongoose.model('Shop',ShopSchema);