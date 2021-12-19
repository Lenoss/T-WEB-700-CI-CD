import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";

const MongoDBPlugin = () =>
    MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async () => ({
            uri: 'mongodb+srv://countOfMoney:countOfMoney@cluster0.qggqf.mongodb.net/countOfMoney?retryWrites=true&w=majority',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
        inject: [ConfigService],
    })
export {MongoDBPlugin}