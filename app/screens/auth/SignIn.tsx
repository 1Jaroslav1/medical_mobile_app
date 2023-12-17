import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../api/api';
import { useForm } from 'react-hook-form';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../../context/AuthContext';
import { FormInput, Toast } from '../../components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box,
    Button,
    Heading,
    Modal,
    Text,
    Spinner,
    View,
    VStack,
} from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../Layout';
import { useToast } from 'native-base';
import { fetchApi } from '../../api/fetchApi';

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
    const toast = useToast();

    const { control, handleSubmit } = useForm<SignInRequest>({
        resolver: yupResolver(schema),
    });

    const { setAuthState } = useAuth();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: SignInRequest) => {
            return fetchApi()(
                { url: API_URL.SIGN_IN, method: 'POST', postData: data },
                toast,
            );
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
            <Heading
                size="md"
                alignSelf="center"
                mb="20px"
                color="primaryBlue.700"
            >
                SignIn
            </Heading>
            <Box w="100%">
                <FormInput
                    label="Email"
                    name="email"
                    control={control}
                    mb="10px"
                    placeholder="Enter email..."
                />
                <FormInput
                    label="Password"
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
                <Text color="primaryBlue.400" onPress={handleSignUp}>
                    Sign up
                </Text>
            </Box>
            <Modal isOpen={isPending}>
                <Modal.Content minWidth="200px" minHeight="100px">
                    <Modal.Body
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        h="100%"
                    >
                        <VStack space={4}>
                            <Text fontSize={20}>Sign In</Text>
                            <Spinner size={30} />
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </View>
    );
};

export default SignIn;
