import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FIREBASE_DB, FIREBASE_AUTH } from './FirebaseConfig';
import { query, collection, where, getDocs } from 'firebase/firestore';
// This is the Trips screen that displays the user's reservations
const TripsScreen = () => {
    const [reservations, setReservations] = useState([]);
// Fetch the user's reservations from the database
    const fetchReservations = useCallback(async () => {
        const userUID = FIREBASE_AUTH.currentUser.uid;
        const q = query(collection(FIREBASE_DB, 'reservations'), where('userUID', '==', userUID));

        try {
            const querySnapshot = await getDocs(q);
            const reservationsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReservations(reservationsList);
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    }, []);
// The useFocusEffect hook is used to run code when the screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchReservations();
        }, [fetchReservations])
    );
//rendering th reservations list and details
    const renderItem = ({ item }) => {
        return (
            <View style={styles.listing}>
                <Image source={{ uri: item.houseImage }} style={styles.houseImage} />
                <Text style={styles.title}>{item.houseTitle}</Text>
                <Text style={styles.host}>Hosted by {item.houseHost}</Text>
                {/* Add other details from the reservation you want to display */}
            </View>
        );
    };

    return (
        <FlatList
            data={reservations}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    );
};

const styles = StyleSheet.create({
    listing: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    host: {
        fontSize: 16,
    },
    houseImage: {
        width: '100%',
        height: 200,
    },
});

export default TripsScreen;
