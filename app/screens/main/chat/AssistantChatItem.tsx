import { View, Text, Box, HStack } from 'native-base';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { User, Message } from '../../../model';

interface ChatIAssistantProps {
    text?: string;
    date?: string;
}

const AssistantChatItem = ({ text, date }: ChatIAssistantProps) => {
    return (
        <View flex={1} p={2}>
            <Box>
                <HStack alignItems="center" space={3}>
                    <Box
                        p="10px"
                        alignSelf="center"
                        bgColor="blueGray.600"
                        borderRadius="full"
                    >
                        <MaterialCommunityIcons
                            name="robot-outline"
                            size={24}
                            color="white"
                        />
                    </Box>
                    <Text fontSize={16} fontWeight={500}>
                        AI Doctor
                    </Text>
                </HStack>
            </Box>
            <Box pl="50px" mt="5px">
                <Text>{text || 'No Message'}</Text>
            </Box>
        </View>
    );
};

export default AssistantChatItem;
