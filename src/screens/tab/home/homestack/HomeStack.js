import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import HomeScreenDetail from '../HomeScreenDetail';
// import Grammar from '../Grammer';
import GrammarScreenDetail from '../GrammarScreenDetail';
import Grammer from '../Grammer';
import ListGrammer from '../ListGrammer';
// import ExplainScreen from '../ExplainScreen';
import WordScreen from '../word/WordScreen';
import WordInfo from '../word/WordInfo';
import ListWord from '../word/ListWord';
// import Flashcard from '../word/Flashcard';
import ChooseAnswer from '../ChooseAnswer';
import HomeGrammar from '../HomeGrammar';
// import Flashcard from '../word/Flashcard';
import WordLession from '../word/WordLession';
import KanjiLession from '../kanji/KanjiLession';
import KanjiScreen from '../kanji/KanjiScreen';
import EditWord from '../word/EditWord';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerMode: 'screen',
                headerShown: false,
            }}
        >
            <Stack.Screen
                name='Home'
                component={HomeScreen}
            />



            <Stack.Screen
                name='GrammarScr'
                component={Grammer}
            />

            {/* <Stack.Screen
                name='ExplainScreen'
                component={ExplainScreen}
            /> */}

            <Stack.Screen
                name='WordScreen'
                component={WordScreen}
            />

            <Stack.Screen
                name='WordInfo'
                component={WordInfo}
            />

            <Stack.Screen
                name='ListWord'
                component={ListWord}
            />

            <Stack.Screen
                name='HomeGrammar'
                component={HomeGrammar}
            />

            <Stack.Screen
                name='WordLession'
                component={WordLession}
            />

            <Stack.Screen
                name='KanjiLession'
                component={KanjiLession}
            />

            <Stack.Screen
                name='KanjiScreen'
                component={KanjiScreen}
            />
            <Stack.Screen
                name='EditWord'
                component={EditWord}
            />

            {/* <Stack.Screen
                name='Flashcard'
                component={Flashcard}
            /> */}

        </Stack.Navigator>
    )
}
export default HomeStack;