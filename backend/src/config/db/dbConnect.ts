import mongoose from "mongoose";

export class Database {
  public static connect(dbConnString: string): void {
    mongoose.connect(dbConnString)
      .then(() => console.log('MongoDB connected'))
      .catch((error) => console.error('Error connecting to MongoDB:', error));
  };
};
