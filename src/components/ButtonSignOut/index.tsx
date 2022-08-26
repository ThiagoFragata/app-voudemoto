import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { useAuth } from "../../hooks/auth";

export function ButtonSignOut() {
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();
  return (
    <Button top={`${insets.top}`}>
      <TouchableOpacity onPress={signOut}>
        <TextButton>Sair</TextButton>
      </TouchableOpacity>
    </Button>
  );
}

interface ButtonProps {
  top: string;
  right: string;
}

export const Button = styled.View<ButtonProps>`
  position: absolute;

  border-radius: 8px;

  top: ${({ top }) => (top ? top * 1.4 + "px" : 0)};
  right: 16px;

  z-index: 100;

  padding: 8px 16px;

  background-color: ${({ theme }) => theme.colors.danger_100};
`;

export const TextButton = styled.Text`
  color: ${({ theme }) => theme.colors.white}; ;
`;
