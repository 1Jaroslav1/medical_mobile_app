import { Box, Input, VStack, ScrollView } from 'native-base';
import { DrawerList } from '../Workspace';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import HistoryItem from './HistoryItem';
import { useHistory } from '../../../api/useHistory';

type HistoryProps = {
    navigation: DrawerNavigationProp<DrawerList, 'History'>;
};

const History: React.FC<HistoryProps> = ({ navigation }) => {
    const { data, isLoading } = useHistory();

    const handlePressHistoryItem = (chatId: number, name: string) => {
        navigation.navigate('Chat', { chatId, name });
    };

    return (
        <ScrollView flex={1} p={4}>
            <VStack space={4} pb={8}>
                {data?.map((item, index) => (
                    <HistoryItem
                        key={index}
                        chatId={item.chatId}
                        label={item.name}
                        onHistoryItemPress={handlePressHistoryItem}
                    />
                ))}
            </VStack>
        </ScrollView>
    );
};

export default History;
