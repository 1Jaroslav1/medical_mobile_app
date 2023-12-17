import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../api/api';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../components';
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
    useToast,
} from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../Layout';
import { fetchApi } from '../../api/fetchApi';

interface SignUpRequest {
    username: string;
    email: string;
    password: string;
}

const schema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
});

type SignUpProps = {
    navigation: NativeStackNavigationProp<StackParamList, 'SignUp'>;
};

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
    const toast = useToast();

    const { control, handleSubmit } = useForm<SignUpRequest>({
        resolver: yupResolver(schema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: SignUpRequest) => {
            return fetchApi()(
                { url: API_URL.SIGN_UP, method: 'POST', postData: data },
                toast,
            );
        },
        onSuccess: () => {
            navigation.navigate('SignIn');
        },
    });

    const onSubmit = useCallback(
        (data: SignUpRequest) => {
            mutate(data);
        },
        [mutate],
    );

    const handleSignIn = useCallback(() => {
        navigation.navigate('SignIn');
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
                    label="Username"
                    name="username"
                    control={control}
                    mb="10px"
                    placeholder="Enter username..."
                />
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
                <Button onPress={handleSubmit(onSubmit)}>SignUp</Button>
            </Box>
            <Box p="20px" flexDirection="row">
                <Text>Have an account?</Text>{' '}
                <Text color="primaryBlue.400" onPress={handleSignIn}>
                    Sign in
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

export default SignUp;
