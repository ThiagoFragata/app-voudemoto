import styled from 'styled-components/native';

export const ContainerRide = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow_dark};
`;

export const FormRide = styled.View`
  padding: 16px;
  background-color:${({ theme }) => theme.colors.yellow_dark};
`;

export const ButtonRide = styled.Text`
  width: 100%;

  padding: 16px 24px;
  border-radius: 32px;

  background-color: ${({ theme }) => theme.colors.info_100};
  color: ${({ theme }) => theme.colors.white};

  text-align: center;
  font-weight: 800;
`;

export const AddressList = styled.FlatList`
  width: 100%;
  padding: 8px 16px 0;

  background-color: ${({ theme }) => theme.colors.yellow_dark};
`;

export const AddressItem = styled.TouchableOpacity`
  padding: 5px 0;
  margin-bottom: 4px;
  align-items: flex-start;
`;
