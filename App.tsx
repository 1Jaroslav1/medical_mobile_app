import 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Workspace from './app/screens/main/Workspace';
import SignIn from './app/screens/auth/SignIn';
import SignUp from './app/screens/auth/SignUp';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import { theme } from './app/shared/theme';
import { useFonts } from 'expo-font';

const queryClient = new QueryClient();

export default function App() {
    axios.defaults.timeout = 2000;

    const [fontsLoaded] = useFonts({
        'DMSans-Black': require('./assets/fonts/DMSans-Black.ttf'),
        'DMSans-BlackItalic': require('./assets/fonts/DMSans-BlackItalic.ttf'),
        'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
        'DMSans-BoldItalic': require('./assets/fonts/DMSans-BoldItalic.ttf'),
        'DMSans-ExtraBold': require('./assets/fonts/DMSans-ExtraBold.ttf'),
        'DMSans-ExtraBoldItalic': require('./assets/fonts/DMSans-ExtraBoldItalic.ttf'),
        'DMSans-ExtraLight': require('./assets/fonts/DMSans-ExtraLight.ttf'),
        'DMSans-ExtraLightItalic': require('./assets/fonts/DMSans-ExtraLightItalic.ttf'),
        'DMSans-Italic': require('./assets/fonts/DMSans-Italic.ttf'),
        'DMSans-Light': require('./assets/fonts/DMSans-Light.ttf'),
        'DMSans-LightItalic': require('./assets/fonts/DMSans-LightItalic.ttf'),
        'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
        'DMSans-MediumItalic': require('./assets/fonts/DMSans-MediumItalic.ttf'),
        'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
        'DMSans-SemiBold': require('./assets/fonts/DMSans-SemiBold.ttf'),
        'DMSans-SemiBoldItalic': require('./assets/fonts/DMSans-SemiBoldItalic.ttf'),
        'DMSans-Thin': require('./assets/fonts/DMSans-Thin.ttf'),
        'DMSans-ThinItalic': require('./assets/fonts/DMSans-ThinItalic.ttf'),
    });

    if (!fontsLoaded) {
        return <></>;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <NativeBaseProvider theme={theme}>
                <AuthProvider>
                    <SafeAreaProvider>
                        <Layout />
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
