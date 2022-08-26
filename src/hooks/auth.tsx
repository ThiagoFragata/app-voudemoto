import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { createContext } from "react";

import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
  children: ReactNode;
}

interface UserProps {
  isAuthenticated: boolean;
  id: string;
  name: string;
  email: string;
  avatar?: string;
  model?: string;
  color?: string;
  plate?: string;
  type?: string;
  key?: string;
  userType?: string;
}

interface AuthContextData {
  user: UserProps;
  userStorageLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;

  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext({} as AuthContextData);
export const userStorageKey = "@voudemoto:user";

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const asyncUser = await AsyncStorage.getItem(userStorageKey);

      if (asyncUser) setUser(JSON.parse(asyncUser));

      setUserStorageLoading(false);
    }

    loadUser();
  }, []);

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        const loadedUser: UserProps = {
          userType: "",
          isAuthenticated: false,
          id: String(userInfo.id),
          name: userInfo.given_name,
          email: userInfo.email,
          avatar: userInfo.picture,
        };

        setUser(loadedUser);
        // await AsyncStorage.setItem(userStorageKey, JSON.stringify(loadedUser));
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  const signOut = async () => {
    setUser({
      isAuthenticated: false,
    } as UserProps);
    await AsyncStorage.removeItem(userStorageKey);
  };

  const value = useMemo(
    () => ({ user, setUser, userStorageLoading, signInWithGoogle, signOut }),
    [user, userStorageLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
