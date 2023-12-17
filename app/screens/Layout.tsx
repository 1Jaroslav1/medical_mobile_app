import 'react-native-gesture-handler';
import { useAuth } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Workspace from './main/Workspace';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import { View } from 'react-native';
import axios from 'axios';

const Stack = createNativeStackNavigator<StackParamList>();

export type StackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    Workspace: undefined;
};

export const Layout = () => {
    const { authState } = useAuth();

    if (authState?.authenticated) {
        axios.defaults.headers.common['Authorization'] =
            `Bearer ${authState.token}`;
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: '#fff',
            }}
        >
            <NavigationContainer>
                <Stack.Navigator>
                    {authState?.authenticated ? (
                        <Stack.Screen
                            name="Workspace"
                            component={Workspace}
                            options={{ headerShown: false }}
                        />
                    ) : (
                        <>
                            <Stack.Screen
                                name="SignIn"
                                component={SignIn}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SignUp"
                                component={SignUp}
                                options={{ headerShown: false }}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
};
