import {TextInputMask} from 'react-native-masked-text';

import styled from 'styled-components/native';

//screen type
export const Container = styled.SafeAreaView`
  flex: 1;

  width: 100%;
  align-items: center;
  background: ${({ theme }) => theme.colors.yellow_dark};
  /* padding: 32px 16px; */
`;

export const Background = styled.Image`
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const Title = styled.Text`
  text-align: center;
  text-transform: uppercase;
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.blue_dark};
  margin-bottom: 16px;
`;

export const Subtitle = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};

  margin-bottom: 16px;
`;

export const Card = styled.TouchableOpacity`
  max-width: 148px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8px;
  border-radius: 8px;

  margin: 32px 16px;
`;

export const Paragraph = styled.Text`
  margin: 8px 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black_dark};
`

export const ButtonType = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: bold;

  padding: 16px 24px;

  background: ${({ theme }) => theme.colors.blue_light};
  border-radius: 32px;
`;

// screen motoboy
export const RegisterMotoboy = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow_dark};

  padding: 32px 16px;
`;

export const InputMasked = styled(TextInputMask)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  color:  ${({ theme }) => theme.colors.black_dark};
  padding: 12px 24px;
  border-radius: 32px;
  margin-bottom: 16px;
`;

// screen payment
export const HeaderPayment = styled.View`
  width: 100%;
  padding: 16px;
`;

export const TitlePayment = styled.Text`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 8px;
`;

export const SubtitlePayment = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};

  margin-bottom: 16px;
`;

export const ContainerCreditCard = styled.View`
  width: 100%;
  padding: 0 16px;
`;

export const ButtonPayment = styled.Text`
  width: 100%;
  text-align: center;

  padding: 16px 24px;
  border-radius: 32px;

  color: $${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.success_100};

  margin-top: 32px;

  font-weight: 800;
`;
