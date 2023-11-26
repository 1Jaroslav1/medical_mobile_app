import React from 'react';
import { Text, HStack, Pressable } from 'native-base';

interface DrawerItemProps {
    label?:
        | string
        | ((props: { color: string; focused: boolean }) => React.ReactNode)
        | undefined;
    onPress: () => void;
    icon?: (props: {
        focused: boolean;
        color: string;
        size: number;
    }) => React.ReactNode;
    isFocused?: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = ({
    label,
    onPress,
    icon,
    isFocused,
}) => {
    const renderLabel = () => {
        if (typeof label === 'function') {
            return label({ color: 'white', focused: isFocused || false });
        } else {
            return (
                <Text color="white" fontSize="md">
                    {label}
                </Text>
            );
        }
    };

    return (
        <Pressable
            onPress={onPress}
            py="5"
            px="5"
            bgColor={isFocused ? 'gray.700' : 'transparent'}
            m="10px"
            borderRadius="8px"
        >
            <HStack space="5" alignItems="center">
                {icon && icon({ focused: false, color: 'white', size: 24 })}
                {renderLabel()}
            </HStack>
        </Pressable>
    );
};

export default DrawerItem;
