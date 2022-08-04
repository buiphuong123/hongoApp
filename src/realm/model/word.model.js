import { Schema } from "../constant";

export const WordSchema = {
    name: Schema.WordSchema,

    properties: {
        _id: "string",
        word: "string",
        translate:"string",
        vn:"string",
        means: "string?[]",
        kind : "string?[]",
        amhan: "string?",
        level: "int",
        images: "string?[]",
        lession:"int",
        likes: "LikeWordSchema",
        memerizes: "LikeWordSchema",
    },
    primaryKey: '_id'
}

export const LikeWordSchema = {
    name: Schema.LikeWordSchema,
    embedded: true, // default: false
    properties: {
        isLike: 'bool?',
        
    }
}
export const MemerizeWordSchema = {
    name: Schema.MemerizeWordSchema,
    embedded: true, // default: false
    properties: {
        isMemerize: 'bool?',
        
    }
}

