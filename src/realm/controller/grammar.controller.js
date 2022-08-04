import { RealmManager } from ".."
import { Schema } from "../constant";

const saveListGrammar = async (listGrammar) => {
    try {
        const realm = await RealmManager.getRealm();
        realm.write(() => {
            listGrammar.forEach(element => {
                realm.create(Schema.GrammarSchema, element);
            });
        })

    } catch (error) {
        console.log("🚀 ~ file: grammar.controller.js ~ line 14 ~ saveListWord ~ error", error)

    }
}
 const getListGrammar = async(keyword) => {
    try {
        const realm = await RealmManager.getRealm();
        const listGrammar = realm.objects(Schema.GrammarSchema);// laasy toafn bo ban ghi
        if (keyword === undefined || keyword === "") {
            return listGrammar;
        }
        return listGrammar.filter((value) => value?.grammar.toLowerCase().includes(keyword?.toLowerCase()));
        
    } catch (error) {
    console.log("🚀 ~ file: grammar.controller.js ~ line 28 ~ getListWord ~ error", error)
        
    }
 }

export default {
    saveListGrammar,
    getListGrammar
}