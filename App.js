import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { saveFileAsync, loadFileAsync } from './utils/fs';
import { removeItemByProp } from './utils/utils';
import Home from './components/Home';
import Movies from './components/Movies';
import NewRecord from './components/NewRecord';
import FullMovie from './components/FullMovie';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();
const MoviesStack = createStackNavigator();

export default function App() {
  const [moviesList, setMoviesList] = useState([]);
  
  useEffect(() => {
    (async () => {
      const loadedData = await loadFileAsync('./assets/MoviesList.txt');
      setMoviesList(loadedData['Search']);
    })();
  }, []);

  
  const routing = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const activeSize = focused ? size * 1.05 : size * .85;

      if (route.name === 'Home') {
        return <FontAwesome5 name="home" size={activeSize} color={color} />
      } else if (route.name === 'Movies') {
        return <MaterialCommunityIcons name="library-movie" size={activeSize} color={color} />;
      } else if (route.name === 'Add') {
        return <MaterialIcons name="library-add" size={activeSize} color={color} />
      };
    }
  });
  
  const removeMovieFromList = (imdbID) => {
    setMoviesList(prev => removeItemByProp(prev, 'imdbID', imdbID));
  };
  
  const addMovieToList = (movie) => {
    setMoviesList(prev => [...prev, movie]);
  };
  
  const MoviesStackScreen = () => (
    <MoviesStack.Navigator>
      <MoviesStack.Screen name="Movies" children={() => (<Movies list={moviesList} removeItemFromList={removeMovieFromList} />)} />
      <MoviesStack.Screen name="Full movie" component={FullMovie} />
    </MoviesStack.Navigator>
  );
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={routing}
        tabBarOptions={{
          inactiveTintColor: "#000",
          activeTintColor: "#4eb"
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Movies" component={MoviesStackScreen} />
        <Tab.Screen name="Add" children={() => (<NewRecord addItemToList={addMovieToList} />)} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
