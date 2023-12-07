import React, { useState } from 'react';
import { View, Modal, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
// This is the login screen contains the login modal
export default function LoginScreen({ showLogin, setShowLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
// Login with email and password
    const handleLogin = () => {
        signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then((userCredential) => {
                // Login successful
                setShowLogin(false); // Hide login modal
            })
            .catch((error) => {
                console.error(error);
            });
    };
// Create a new account with email and password
    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then((userCredential) => {
                // account creation is successful
                setShowLogin(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };
// Styles for the login with buttons
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showLogin}
            onRequestClose={() => setShowLogin(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                    <Button title="Login" onPress={handleLogin} color="#ff5a5f" />
                    <Button title="Create Account" onPress={handleCreateAccount} color="#ff5a5f" />
                    {/* Dummy buttons with icons */}
                    <TouchableOpacity style={styles.iconButton}>
                        <MaterialCommunityIcons name="cellphone" size={24} color="black" />
                        <Text style={styles.iconButtonText}>Continue with Phone</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="logo-apple" size={24} color="black" />
                        <Text style={styles.iconButtonText}>Continue with Apple</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <AntDesign name="google" size={24} color="black" />
                        <Text style={styles.iconButtonText}>Continue with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <FontAwesome name="facebook" size={24} color="black" />
                        <Text style={styles.iconButtonText}>Continue with Facebook</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: 200,
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 5,
        borderRadius: 5,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconButtonText: {
        marginLeft: 10,
        fontSize: 16,
    },
});
