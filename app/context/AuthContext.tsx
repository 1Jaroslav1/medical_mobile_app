import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api/api';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

interface AuthState {
    token: string | null;
    authenticated: boolean | null;
}

interface AuthProps {
    authState?: AuthState;
    setAuthState?: (authState: AuthState) => void;
    logout?: () => void;
}

const TOKEN_KEY = 'TOKEN';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                axios.defaults.headers.common['Authorization'] =
                    `Bearer ${token}`;
                setAuthState({
                    token,
                    authenticated: true,
                });
            }
        };
        loadToken();
    }, []);

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false,
        });
    };

    const value: AuthProps = {
        authState,
        setAuthState,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
