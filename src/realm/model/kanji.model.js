import { Schema } from "../constant";

export const KanjiSchema = {
    name: Schema.KanjiSchema,

    properties: {
        _id: "string",
        kanji:'string?',
        level:'string?',
        mean: 'string?',
        kanji_on: 'string[]',
        kanji_kun : 'string[]',
        explain: 'string?',
        image: 'string?',
        example_kun: "{}",
        example_on: "{}",
        detail: 'string?',
        compDetail: "CompSchema",
        lession: "int?",
        memerizes: "MemerizeKanjiSchema",
        likes: "LikeKanjiSchema"
    },
    primaryKey: '_id'
}

export const CompSchema = {
    name: Schema.CompSchema,
    embedded: true, // default: false
    properties: {
        w: 'string?',
        h: 'string?',
    }
}
export const MemerizeKanjiSchema = {
    name: Schema.MemerizeKanjiSchema,
    embedded: true, // default: false
    properties: {
        isMemerize: 'bool?'
    }
}
export const LikeKanjiSchema = {
    name: Schema.LikeKanjiSchema,
    embedded: true, // default: false
    properties: {
        isLike: 'bool?'
    }
}


