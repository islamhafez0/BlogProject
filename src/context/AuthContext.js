import { createContext, useContext, useEffect, useState } from "react";
import { FirebaseContext } from "./FirebaseContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const { app } = useContext(FirebaseContext);
  const auth = getAuth(app);

  useEffect(() => {
    let unsubscribe = () => {};
    unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);
  console.log(auth);
  const signup = async ({ email, password, displayName }) => {
    try {
      const creds = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(creds.user, { displayName });
      console.log("creds", creds);
      setError(null);
      Swal.fire({
        icon: "success",
        title: "Signed up",
        text: "You have been successfully signed up.",
        position: "top",
        toast: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } catch (error) {
      setError(error);
    }
  };
  const login = async ({ email, password }) => {
    try {
      const creds = await signInWithEmailAndPassword(auth, email, password);
      console.log("creads", creds);
      setError(null);

      Swal.fire({
        icon: "success",
        title: "Logged in",
        text: "You have been successfully logged in.",
        position: "top",
        toast: true,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } catch (error) {
      setError(error);
    }
  };

  const logout = async () => {
    const confirmation = await Swal.fire({
      title: "Confirm Logout",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      try {
        await signOut(auth);
        setError(null);

        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out.",
          position: "top",
          toast: true,
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      } catch (error) {
        setError(null);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred during logout.",
          position: "top",
          toast: true,
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    }
  };
  console.log(user);
  return (
    <AuthContext.Provider
      value={{ signup, login, user, isAuth: !!user, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
