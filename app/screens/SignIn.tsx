import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../api/api';
import { useForm } from 'react-hook-form';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../context/AuthContext';
import { FormInput } from '../components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Heading, Modal, Text, Spinner, View } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';

const TOKEN_KEY = 'TOKEN';

interface SignInRequest {
    email: string;
    password: string;
}

const schema = yup.object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
});

type SignInProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'SignIn'>;
};

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const { control, handleSubmit } = useForm<SignInRequest>({
        resolver: yupResolver(schema),
    });

    const { setAuthState } = useAuth();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: SignInRequest) => {
            return axios.post(API_URL.SIGN_IN, data);
        },
        onSuccess: async result => {
            setAuthState!({
                token: result.data.token,
                authenticated: true,
            });
            axios.defaults.headers.common['Authorization'] =
                `Bearer ${result.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
        },
    });

    useEffect(() => {
        setShowModal(isPending);
    }, [isPending]);

    const onSubmit = useCallback(
        (data: SignInRequest) => {
            mutate(data);
        },
        [mutate],
    );

    const handleSignUp = useCallback(() => {
        navigation.navigate('SignUp');
    }, []);

    return (
        <View
            p="20px"
            flex={1}
            justifyContent="center"
            alignItems="center"
            w="100%"
        >
            <Heading size="md" alignSelf="center" mb="20px">
                SignIn
            </Heading>
            <Box w="100%">
                <FormInput
                    name="email"
                    control={control}
                    mb="10px"
                    placeholder="Enter email..."
                />
                <FormInput
                    name="password"
                    type="password"
                    control={control}
                    mb="10px"
                    placeholder="Enter password..."
                />
                <Button onPress={handleSubmit(onSubmit)}>SignIn</Button>
            </Box>
            <Box p="20px" flexDirection="row">
                <Text>Don't have an account?</Text>{' '}
                <Text color="primary.500" onPress={handleSignUp}>
                    Sign up
                </Text>
            </Box>
            {/* <Modal isOpen={true}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Sign In</Modal.Header>
                    <Modal.Body>Text</Modal.Body>
                </Modal.Content>
            </Modal> */}
        </View>
    );
};

export default SignIn;
