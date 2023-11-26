import { Box, Input, VStack } from 'native-base';
import { DrawerList } from './Workspace';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type SettingsProps = {
    navigation: DrawerNavigationProp<DrawerList, 'Settings'>;
};

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
    return (
        <VStack flex={1}>
            <Box flex={1} justifyContent="flex-end" p="4">
                <Input placeholder="Type here..." />
            </Box>
        </VStack>
    );
};

export default Settings;