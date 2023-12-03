import { Box, VStack } from 'native-base';
import { DrawerList } from '../Workspace';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import SettingsEditItem from './SettingsEditItem';
import { useUser } from '../../../api/useUser';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from '../../../api/api';
import { fetchApi } from '../../../api/fetchApi';
import { useToast } from 'native-base';
import { ScreenContainer } from '../../../components';

type SettingsProps = {
    navigation: DrawerNavigationProp<DrawerList, 'Settings'>;
};

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
    const toast = useToast();
    const { data: user, refetch: userRefetch } = useUser();

    const { mutate: mutateUsername } = useMutation({
        mutationFn: (value: string) => {
            return fetchApi()(
                { url: API_URL.UPDATE_USERNAME + value, method: 'POST' },
                toast,
            );
        },
        onSuccess: () => {
            userRefetch();
        },
    });

    // const { mutate: mutateEmail } = useMutation({
    //     mutationFn: (value: string) => {
    //         return fetchApi()(
    //             { url: API_URL.UPDATE_EMAIL + value, method: 'POST' },
    //             toast,
    //         );
    //     },
    //     onSuccess: () => {
    //         userRefetch();
    //     },
    // });

    const { mutate: mutatePassword } = useMutation({
        mutationFn: (value: string) => {
            return fetchApi()(
                { url: API_URL.UPDATE_PASSWORD + value, method: 'POST' },
                toast,
            );
        },
        onSuccess: () => {
            userRefetch();
        },
    });

    return (
        <ScreenContainer>
            <Box flex={1} py={5}>
                <VStack flex={1} justifyContent="flex-start" space={5} pb={8}>
                    <SettingsEditItem
                        label="User Name"
                        value={user?.name}
                        onSubmit={mutateUsername}
                    />
                    {/* <SettingsEditItem
                    label="Email"
                    value={user?.email}
                    onSubmit={mutateEmail}
                /> */}
                    <SettingsEditItem
                        label="Password"
                        value="passwordpassword"
                        type="password"
                        onSubmit={mutatePassword}
                    />
                </VStack>
            </Box>
        </ScreenContainer>
    );
};

export default Settings;
