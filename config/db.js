import mongoose from 'mongoose'
import colors from "@colors/colors";

const connectDB = async () => {
	try{
		const conn = await mongoose.connect(process.env.MONGO_URL);
		console.log(`Connected To MongoDB ${conn.connection.host}`.bgMagenta.white);
	}catch(error){
		console.log(`Error in Mongo ${error}`.bgRed.white);
	}
};

export default connectDB;