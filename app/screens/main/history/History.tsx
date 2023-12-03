import { VStack, ScrollView, Spinner } from 'native-base';
import { DrawerList } from '../Workspace';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import HistoryItem from './HistoryItem';
import { useHistory } from '../../../api/useHistory';
import { ScreenContainer } from '../../../components';
import { useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';

type HistoryProps = {
    navigation: DrawerNavigationProp<DrawerList, 'History'>;
};

const History: React.FC<HistoryProps> = ({ navigation }) => {
    const { data, isLoading, refetch } = useHistory();
    const [refreshing, setRefreshing] = useState(false);

    const handlePressHistoryItem = (chatId: number, name: string) => {
        navigation.navigate('Chat', { chatId, name });
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            refetch();
        } finally {
            setRefreshing(false);
        }
    }, []);

    return (
        <ScreenContainer>
            <ScrollView
                flex={1}
                p={4}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {!isLoading ? (
                    <VStack space={4} pb={8}>
                        {data?.map((item, index) => (
                            <HistoryItem
                                key={index}
                                chatId={item.chatId}
                                label={item.name}
                                onPress={handlePressHistoryItem}
                            />
                        ))}
                    </VStack>
                ) : (
                    <Spinner />
                )}
            </ScrollView>
        </ScreenContainer>
    );
};

export default History;
