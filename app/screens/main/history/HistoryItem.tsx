import { Text, HStack, Pressable } from 'native-base';
import { useCallback } from 'react';

interface HistoryItemProps {
    chatId: number;
    label: string;
    onPress: (chatId: number, name: string) => void;
}

const HistoryItem = ({ chatId, label, onPress }: HistoryItemProps) => {
    const handlePressHistoryItem = useCallback(() => {
        onPress(chatId, label);
    }, []);

    return (
        <Pressable
            py="5"
            px="5"
            bgColor="gray.200"
            borderWidth="2px"
            borderColor="gray.400"
            borderRadius="5px"
            onPress={handlePressHistoryItem}
        >
            <HStack space="5" alignItems="center">
                <Text>{label}</Text>
            </HStack>
        </Pressable>
    );
};

export default HistoryItem;
