import mongoose, { ConnectOptions } from 'mongoose';

mongoose.Promise = global.Promise;

const connectToDatabase = async (host: string, port: number, db: string): Promise<void> => {
    await mongoose.connect(`mongodb://${host}:${port}/${db}`);
};

export { connectToDatabase };
