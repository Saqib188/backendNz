import { connect } from 'mongoose';



const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI)
        console.log(`MongoDb Connected Successfully ${conn.connection.host}`);
        
    } catch (error) {
console.error(`Db Connect errro ${error.message}`);
process.exit()

    }

}

export default connectDB