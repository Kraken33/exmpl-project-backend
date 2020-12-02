import mongoose from "mongoose";

//-------------------------------------
// Connect pool request to Mongoose
//-------------------------------------

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;
  

const createMongooseConnection = ({ port = 27017, dbName = 'example' }: any)=>mongoose.connect(`mongodb://localhost:${port}/${dbName}`);

const dbConnect: any = createMongooseConnection({ port: MONGO_PORT, dbName: MONGO_DB });

export {
  dbConnect
};
