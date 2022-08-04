import { Schema } from "../constant";

export const GrammarSchema = {
    name: Schema.GrammarSchema,

    properties: {
        _id: "string",
        level: "int",
        lession: "int",
        grammar: "string",
        uses: "{}",
        memerizes: "MemerizeGrammarSchema?"

    },
    primaryKey: '_id'
}

export const UseSchema = {
    name: Schema.UseSchema,
    embedded: true, // default: false
    properties: {
        explain: 'string?',
        note: 'string?',
        examples: "ExampleSchema?",
        mean: 'string?',
        synopsis: 'string?',
    }
}

export const ExampleSchema = {
    name: Schema.ExampleSchema,
    embedded: true, // default: false
    properties: {
        content: 'string?',
        mean: 'string?',
        transcription: 'string?',
    }
}
export const MemerizeGrammarSchema = {
    name: Schema.MemerizeGrammarSchema,
    embedded: true, // default: false
    properties: {
        isMem: 'bool?'
    }
}


