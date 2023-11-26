import 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Workspace from './app/screens/main/Workspace';
import SignIn from './app/screens/SignIn';
import SignUp from './app/screens/SignUp';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';
import { View } from 'react-native';
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import axios from 'axios';

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NativeBaseProvider>
                <AuthProvider>
                    <SafeAreaProvider>
                        <Layout></Layout>
                    </SafeAreaProvider>
                </AuthProvider>
            </NativeBaseProvider>
        </QueryClientProvider>
    );
}

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
