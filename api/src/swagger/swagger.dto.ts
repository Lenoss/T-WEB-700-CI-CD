import {ApiProperty} from "@nestjs/swagger";
import {Prop} from "@nestjs/mongoose";

export class SwaggerError {

    @ApiProperty({
        type: Number,
        description: 'The error status code'
    })
    statusCode: number;

    @ApiProperty({
        type: String,
        description: 'The error message'
    })
    msg: string;
}

export class SwaggerSuccessfulResponseGet {
    @ApiProperty({
        type: Number,
        description: 'The response status code.',
        examples: [200],
        example: 200
    })
    code: number;

    @ApiProperty({
        type: String,
        description: 'The response success message.',
        examples: ['Ok!'],
        example: 'Ok!'
    })
    message: string;

    @ApiProperty({
        type: Boolean,
        description: 'The response success confirmation.',
        examples: ['true'],
        example: 'true'
    })
    success: boolean;

    @ApiProperty({
        type: Object,
        description: 'The response data.',
        examples: [],
        example: []
    })
    data: object[];
}

export class SwaggerSuccessfulResponsePost {
    @ApiProperty({
        type: Number,
        description: 'The response status code.',
        examples: [201],
        example: 201
    })
    code: number;

    @ApiProperty({
        type: String,
        description: 'The response success message.',
        examples: ['Created!'],
        example: 'Created!'
    })
    message: string;

    @ApiProperty({
        type: Boolean,
        description: 'The response success confirmation.',
        examples: ['true'],
        example: 'true'
    })
    success: boolean;

    @ApiProperty({
        type: Object,
        description: 'The response data.',
        examples: [],
        example: []
    })
    data: object[];
}

export class SwaggerSuccessfulResponseDelete {
    @ApiProperty({
        type: Number,
        description: 'The response status code.',
        examples: [204],
        example: 204
    })
    code: number;

    @ApiProperty({
        type: String,
        description: 'The response success message.',
        examples: ['No content!'],
        example: 'No content!'
    })
    message: string;
}

export class SwaggerLogin {
    @ApiProperty({
        type: String,
        description: 'The authentication token.',
        example: 'Long string'
    })
    access_token: string;

    @ApiProperty({
        type: Object,
        description: 'User information.',
        examples: [],
        example: []
    })
    user: object[];
}