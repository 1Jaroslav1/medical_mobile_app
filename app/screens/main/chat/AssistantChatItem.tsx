import { Image, View, Text, Box, HStack } from 'native-base';
import React from 'react';

const DoctorIcon = require('../../../../assets/img/doctor.png');

interface ChatIAssistantProps {
    text?: string;
    date?: string;
}

const AssistantChatItem = ({ text, date }: ChatIAssistantProps) => {
    return (
        <Box
            flex={1}
            p={2}
            borderWidth="2px"
            borderColor="gray.400"
            borderRadius="5px"
            bgColor="gray.200"
        >
            <Box>
                <HStack alignItems="center" space={3}>
                    <Box
                        p="5px"
                        alignSelf="center"
                        bgColor="blueGray.600"
                        borderRadius="full"
                    >
                        <Image
                            source={DoctorIcon}
                            alt="Alternate Text"
                            size={5}
                        />
                    </Box>
                    <Text fontSize={16} fontWeight={500}>
                        AI Doctor
                    </Text>
                </HStack>
            </Box>
            <Box pl="44px" mt="5px">
                <Text>{text || 'No Message'}</Text>
            </Box>
        </Box>
    );
};

export default AssistantChatItem;
