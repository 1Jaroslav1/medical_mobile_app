import { useCallback } from 'react';
import { View, Text, Box } from 'native-base';
import {
    DrawerContentScrollView,
    DrawerContentComponentProps,
} from '@react-navigation/drawer';
import DrawerItem from './DrawerItem';
import { useAuth } from '../../../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../../../api/useUser';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
    const { state, descriptors, navigation } = props;
    const { logout } = useAuth();
    const { data: user } = useUser();
    const handleLogoutClick = useCallback(() => {
        logout!();
    }, []);
    const insets = useSafeAreaInsets();

    return (
        <View flex={1} px="5px" pt={insets.top} pb="5px">
            <View bgColor="#333333" borderRadius="10px">
                <Box
                    p="20px"
                    flexDirection="row"
                    alignItems="center"
                    alignSelf="left"
                >
                    <Feather name="user" size={40} color="white" />
                    <Box ml="10px">
                        <Text color="white" fontSize="xl">
                            {user?.name}
                        </Text>
                        <Text color="white" fontSize="md">
                            {user?.email}
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
                {state.routes.map(route => {
                    const { options } = descriptors[route.key];
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'drawerItemPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        navigation.closeDrawer();
                        if (!event.defaultPrevented) {
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
                            isFocused={false}
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
