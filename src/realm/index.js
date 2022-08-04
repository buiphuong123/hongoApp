import React from "react";
import Realm from "realm";
import { configureRealm } from "./config";

export const RealmRef = React.createRef();
export const RealmManager = {
    //@ts-ignorets-ignore
     open : async()=> {
        Realm.open(configureRealm).then((realm) => {
            RealmRef.current = realm
        })
    },
     getRealm: async() => {
        
        if (RealmRef.current=== undefined|| RealmRef.current?.isClosed) {
            Realm.open(configureRealm).then((realm) => {
                RealmRef.current = realm
            })
        }
        return RealmRef.current
    }
}


