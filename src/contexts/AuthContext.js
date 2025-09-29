import React, { createContext, useState, useContext, useEffect } from 'react';
import {
    auth,
} from '../firebase/config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail
} from 'firebase/auth';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signup = async (email, password, username) => {
        try {
            setAuthError(null);
            const result = await createUserWithEmailAndPassword(auth, email, password);

            if (username) {
                await updateProfile(result.user, {
                    displayName: username
                });
            }

            await signOut(auth);
            setUser(null);
            return result;
        } catch (error) {
            setAuthError(error.message);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            setAuthError(null);
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            return result;
        } catch (error) {
            setAuthError(error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            setAuthError(null);
            await signOut(auth);
            setUser(null);
        } catch (error) {
            setAuthError(error.message);
            throw error;
        }
    };

    const resetPassword = async (email) => {
        try {
            setAuthError(null);
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            setAuthError(error.message);
            throw error;
        }
    };

    const value = {
        user,
        signup,
        login,
        logout,
        resetPassword,
        authError,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
