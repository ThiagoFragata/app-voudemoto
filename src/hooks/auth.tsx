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
import { userStorageKey } from "../utils/keys";
import { api } from "../services/axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface UserProps {
  uId?: string;
  gId: string;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated?: boolean;
  userType?: string;
  socketId?: string;
}

interface AuthContextData {
  userStorageLoading: boolean;

  avatar: string;

  user: UserProps;
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

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [avatar, setAvatar] = useState("");
  const [refetch, setRefetch] = useState(true);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function loadUser() {
    const asyncUser = await AsyncStorage.getItem(userStorageKey);

    if (asyncUser) {
      const userInfo = JSON.parse(asyncUser);
      setUser(userInfo);
      setUserStorageLoading(false);
    }
  }
  useEffect(() => {
    loadUser();
  }, []);

  async function checkLogin() {
    try {
      const asyncUser = await AsyncStorage.getItem(userStorageKey);
      const userInfo = JSON.parse(asyncUser);

      if (userInfo?.email) {
        const { data } = await api.post("/check-user", {
          email: userInfo.email,
        });

        setUser({
          uId: data.user?._id,
          gId: data.user.gId,
          name: data.user.nome,
          email: data.user.email,
          avatar: data.user.avatar,
          userType: data.user.tipo,
          isAuthenticated: true,
        });

        setRefetch(false);
      } else {
        throw new Error(
          "Error ao conectar na conta do google, você ainda fez seu cadastro ou não está logado com sua conta!"
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    checkLogin();
  }, [refetch]);

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

        setAvatar(userInfo.picture);
        const loadedUser: UserProps = {
          gId: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          avatar: userInfo.picture,
        };

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(loadedUser));
        setUser(loadedUser);

        checkLogin();
        setRefetch(false);
      }
    } catch (err) {
      throw new Error("Error message API =>", err);
    }
  }

  const signOut = async () => {
    await AsyncStorage.removeItem(userStorageKey);
    setUser({
      isAuthenticated: false,
    } as UserProps);
  };

  const value = useMemo(
    () => ({
      user,
      avatar,
      setUser,
      userStorageLoading,
      signInWithGoogle,
      signOut,
    }),
    [user, userStorageLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
