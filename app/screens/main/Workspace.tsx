import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Chat';
import Drawer from './Drawer';
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export type DrawerList = {
    Chat: undefined;
    History: undefined;
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
            }}
        >
            <NDrawer.Screen
                name="Chat"
                component={Home}
                options={{
                    drawerLabel: 'New Chat',
                    drawerIcon: () => (
                        <AntDesign name="plus" size={24} color="white" />
                    ),
                }}
            />
        </NDrawer.Navigator>
    );
};

export default Workspace;
