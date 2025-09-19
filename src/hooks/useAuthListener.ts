import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuthStore } from '../store/authStore';
import { getUserDocument, createUserDocument } from '../services/userService';

export const useAuthListener = () => {
    const { setUser, setLoading } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);

            if (firebaseUser) {
                try {
                    let userDoc = await getUserDocument(firebaseUser.uid);

                    if (!userDoc) {
                        userDoc = await createUserDocument({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email || '',
                            displayName: firebaseUser.displayName || ''
                        });
                    }

                    setUser(userDoc);
                } catch (error) {
                    console.error('Error fetching user document:', error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [setUser, setLoading]);
};