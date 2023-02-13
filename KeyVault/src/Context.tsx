import { useState, createContext } from "react";
import { UserForHome } from "./data/UserSecrets";

type ContextComponentType = {
    loggedInUser: UserForHome | null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<UserForHome | null>>;
  }
  
export const ContextComponent = createContext<ContextComponentType | null>(null);

export const ContextComponentProvider = ({ children }: any) => {
    const [ loggedInUser, setLoggedInUser] = useState<UserForHome | null>(null);

    return (
        <ContextComponent.Provider value={ { loggedInUser, setLoggedInUser } }>
          {children}
        </ContextComponent.Provider>
    );
}