// CustomDrawerContent.tsx
import { useCallback } from 'react';
import {
    View,
    VStack,
    HStack,
    Pressable,
    Text,
    Divider,
    Icon,
    Box,
    Image,
} from 'native-base';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerContentComponentProps,
} from '@react-navigation/drawer';
import RobotIcon from '../../images/robot.png';
import DrawerItem from './DrawerItem';
import { Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
    const { state, descriptors, navigation } = props;
    const { logout } = useAuth();
    const handleLogoutClick = useCallback(() => {
        logout!();
    }, []);

    return (
        <View flex={1} padding="5px">
            <View bgColor="#333333" borderRadius="10px">
                <Box
                    p="20px"
                    flexDirection="row"
                    alignItems="center"
                    alignSelf="left"
                >
                    <Image source={RobotIcon} alt="Alternate Text" size="xs" />
                    <Box ml="10px">
                        <Text color="white" fontSize="xl">
                            Yaroslav Harbar
                        </Text>
                        <Text color="white" fontSize="md">
                            garbar.jarek@gmail.com
                        </Text>
                    </Box>
                </Box>
            </View>
            <DrawerContentScrollView
                {...props}
                style={{
                    backgroundColor: '#333333',
                    marginVertical: 5,
                    borderRadius: 10,
                }}
            >
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;
                    const { options } = descriptors[route.key];

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'drawerItemPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        navigation.closeDrawer();
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };
                    const drawerLabel = options.drawerLabel;
                    const icon = options.drawerIcon;

                    return (
                        <DrawerItem
                            key={route.key}
                            label={drawerLabel}
                            onPress={onPress}
                            icon={icon}
                            isFocused={isFocused}
                        />
                    );
                })}
            </DrawerContentScrollView>
            <View bgColor="#333333" borderRadius="10px">
                <DrawerItem
                    label="Logout"
                    onPress={handleLogoutClick}
                    icon={() => (
                        <MaterialIcons name="logout" size={24} color="white" />
                    )}
                />
            </View>
        </View>
    );
};

export default CustomDrawerContent;
