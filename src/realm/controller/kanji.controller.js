import { RealmManager } from ".."
import { Schema } from "../constant";

const saveListKanji = async (listKanji) => {
    try {
        const realm = await RealmManager.getRealm();
        realm.write(() => {
            listKanji.forEach(element => {
                realm.create(Schema.KanjiSchema, element);
            });
        })

    } catch (error) {
        console.log("🚀 ~ file: kanji.controller.js ~ line 14 ~ saveListWord ~ error", error)

    }
}
 const getListKanji = async(keyword) => {
    try {
        const realm = await RealmManager.getRealm();
        const listKanji = realm.objects(Schema.KanjiSchema);// laasy toafn bo ban ghi
        if (keyword === undefined || keyword === "") {
            return listKanji;
        }
        return listKanji.filter((value) => value?.mean.toLowerCase().includes(keyword?.toLowerCase()));
        
    } catch (error) {
    console.log("🚀 ~ file: kanji.controller.js ~ line 28 ~ getListWord ~ error", error)
        
    }
 }

export default {
    saveListKanji,
    getListKanji
}