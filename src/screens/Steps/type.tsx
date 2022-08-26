import React from 'react';
import {Image, Text} from 'react-native';

import {
  Background,
  Card,
  Container,
  Paragraph,
  Subtitle,
  Title,
} from './styles';

import imgMotoboy from '../../assets/motoboy.png';
import imgPassenger from '../../assets/passenger.png';
import backgroundType from '../../assets/pin-marker2.png';

export default function Type() {
  function isMotoboy() {
    // alert('mototaxista');
  }

  function isPassenger() {
    // alert('passageiro');
  }

  return (
    <Container>
      <Background source={backgroundType} />
      <Title>Vou de moto</Title>
      <Subtitle>
        Conectando passageiros a motoristas. O que você precisa?
      </Subtitle>

      <Card onPress={isMotoboy} active>
        <Image source={imgMotoboy} />
        <Paragraph>Busco novas oportunidades</Paragraph>
      </Card>

      <Text>ou</Text>

      <Card onPress={isPassenger}>
        <Image source={imgPassenger} />
        <Paragraph>Estou precisando de um mototaxista</Paragraph>
      </Card>
    </Container>
  );
}
