import { ExampleSchema, GrammarSchema, MemerizeGrammarSchema } from "./model/grammar.model";
import { CompSchema, KanjiSchema, LikeKanjiSchema, MemerizeKanjiSchema } from "./model/kanji.model";
import { LikeWordSchema, MemerizeWordSchema, WordSchema } from "./model/word.model";
export const configureRealm = {
    path: 'Hongo',
    schema: [
        WordSchema,
        KanjiSchema,
        GrammarSchema,
        LikeKanjiSchema,
        MemerizeKanjiSchema,
        MemerizeGrammarSchema,
        LikeWordSchema,
        MemerizeWordSchema,
        ExampleSchema,
        CompSchema
    ],
    schemaVersion: 4,
};

