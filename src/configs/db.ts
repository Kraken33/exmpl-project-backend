import mongoose from "mongoose";

//-------------------------------------
// Connect pool request to Mongoose
//-------------------------------------

const {
  // MONGO_USERNAME,
  // MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

type DBConfig = {
  port: string | number;
  dbName: string;
  hostName: string;
};
const createMongooseConnection = ({ port = 27017, dbName = "example", hostName = "localhost" }: DBConfig) =>
  mongoose.connect(`mongodb://${hostName}:${port}/${dbName}`, {
    useNewUrlParser: true,
  });

const dbConnect: any = createMongooseConnection({
  port: MONGO_PORT,
  dbName: MONGO_DB,
  hostName: MONGO_HOSTNAME
});

export { dbConnect };
