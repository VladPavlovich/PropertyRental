import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import { doc, setDoc, collection } from 'firebase/firestore';
//Listing screen that displays the house details
const ListingScreen = ({ route, navigation }) => {
    const { house } = route.params;

    const handleReserve = async () => {
        const userUID = FIREBASE_AUTH.currentUser.uid;
        const reservationRef = doc(collection(FIREBASE_DB, 'reservations'));
// Store the reservation in the database
        try {
            await setDoc(reservationRef, {
                userUID, // Store the user's UID with the reservation
                houseId: house.id, // Store the house id
                houseTitle: house.title, // Store the house title
                houseImage: house.image, // Store the house image
                housePrice: house.price, // Store the house price
                houseDescription: house.description, // Store the house description
                houseHost: house.host, // Store the house host
            });

            navigation.navigate('Trips');
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };
//Listing screen that displays the house details
    return (
        <View style={styles.container}>
            <Image source={{ uri: house.image }} style={styles.houseImage} />
            <Text style={styles.title}>{house.title}</Text>
            <Text style={styles.host}>Hosted by {house.host}</Text>
            <Text style={styles.rooms}>{house.rooms}</Text>
            <Text style={styles.description}>{house.description}</Text>
            <Text style={styles.details}>{`${house.type} - $${house.price}`}</Text>

            <Button title="Reserve" onPress={handleReserve} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    houseImage: {
        width: '100%',
        height: 300,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    host: {
        fontSize: 18,
        marginTop: 5,
        fontStyle: 'italic',
    },
    description: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'justify',
        padding: 10,
    },
    details: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 5,
    },
    // Add any additional styles you need
});

export default ListingScreen;
