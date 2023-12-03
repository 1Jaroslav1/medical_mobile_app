import { createDrawerNavigator } from '@react-navigation/drawer';
import Chat from './chat/Chat';
import History from './history/History';
import Settings from './settings/Settings';
import Drawer from './drawer/Drawer';
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../shared/colors';

export type DrawerList = {
    Chat: { chatId: number | null; name: string };
    History: undefined;
    Settings: undefined;
};

const NDrawer = createDrawerNavigator<DrawerList>();

const Workspace = () => {
    return (
        <NDrawer.Navigator
            drawerContent={props => <Drawer {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: 'transparent',
                    width: Dimensions.get('window').width,
                },
                drawerActiveTintColor: 'blue',
                drawerInactiveTintColor: 'gray',
                headerStyle: {
                    backgroundColor: colors.primaryBlue_400,
                },
                headerTintColor: 'white',
            }}
        >
            <NDrawer.Screen
                name="Chat"
                component={Chat}
                initialParams={{ chatId: null }}
                options={({ route }) => ({
                    title: route.params?.name || 'New Chat',
                    drawerLabel: 'New Chat',
                    drawerIcon: () => (
                        <AntDesign name="plus" size={24} color="white" />
                    ),
                })}
            />
            <NDrawer.Screen
                name="History"
                component={History}
                options={{
                    drawerLabel: 'History',
                    drawerIcon: () => (
                        <MaterialIcons name="history" size={24} color="white" />
                    ),
                }}
            />
            <NDrawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: 'Settings',
                    drawerLabel: 'Settings',
                    drawerIcon: () => (
                        <Feather name="settings" size={24} color="white" />
                    ),
                }}
            />
        </NDrawer.Navigator>
    );
};

export default Workspace;
