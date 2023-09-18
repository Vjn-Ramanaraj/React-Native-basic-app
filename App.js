import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Import SafeAreaProvider
import { firebase } from './config';
import 'react-native-gesture-handler';

import Login from './Interface/Login';
import Signup from './Interface/Signup';
import Welcome from './Interface/Welcome';
import MyProfile from './Interface/MyProfile';
import Splash from './Interface/Splash';

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return subscriber;
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          {!user ? (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: 'Login' }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ title: 'Signup' }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ title: 'Welcome' }}
            />
          )}
          <Stack.Screen
            name="MyProfile"
            component={MyProfile}
            options={{ title: 'My Profile' }}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function MainApp() {
  return <App />;
}
