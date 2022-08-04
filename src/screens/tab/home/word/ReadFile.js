import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import RNFS from 'react-native-fs';
// import abc from '../../../../assets'
export default ReadFile = () => {
    var RNFS = require('react-native-fs');
    const pathss = '../../../../assets';
    const [fileData, setFileData] = useState();
    const [files, setFiles] = useState([]);
    // create a file 
    const filePath = RNFS.DocumentDirectoryPath + "/mama.txt"; //absolute path of our file
    const fileContent = [
        
            {
                "_id": "121232",
                "name": "kaka",
                "history": "casd"
            },
            {
                "_id": "3",
                "name": "kaka3",
                "history": "casd3"
            }
        
    ];
    const makeFile = async (filePath, content) => {
        try {
          //create a file at filePath. Write the content data to it
          await RNFS.writeFile(filePath,JSON.stringify(content), "utf8");
          console.log("written to file");
        } catch (error) { //if the function throws an error, log it out.
          console.log(error);
        }
      };

    const getFileContent = async (path) => {
        const reader = await RNFS.readDir(path);
        setFiles(reader);
    };
    const readFile = async (path) => {
        const exists = await RNFS.exists(path);
        if(exists === true) {
            const response = await RNFS.readFile(path);
        setFileData(response); //set the value of response to the fileData Hook.
        }
        else {
            console.log('file khong ton tai');
        }
      };
    useEffect(() => {
        readFile(filePath);
        // makeFile(filePath, fileContent);
        getFileContent(RNFS.DocumentDirectoryPath); //run the function on the first render.
    }, []);
    const Item = ({ name, isFile }) => {
        return (
            <View>
                <Text >Name: {name}</Text>
                <Text> {isFile ? "It is a file" : "It's a folder"}</Text>
            </View>
        );
    };

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Text >{index}</Text>
                {/* The isFile method indicates whether the scanned content is a file or a folder*/}
                <Item name={item.name} isFile={item.isFile()} />
            </View>
        );
    };
    return (
        <SafeAreaView>
            {/* <FlatList
                data={files}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
            /> */}
             <Text>{fileData}</Text>
        </SafeAreaView>
    );
}