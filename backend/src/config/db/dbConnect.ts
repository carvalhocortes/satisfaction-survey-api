import mongoose from "mongoose";

export class Database {
  public static async connect(dbConnString: string): Promise<void> {
    console.log('Connecting to MongoDB...');
    return mongoose.connect(dbConnString)
      .then(() => console.log('MongoDB connected'))
      .catch((error) => console.error('Error connecting to MongoDB:', error));
  };
  public static async disconnect(): Promise<void> {
    console.log('Disconnecting from MongoDB...');
    return mongoose.disconnect()
      .then(() => console.log('MongoDB disconnected'))
      .catch((error) => console.error('Error disconnecting from MongoDB:', error));
  };
};
