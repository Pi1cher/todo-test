import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { User } from '../types/todo';

export const createUserDocument = async (user: {
    uid: string;
    email: string;
    displayName?: string;
}) => {
    const userDoc = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        createdAt: new Date()
    };

    await setDoc(doc(db, 'users', user.uid), userDoc);
    return userDoc;
};

export const getUserDocument = async (uid: string): Promise<User | null> => {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        return {
            ...data,
            createdAt: data.createdAt.toDate()
        } as User;
    }

    return null;
};

export const updateUserDisplayName = async (uid: string, displayName: string) => {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, { displayName });
};