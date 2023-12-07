import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';
import ExploreScreen from './ExploreScreen';
import TripsScreen from './TripsScreen';
import WishlistScreen from './WishlistScreen';
import InboxScreen from './InboxScreen';
import ListingScreen from './ListingScreen';

const Tab = createBottomTabNavigator();

//Icons for the tab bar
const ICONS = {
    Explore: { focused: 'ios-search', unfocused: 'ios-search-outline' },
    Wishlist: { focused: 'heart', unfocused: 'heart-outline' },
    Trips: { focused: 'airplane', unfocused: 'airplane-outline' },
    Inbox: { focused: 'mail', unfocused: 'mail-outline' },
    Profile: { focused: 'person', unfocused: 'person-outline' },
};
//This is the navigation bar at the bottom of the app
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        const { focused: focusedIcon, unfocused: unfocusedIcon } = ICONS[route.name];
                        const iconName = focused ? focusedIcon : unfocusedIcon;
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Explore" component={ExploreScreen} />
                <Tab.Screen name="Wishlist" component={WishlistScreen} />
                <Tab.Screen name="Trips" component={TripsScreen} />
                <Tab.Screen name="Inbox" component={InboxScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen
                    name="Listing"
                    component={ListingScreen}
                    options={{ tabBarButton: () => null }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
