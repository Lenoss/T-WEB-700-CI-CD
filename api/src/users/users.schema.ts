import {Type} from '@nestjs/common'
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

const createSchemaFromDocument = (doc: Type<unknown>) => {
    const schema = SchemaFactory.createForClass(doc)

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id
            delete ret.password
            return ret
        }
    })

    schema.set('toObject', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id
            delete ret.password

            return ret
        }
    })

    return schema
}

@Schema({collection: 'users', timestamps: true })
export class User extends mongoose.Document {

    @Prop()
    password: string

    @Prop()
    email: string

    @Prop()
    firstname: string

    @Prop()
    lastname: string

    @Prop()
    phone: string

    @Prop({default: new Date()})
    accessedAt: Date

    @Prop()
    role: string
}

const UserSchema = createSchemaFromDocument(User)

export {
    UserSchema,
}