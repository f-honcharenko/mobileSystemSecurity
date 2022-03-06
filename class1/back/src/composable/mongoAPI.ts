import config from '../../config/dev'
import mongoose from 'mongoose';


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, //make this true
    autoIndex: true, //make this also true
    
};

export async function initMongoAPI() { 
    try { 
        const responce = await mongoose.connect(config.mongoLink);
        Promise.resolve(responce);
    } catch (error) { 
        Promise.resolve(error);
    }
}