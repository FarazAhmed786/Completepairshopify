import dbConnect from "../../utils/database";
import Shop from "../../models/Shop";

dbConnect();

export default async function handler(req,res){
    const data = {shopDomain:req.body.store,sessionToken:req.body.token};
    if(req.method == "POST"){
        try{
            const shop = new Shop(data);
            const result = await shop.save();
            return res.status(200).json({message:'Shop Created'});
        }catch(err){
            return res.status(405).json({message:err});
        }
    }
    
}