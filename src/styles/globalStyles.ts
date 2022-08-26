import styled from "styled-components/native";
import MapView from "react-native-maps";

interface Props {
  direction?: string;
  align?: string;
  justify?: string;

  color?: string;

  padding?: number;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}

export const Box = styled.View<Props>`
  flex: 1;
  flex-direction: ${({ direction }) => direction || "column"};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};

  padding: ${({ padding }) => (padding ? padding + "px" : "0")};

  margin-top: ${({ marginTop }) => marginTop || "0"};
  margin-bottom: ${({ marginBottom }) => marginBottom || "0"};
  margin-left: ${({ marginLeft }) => marginLeft || "0"};
  margin-right: ${({ marginRight }) => marginRight || "0"};

  background: ${({ color }) => (color ? color : "transparent")};
`;
export const Flex = styled.View<Props>`
  width: 100%;
  flex-direction: ${({ direction }) => direction || "row"};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};

  padding: ${({ padding }) => (padding ? padding + "px" : "0")};

  margin-top: ${({ marginTop }) => marginTop || "0"};
  margin-bottom: ${({ marginBottom }) => marginBottom || "0"};
  margin-left: ${({ marginLeft }) => marginLeft || "0"};
  margin-right: ${({ marginRight }) => marginRight || "0"};

  background: ${({ color }) => (color ? color : "transparent")};
`;

interface TextProps {
  family?: string;
  size?: string;
  align?: string;
  color?: string;
}

export const TextBold = styled.Text<TextProps>`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.bold};

  color: ${({ color, theme }) => (color ? color : theme.colors.black_dark)};

  font-size: ${({ size }) => (size ? `${size}px` : "16px")};
  text-align: ${({ align }) => (align ? align : "left")};
`;

export const TextMedium = styled.Text<TextProps>`
  width: 100%;

  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ color, theme }) => (color ? color : theme.colors.black_dark)};

  font-size: ${({ size }) => (size ? `${size}px` : "16px")};
  text-align: ${({ align }) => (align ? align : "left")};
`;

export const TextRegular = styled.Text<TextProps>`
  width: 100%;

  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ color, theme }) => (color ? color : theme.colors.black_dark)};
  font-size: ${({ size }) => (size ? `${size}px` : "16px")};
  text-align: ${({ align }) => (align ? align : "left")};
`;

export const TextThin = styled.Text<TextProps>`
  width: 100%;

  font-family: ${({ theme }) => theme.fonts.thin};

  color: ${({ color, theme }) => (color ? color : theme.colors.black_dark)};
  font-size: ${({ size }) => (size ? `${size}px` : "16px")};
  text-align: ${({ align }) => (align ? align : "left")};
`;

export const Map = styled(MapView)`
  flex: 1;
  width: 100%;
  height: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
`;

interface BulletProps {
  align?: string;
  weight?: string;
  disabled?: boolean;
  color?: string;
  fSize?: string;
}

export const Bullet = styled.View<BulletProps>`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${({ color }) => (color ? color : "gray")};
`;

export const ButtonSuccess = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.success_100};
  padding: 8px 16px;

  border-radius: 16px;
`;

export const ButtonCancel = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.danger_100};
  padding: 8px 16px;

  border-radius: 16px;
`;
