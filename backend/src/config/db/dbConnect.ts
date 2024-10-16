import mongoose from "mongoose";

export class Database {
  public static connect(dbConnString: string): void {
    mongoose.connect(dbConnString)
      .then(() => console.log('MongoDB connected'))
      .catch((error) => console.error('Error connecting to MongoDB:', error));
  };
  public static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      return console.log('MongoDB disconnected');
    } catch (error) {
      return console.error('Error disconnecting from MongoDB:', error);
    }
  };
};
