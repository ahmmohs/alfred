import {
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { firebaseAuth } from "../../firebase/clientApp";

type ContextProps = {
  googleSignIn: () => void;
  logOut: () => void;
  user: User | null;
};

const AuthContext = createContext<ContextProps>({
  googleSignIn: () => {},
  logOut: () => {},
  user: null,
});

type Props = {
  children: React.ReactElement;
};

export const AuthContextProvider = ({
  children,
}: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider);
  };

  const logOut = () => {
    signOut(firebaseAuth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
