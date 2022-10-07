// react imports
import React, { useState, createContext, useContext, useEffect } from "react";

// custom imports
import UserHandler from "../api/UserHandler";
import { IReturn } from "../api/structs/index";

interface IAuthProviderProps {
   children?: React.ReactNode;
}

interface IAuth {
   authed: boolean,
   loading: number,
   isAdmin: boolean,
}

// Create the context 
const AuthContext = createContext<IAuth>({authed: false, loading: 0, isAdmin: false});

export const AuthProvider = ({ children } : IAuthProviderProps) => {
   const [authed, setAuthed] = useState<boolean>(false);
   // Store new value to indicate the call has not finished. Default to true
   const [loading, setLoading] = useState<number>(0);

   const [isAdmin, setIsAdmin] = useState<boolean>(false);

   // Runs once when the component first mounts
   useEffect(() => {
      if (loading === 0) {
         UserHandler.isLoggedin()
         .then((response: IReturn) => {
            setAuthed(response.status === "Success");
            setLoading(1);
         });
      }
      if (loading === 1) {
        UserHandler.isAdmin()
        .then((response: IReturn) => {
            setIsAdmin(response.body);
            setLoading(2);
        });
      }
   }, [loading]);

  return (
      // Expose the new `loading` value so we can consume it in `App.tsx`
      <AuthContext.Provider
         value={{ 
            authed: authed, 
            loading: loading,
            isAdmin: isAdmin,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

// Finally creating the custom hook 
export const useAuth = () => useContext(AuthContext);
