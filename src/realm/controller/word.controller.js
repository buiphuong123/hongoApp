import { RealmManager } from ".."
import { Schema } from "../constant";

const saveListWord = async (listWord) => {
    try {
        const realm = await RealmManager.getRealm();
        realm.write(() => {
            listWord.forEach(element => {
                realm.create(Schema.WordSchema, element);
            });
        })

    } catch (error) {
        console.log("🚀 ~ file: word.controller.js ~ line 14 ~ saveListWord ~ error", error)

    }
}
 const getListWord = async(keyword) => {
    try {
        const realm = await RealmManager.getRealm();
         console.log(realm);
        const listWord = realm.objects(Schema.WordSchema);// laasy toafn bo ban ghi
        if (keyword === undefined || keyword === "") {
            return listWord;
        }
        return listWord.filter((value) => value?.vn.toLowerCase().includes(keyword?.toLowerCase()));
        
    } catch (error) {
    console.log("🚀 ~ file: word.controller.js ~ line 28 ~ getListWord ~ error", error)
        
    }
 }

export default WordController = {
    getListWord,
    saveListWord
};