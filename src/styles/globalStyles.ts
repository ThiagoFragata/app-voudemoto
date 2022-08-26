import styled from "styled-components/native";
import MapView from "react-native-maps";

interface BoxProps {
  align?: string;
  justify?: string;
  color?: string;
}

interface TextProps {
  family?: string;
  size?: string;
  align?: string;
  color?: string;
}

interface Props {
  align?: string;
  weight?: string;
  disabled?: boolean;
  color?: string;
  fSize?: string;
}

export const Box = styled.View<BoxProps>`
  border: 1px solid red;
  flex: 1;
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};

  background: ${({ color, theme }) =>
    color ? theme.colors.secondary_dark : "transparent"};
`;

export const TextBold = styled.Text<TextProps>`
  font-family: ${({ theme }) => theme.fonts.bold};

  color: ${({ color, theme }) => (color ? color : theme.colors.black_dark)};

  font-size: ${({ size }) => (size ? `${size}px` : "16px")};
  text-align: ${({ align }) => (align ? align : "center")};
`;

export const TextMedium = styled.Text<TextProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ color, theme }) => (color ? color : theme.colors.black_dark)};

  font-size: ${({ size }) => (size ? `${size}px` : "16px")};
  text-align: ${({ align }) => (align ? align : "center")};
`;

export const TextRegular = styled.Text<TextProps>`
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ color, theme }) => (color ? color : theme.colors.black_dark)};
  font-size: ${({ size }) => (size ? `${size}px` : "16px")};
  text-align: ${({ align }) => (align ? align : "center")};
`;

export const TextThin = styled.Text<TextProps>`
  font-family: ${({ theme }) => theme.fonts.thin};

  color: ${({ color, theme }) => (color ? color : theme.colors.black_dark)};
  font-size: ${({ size }) => (size ? `${size}px` : "16px")};
  text-align: ${({ align }) => (align ? align : "center")};
`;

export const Map = styled(MapView)`
  flex: 1;
  width: 100%;
  height: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
`;

export const Bullet = styled.View<Props>`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${({ color }) => (color ? color : "gray")};
`;
