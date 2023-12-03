import { Text, Box, HStack } from 'native-base';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { User } from '../../../model';

interface UserChatItemProps {
    user?: User;
    text?: string;
    date?: string;
}

// box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
const UserChatItem = ({ text, date, user }: UserChatItemProps) => {
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
                        bgColor="primaryBlue.400"
                        borderRadius="full"
                        shadow="5"
                    >
                        <Feather name="user" size={20} color="white" />
                    </Box>
                    <Text fontSize={16} fontWeight={500}>
                        {user ? user.name : 'User'}
                    </Text>
                </HStack>
            </Box>
            <Box pl="44px" mt="5px">
                <Text>{text || 'No message'}</Text>
            </Box>
        </Box>
    );
};

export default UserChatItem;
