import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getPoster } from '../assets/Posters';

export default function Movie({ title, year, type, poster, imdbID }) {
    const navigation = useNavigation();
    
    const navigateToFullMovie = () => {
        navigation.navigate('Full movie', { imdbID });
    };
    
    return (
        <TouchableHighlight onPress={navigateToFullMovie} underlayColor="#fff" activeOpacity={0.75}>
            <View style={styles.wrapper}>
                <Image style={styles.poster} source={getPoster(poster)}  onPress={navigateToFullMovie} />
                <View style={styles.info}>
                    <Text style={styles.text}>{title}</Text>
                    <Text style={styles.text}>{year}</Text>
                    <Text style={styles.text}>{type}</Text>
                    <Divider style={styles.divider} />
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        margin: 1.5,
        padding: 20
    },
    poster: {
        width: 85,
        height: 135
    },
    info: {
        flex: 1,
        marginLeft: 15
    },
    text: {
        marginBottom: 5
    },
    divider: {
        backgroundColor: "#000"
    }
});
