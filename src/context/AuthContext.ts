// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { auth } from '../firebase';
// import { GithubAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';

// interface AuthContextType {
//   user: User | null;
//   githubSignIn: () => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);
// \
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthContextProvider');
//   }
//   return context;
// };

// export const AuthContextProvider: React.FC = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   const githubSignIn = async () => {
//     const provider = new GithubAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//     } catch (error) {
//       console.error('GitHub sign-in error:', error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Logout error:', error);
//       throw error;
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, githubSignIn, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

