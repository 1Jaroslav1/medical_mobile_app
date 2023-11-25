import { Box, Input, VStack } from 'native-base';
import { DrawerList } from './Workspace';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type ChatProps = {
    navigation: DrawerNavigationProp<DrawerList, 'Chat'>;
};

const Home: React.FC<ChatProps> = ({ navigation }) => {
    return (
        <VStack flex={1}>
            <Box flex={1} justifyContent="flex-end" p="4">
                <Input placeholder="Type here..." />
            </Box>
        </VStack>
    );
};

export default Home;
