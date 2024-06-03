import mongoose from "mongoose";

const url='mongodb://127.0.0.1:27017/mydatabase';

const dbCon=async()=>{
    try {
        await mongoose.connect(url)
        console.log('Mongodb is conntected')
    } catch (error) {
        console.log(error)
    }
}

export default dbCon