import React from "react";
import { Image } from "react-native";

import { RectButtonProps } from "react-native-gesture-handler";

import { ButtonSign, ImageButton, TextButton } from "./styles";

interface Props extends RectButtonProps {
  title: string;
  icon: any;
}

export function ButtonSignIn({ title, icon, ...rest }: Props) {
  return (
    <ButtonSign {...rest}>
      <ImageButton>
        <Image source={icon} />
      </ImageButton>
      <TextButton>{title}</TextButton>
    </ButtonSign>
  );
}
