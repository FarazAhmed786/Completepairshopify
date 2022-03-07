import axios from 'axios';

export default async function handler(req,res){
    const data = await axios.post( process.env.BOOKING_SYSTEM_URL + '/api/auth/login',{
        "email":"naqi112244@gmail.com",
       "password":"12345678"
    },{withCredentials:true})
    return res.status(200).json({message:data});
}