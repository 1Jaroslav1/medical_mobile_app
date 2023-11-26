import { View, Text, Box, HStack } from 'native-base';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { User } from '../../../model';

interface UserChatItemProps {
    user?: User;
    text?: string;
    date?: string;
}

const UserChatItem = ({ text, date, user }: UserChatItemProps) => {
    return (
        <View flex={1} p={2}>
            <Box>
                <HStack alignItems="center" space={3}>
                    <Box
                        p="10px"
                        alignSelf="center"
                        bgColor="primary.600"
                        borderRadius="full"
                    >
                        <Feather name="user" size={24} color="white" />
                    </Box>
                    <Text fontSize={16} fontWeight={500}>
                        {user ? user.name : 'User'}
                    </Text>
                </HStack>
            </Box>
            <Box pl="50px" mt="5px">
                <Text>{text || 'No message'}</Text>
            </Box>
        </View>
    );
};

export default UserChatItem;
