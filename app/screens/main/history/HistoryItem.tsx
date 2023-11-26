import { Box, Text, HStack, Pressable } from 'native-base';
import { DrawerList } from '../Workspace';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useCallback } from 'react';

interface HistoryItemProps {
    chatId: number;
    label: string;
    onHistoryItemPress: (chatId: number, name: string) => void;
}

const HistoryItem = ({
    chatId,
    label,
    onHistoryItemPress,
}: HistoryItemProps) => {
    const handlePressHistoryItem = useCallback(() => {
        onHistoryItemPress(chatId, label);
    }, []);

    return (
        <Pressable
            py="5"
            px="5"
            bgColor="gray.200"
            borderRadius="8px"
            onPress={handlePressHistoryItem}
        >
            <HStack space="5" alignItems="center">
                <Text>{label}</Text>
            </HStack>
        </Pressable>
    );
};

export default HistoryItem;
