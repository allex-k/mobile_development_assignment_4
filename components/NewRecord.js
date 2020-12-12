import React, { useState } from 'react';
import { Text, TextInput, TouchableWithoutFeedback, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function NewRecord({ addItemToList }) {
    const navigation = useNavigation();
    
    const [releaseDate, setReleaseDate] = useState(new Date());
    const [isPickerShown, setIsPickerShown] = useState(false);
    const [type, setType] = useState('');
    const [isTypeValid, setIsTypeValid] = useState(false);
    const [title, setTitle] = useState('');
    const [isTitleValid, setIsTitleValid] = useState(false);
    
    const [imdbIDGeneric, setImdbIDGeneric] = useState(0);
    
    const onPickerChange = (e, newReleaseDate) => {
        setIsPickerShown(false);
        setReleaseDate(newReleaseDate || releaseDate);
    };
    
    const onTypeChange = (newType) => {
        setType(newType);
        
        const formattedType = newType.trim();
        setIsTypeValid(formattedType.length >= 3 && formattedType.length <= 15 && /^(?:[A-Za-z]+)$/.test(formattedType));
    };
    
    const onTitleChange = (newTitle) => {
        setTitle(newTitle);
        
        const formattedTitle = newTitle.trim();
        setIsTitleValid(formattedTitle.length >= 1 && formattedTitle.length <= 30 && !(/[а-яА-ЯЁё]/.test(formattedTitle)));
    };
    
    const onAddItemHandler = () => {
        addItemToList({
            Title: title,
            Type: type,
            Released: moment(releaseDate).format('D MMMM YYYY'),
            Year: moment(releaseDate).format('YYYY'),
            imdbID: `tt${imdbIDGeneric}`
        });
        
        setImdbIDGeneric(prev => ++prev);
        
        setTitle('');
        setType('');
        setReleaseDate(new Date());
        
        setIsTitleValid(false);
        setIsTypeValid(false);
        
        navigation.navigate('Movies');
    };
    
    const vizualizeValidation = (isValid) => isValid ? <Text style={{color: "#3cb371"}}>✔</Text> : <Text style={{color: "#ff0000"}}>✘</Text>;
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Provide the Title:  {vizualizeValidation(isTitleValid)}</Text>
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                placeholder="From 1 to 30 Latin alphabet symbols"
                value={title}
                onChangeText={(inputText) => onTitleChange(inputText)}
            />
            <Text style={styles.label}>Enter a Type:  {vizualizeValidation(isTypeValid)}</Text>
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                placeholder="From 3 to 15 Latin alphabet letters"
                value={type}
                onChangeText={(inputText) => onTypeChange(inputText)}
            />
            <Text style={styles.label}>Pick a Release Date:</Text>
            <Button title={moment(releaseDate).format('MMMM D, YYYY')} onPress={() => setIsPickerShown(true)} />
            {isPickerShown && (
                <DateTimePicker
                    mode="date"
                    value={releaseDate}
                    onChange={onPickerChange}
                    maximumDate={new Date(2050, 0, 0)}
                    minimumDate={new Date(1895, 2, 22)}
                />
            )}
            {isTitleValid && isTypeValid && (
                <Button
                    buttonStyle={styles.addButton}
                    TouchableComponent={TouchableWithoutFeedback}
                    title="Add"
                    type="clear"
                    onPress={onAddItemHandler}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight + 15,
        marginHorizontal: 13,
    },
    label: {
        paddingVertical: 12.5,
        marginHorizontal: 4.5,
        fontSize: 18
    },
    textInput: {
        marginHorizontal: 4.5,
        paddingVertical: 6.5,
        paddingHorizontal: 12.5,
        borderRadius: 7.5,
        backgroundColor: "#fff",
        color: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 5,
        fontSize: 17
    },
    addButton: {
        marginVertical: 12.5
    }
});
