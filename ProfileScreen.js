// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import LoginScreen from './LoginScreen'; // Import LoginScreen component
import { FIREBASE_AUTH } from './FirebaseConfig';
import { signOut, updateProfile } from 'firebase/auth';

export default function ProfileScreen() {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState('');
// The useEffect hook is used to run code when the component mounts
    useEffect(() => {
        const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
            if (user) {
                setUser({
                    displayName: user.displayName || 'User',
                    email: user.email,
                    photoURL: user.photoURL,
                    creationTime: user.metadata.creationTime,
                });
                setShowLogin(false);
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);
//Log out the user
    const handleLogout = () => {
        signOut(FIREBASE_AUTH).catch((error) => {
            console.error('Logout error:', error);
        });
    };
// Update the user's display name
    const handleNameChange = (text) => {
        setNewDisplayName(text);
    };
// Update the user's display name
    const handleNameUpdate = () => {
        if (user && newDisplayName.trim()) {
            updateProfile(FIREBASE_AUTH.currentUser, {
                displayName: newDisplayName.trim(),
            })
                .then(() => {
                    setUser({
                        ...user,
                        displayName: newDisplayName.trim(),
                    });
                    setIsEditing(false);
                })
                .catch((error) => {
                    console.error('Error updating display name:', error);
                });
        }
    };
//Styles info and buttons
    return (
        <View style={styles.container}>
            {!user ? (
                <View>
                    <Button title="Log In" onPress={() => setShowLogin(true)} color="#ff5a5f" />
                    <LoginScreen showLogin={showLogin} setShowLogin={setShowLogin} />
                </View>
            ) : (
                <View style={styles.profileInfo}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: user.photoURL || 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcT0jmYBa52Y96cOgIzS9QynoteSMxmXcq-ghDJF08BJBNA_PP3GuDMKbM40tvNsBAVcPkU0PBElH3ghtcd6690' }}
                    />
                    {isEditing ? (
                        <TextInput
                            style={styles.input}
                            onChangeText={handleNameChange}
                            value={newDisplayName}
                            autoFocus={true}
                            onBlur={handleNameUpdate}  // When the text input loses focus
                        />
                    ) : (
                        <TouchableOpacity onPress={() => {
                            setNewDisplayName(user.displayName);
                            setIsEditing(true);
                        }}>
                            <Text style={styles.userName}>{user.displayName}</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <Text style={styles.userCreationTime}>{`Since ${new Date(user.creationTime).toLocaleDateString()}`}</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    profileInfo: {
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'gray', // Temporary background color
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 8,
    },
    userEmail: {
        fontSize: 16,
        color: 'gray',
        marginTop: 4,
    },
    userCreationTime: {
        fontSize: 14,
        color: 'gray',
        marginTop: 4,
    },
    logoutButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#ff5a5f',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});
