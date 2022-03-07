import mongoose from 'mongoose';

const connection = {};

async function dbConnect(){
    if(connection.isConnected){
        return;
    }
    const db = await mongoose.connect('mongodb+srv://admin:QaZ3tfHEFtERlPXb@completepair.8ekla.mongodb.net/CompletePair?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
}

export default dbConnect;