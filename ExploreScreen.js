import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
} from 'react-native';

// Categories for the horizontal ScrollView
const categories = [
    { name: 'Tiny homes', icon: 'home' },
    { name: 'Cabins', icon: 'house-siding' },
    { name: 'Trending', icon: 'local-fire-department' },
    { name: 'Play', icon: 'videogame-asset' },
    { name: 'City', icon: 'apartment' },
    { name: 'Beachfront', icon: 'beach-access' },
    { name: 'Countryside', icon: 'nature-people' },
];


// Houses for the FlatList Hard coded list of houses
const houses = [
    {
        id: '1',
        title: 'Room with big terrace & private bath',
        type: 'Private room',
        host: 'Bob',
        price: 45,
        rating: 4.8,
        image: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        rooms: '2 guests · 1 bedroom · 1 bed · 1 private bath',
        description: '\n' +
            'Discover a charming and unique Airbnb property nestled in the heart of a tranquil forest, where you can escape the hustle and bustle of everyday life. This cozy cabin boasts rustic elegance and modern amenities, offering a serene retreat for nature enthusiasts. With its secluded location, outdoor hot tub, and stunning views, it\'s the perfect place to unwind and reconnect with the great outdoors.'
    },
    {
        id: '2',
        title: 'Seaside Villa with Panoramic Views',
        type: 'Entire villa',
        host: 'Alice',
        price: 120,
        rating: 4.9,
        image: 'https://hips.hearstapps.com/hmg-prod/images/cayman-islands-villa-kempa-kai-2020-021-1616076929.jpg',
        rooms: '6 guests · 3 bedrooms · 3 beds · 2 baths',
        description: '\n' +
            'Experience the ultimate beachfront vacation in this luxurious seaside villa. Wake up to the sound of waves crashing and enjoy breathtaking panoramic views of the ocean from your private terrace. This spacious villa offers all the comforts of home, including a fully equipped kitchen and a large living area. Relax by the infinity pool or take a stroll on the sandy beach just steps away.'
    },
    {
        id: '3',
        title: 'Cozy Mountain Cabin with Fireplace',
        type: 'Entire cabin',
        host: 'Charlie',
        price: 75,
        rating: 4.7,
        image: 'https://l.icdbcdn.com/oh/60907f50-c4d6-4044-9422-b536a7fdabfa.jpg?w=2080',
        rooms: '4 guests · 2 bedrooms · 2 beds · 1 bath',
        description: '\n' +
            'Escape to the mountains and unwind in this cozy cabin nestled among the pine trees. Cozy up by the fireplace with a cup of hot cocoa or venture outside for hiking and nature exploration. The cabin features a well-appointed kitchen, comfortable bedrooms, and a peaceful outdoor deck. It\'s the perfect retreat for a romantic getaway or a family adventure.'
    }

];


const ExploreScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (  //rendering the list of houses and their details
        <TouchableOpacity onPress={() => navigation.navigate('Listing', { house: item })}>
            <Image source={{ uri: item.image }} style={styles.houseImage} />
            <Text style={styles.houseTitle}>{item.title}</Text>
            <Text style={styles.houseType}>{item.type}</Text>
            <Text style={styles.housePrice}>${item.price}</Text>
            {/*
    <Text style={styles.houseRating}>{item.rating}</Text>
    <Text style={styles.houseHost}>{item.host}</Text>
    */}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Where to?"
                />
            </View>
            {/* Horizontal ScrollView for categories with Icons */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScrollView}
            >
                {categories.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.categoryButton}>
                        <MaterialIcons name={category.icon} size={24} color="black" />
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {/* List of Houses */}
            <FlatList
                data={houses}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    searchContainer: {
        backgroundColor: '#f2f2f2',
        padding: 10,
    },
    searchBar: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        fontSize: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    categoryScrollView: {
        paddingVertical: 10,
    },
    categoryButton: {
        marginRight: 10,
        paddingHorizontal: 15, // Padding on the left and right
        paddingVertical: 1, // Further reduced padding on the top and bottom
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        alignItems: 'center', // Ensures icon and text are centered vertically
        justifyContent: 'center', // Ensures icon and text are centered horizontally
        flexDirection: 'row', // Ensures the layout is horizontal
        // Consider adding a height if the buttons should be a specific size
        // height: 40, // Adjust accordingly
    },
    categoryText: {
        // Reduce the font size if necessary
        fontSize: 14,
    },

    houseImage: {
        paddingVertical: 20,
        width: '100%',
        height: 200,
    },
    houseTitle: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    // ... other styles
});

export default ExploreScreen;
