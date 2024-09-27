import mongoose, { Document, Schema, Model } from 'mongoose';

type UserDocument = Document & {
    _id: mongoose.Schema.Types.ObjectId;
    document: string;
    name: string;
    email: string;
    phone: string;
    authentication: {
        password: string;
        salt: string;
        sessionToken: string;
    };
};

const userSchema = new Schema<UserDocument>(
    {
        document: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        phone: {
            type: String,
            required: true,
        },
        authentication: {
            password: {
                type: String,
                required: true,
                select: false,
            },
            salt: {
                type: String,
                select: false,
            },
            sessionToken: {
                type: String,
                select: false,
            },
        },
    },
    {
        timestamps: true,
        collection: 'users',
    },
);

const User: Model<UserDocument> = mongoose.model('User', userSchema);

const getUsers = () => User.find();
const getUserByEmail = (email: string) => User.findOne({ email });
const getUserBySessionToken = (sessionToken: string) =>
    User.findOne({
        'authentication.sessionToken': sessionToken,
    });
const getUserById = (id: string) => User.findById(id);
const getUserByPersonalData = (document: string, phone: string) => User.findOne({ document, phone });
const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
const getUserByDocument = (document: string) => User.findOne({ document });

export { User, UserDocument, getUsers, getUserByEmail, getUserBySessionToken, getUserById, createUser, getUserByPersonalData, getUserByDocument };
