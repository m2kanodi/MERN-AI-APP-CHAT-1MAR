import mongoose from 'mongoose';

const connectToMongoDB = async()=>{
    try{
        await mongoose.connect ('mongodb+srv://manavkanodia5:0GdWQ0M40UrajP2n@cluster0.8h77qdj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("connect successfully to mongodb")
    }catch(error){
        console.log("Error connecting to MongoDB",error.message);
    }
}
export default connectToMongoDB;