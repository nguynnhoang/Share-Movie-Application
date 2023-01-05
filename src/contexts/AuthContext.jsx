import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createContext, useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import { auth, facebookProvider, googleProvider, storage } from "../lib/firebase";

// Khi tạo context thì tạo bên ngoài components. Còn nếu use ví dụ như useContext, useState thì phải bỏ vào trong component
export const AuthContext = createContext({
    currentUser: null,
    login: () => { },
    logout: () => { },
    register: () => { },
    updateProfile: () => { },
    uploadAvatarToStorage: () => { },
})

// Tạo provider để chia sẻ state với nhau

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const uploadAvatarToStorage = async (file) => {
        const storageRef = ref(storage, `avatar/${currentUser.email}`);
        const snapshot = await uploadBytes(storageRef, file);
        return snapshot;
    }

    const updateProfileCurrentUser = async (displayName, photo) => {
        // Bước 1: Upload photo lên
        const { ref } = await uploadAvatarToStorage(photo);

        // Bước 2: Lấy photoUrl
        const photoURL = await getDownloadURL(ref);

        // Bước 3: Lấy displayName và photoUrl update profile
        await updateProfile(auth.currentUser, {
            displayName,
            photoURL: photoURL
        });

        // Bước 4: Set lại currentUser
        setCurrentUser((prev) => ({
            ...prev,
            displayName,
            photoURL
        }))
    }

    const register = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);

    }

    const login = async (type, email, password) => {
        switch (type) {
            case 'google': await signInWithPopup(auth, googleProvider);
                break;
            case 'facebook': await signInWithPopup(auth, facebookProvider);
                break;
            default: await signInWithEmailAndPassword(auth, email, password);
                break;
        }
    }

    const logout = async () => {
        await signOut(auth);
    }

    const value = {
        currentUser,
        login,
        logout,
        register,
        updateProfile: updateProfileCurrentUser,
        uploadAvatarToStorage
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            }
            else {
                setCurrentUser(null);
            }
            setLoading(false);
        })
    }, []);
    console.log(currentUser);


    return <AuthContext.Provider value={value}>
        {!loading ? children : <Spinner />}
    </AuthContext.Provider>
}

export default AuthProvider;