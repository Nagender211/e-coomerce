import mongoose from 'mongoose';

const mongo_url='mongodb+srv://dnagender2019_db_user:8jnnCCzAXqYonc4E@cluster0.cklgk4t.mongodb.net/?appName=Cluster0'
const dbConnection=async()=>{
    await mongoose.connect(mongo_url,{},console.log("mongo is connect")
)
}
export default dbConnection;