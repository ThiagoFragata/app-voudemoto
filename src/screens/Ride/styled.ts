import styled from "styled-components/native";

export const ContainerRide = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  padding: 16px;
`;

interface Props {
  marginTop: string;
}

export const HeaderRide = styled.View<Props>`
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : 0)};

  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonRide = styled.TouchableOpacity`
  width: 100%;

  padding: 16px 24px;
  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.info_100};
  color: ${({ theme }) => theme.colors.white};

  text-align: center;
  font-weight: 800;
`;

export const AddressList = styled.FlatList`
  width: 100%;
  padding: 8px 8px 0;
`;

export const AddressItem = styled.TouchableOpacity`
  padding: 5px 0;
  margin-bottom: 4px;
  align-items: flex-start;
`;
