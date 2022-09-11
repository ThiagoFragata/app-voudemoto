import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { PROVIDER_GOOGLE } from "react-native-maps";

import Pulse from "react-native-pulse";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ButtonSignOut } from "../../components/ButtonSignOut";
import { useAuth } from "../../hooks/auth";
import { Box, Bullet, Map } from "../../styles/globalStyles";
import { Spacer } from "../Login/styles";

import {
  Address,
  Avatar,
  AvatarCard,
  BoxHome,
  Card,
  ContainerHome,
  ContainerPulse,
  HeaderHome,
  Item,
  Span,
  SubtitleAvatar,
  TitleAvatar,
} from "./styles";

export default function Home() {
  const insets = useSafeAreaInsets();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type, setType] = useState("P");
  // P - passageiro
  // M - motoboy

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = useState("S");
  // S - Sem corrida
  // I - Passageiro com informações da corrida
  // P - Pesquisando
  // A - Aceitar Corrida
  // C - Em Corrida
  const { user, avatar } = useAuth();

  //buscar dados do user
  useEffect(() => {
    setType(user.userType);
  }, []);

  return (
    <ContainerHome>
      <ButtonSignOut />
      <Map
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        disabled={status === "I" || status === "P"}
      />

      {/* passageiro sem corrida à procurar corrida */}
      {type === "P" && status === "S" && (
        <>
          <AvatarCard top={`${insets.top}px`}>
            <Avatar
              source={{
                uri: avatar,
              }}
            />
            <View>
              <TitleAvatar>{user.name}</TitleAvatar>
              {/* <SubtitleAvatar>Passageiro</SubtitleAvatar> */}
            </View>
          </AvatarCard>

          <BoxHome>
            <SubtitleAvatar>Olá, {user.name}</SubtitleAvatar>
            <TitleAvatar>Para onde você quer ir?</TitleAvatar>
            {/* <InputHome keyboardType="default" /> */}
          </BoxHome>
        </>
      )}

      {/* procurando corrida e apertar pra chamar moto-taxi ou cancelar*/}
      {type === "P" && (status === "I" || status === "P") && (
        <>
          <HeaderHome>
            <Address>
              <SubtitleAvatar>
                <Bullet numberOfLine={1} /> Endereço de embarque
              </SubtitleAvatar>

              <SubtitleAvatar>
                <Bullet numberOfLine={1} color="orange" /> Endereço destino
              </SubtitleAvatar>
            </Address>

            <TouchableOpacity>
              <Text>Toque para editar</Text>
            </TouchableOpacity>
          </HeaderHome>

          <BoxHome>
            <SubtitleAvatar align="center">Convencional </SubtitleAvatar>
            <Card>
              <Item>R$12,00</Item>
              <Item>|</Item>
              <Item>15 min</Item>
            </Card>

            {status === "I" ? (
              <TouchableOpacity>
                <Text>Chamar Moto-táxi</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Text>Cancelar Moto-táxi</Text>
              </TouchableOpacity>
            )}
          </BoxHome>
        </>
      )}

      {/* passageiro pesquisando mototáxi */}
      {type === "P" && status === "P" && (
        <ContainerPulse>
          <Pulse
            color="#F4A023"
            numPulses={3}
            diameter={400}
            speed={20}
            duration={2000}
          />
        </ContainerPulse>
      )}

      {/* passageiro em corrida */}
      {type === "P" && status === "C" && (
        <>
          <HeaderHome>
            <SubtitleAvatar>
              <Bullet numberOfLine={1} /> Endereço de embarque
            </SubtitleAvatar>

            <SubtitleAvatar>
              <Bullet numberOfLine={1} color="orange" /> Endereço destino
            </SubtitleAvatar>
          </HeaderHome>

          <BoxHome>
            <Card justify="flex-start">
              <Avatar
                source={{
                  uri: avatar,
                }}
              />
              <View>
                <TitleAvatar>Nome motorista</TitleAvatar>
                <SubtitleAvatar>XJ 600 Preta, JSK423</SubtitleAvatar>
              </View>
            </Card>

            <Card>
              <Item>R$12,00</Item>
              <Item>|</Item>

              <Item>
                5min <Span>Aprox.</Span>
              </Item>
            </Card>

            <TouchableOpacity>
              <Text>Cancelar Corrida</Text>
            </TouchableOpacity>
          </BoxHome>
        </>
      )}

      {/* mototáxi sem corrida*/}
      {type === "M" && status === "S" && (
        <>
          <AvatarCard top={`${insets.top}px`}>
            <Avatar
              source={{
                uri: avatar,
              }}
            />
            <View>
              <TitleAvatar>{user.name}</TitleAvatar>
              <SubtitleAvatar>{user.email}</SubtitleAvatar>
            </View>
          </AvatarCard>

          <BoxHome>
            <TitleAvatar>Olá, {user.name}</TitleAvatar>
            <SubtitleAvatar align="left">
              Nenhuma corrida encontrada no momento!
            </SubtitleAvatar>
          </BoxHome>
        </>
      )}

      {/* mototáxi aceitando corrida */}
      {type === "M" && status === "A" && (
        <>
          <AvatarCard top={`${insets.top}px`}>
            <Avatar
              source={{
                uri: avatar,
              }}
            />
            <View>
              <TitleAvatar>{user.name}</TitleAvatar>
              <SubtitleAvatar>{user.email}</SubtitleAvatar>
            </View>
          </AvatarCard>

          <BoxHome>
            <Card justify="space-between">
              <Card justify="flex-start">
                <Avatar
                  source={{
                    uri: user.avatar,
                  }}
                />

                <View>
                  <TitleAvatar>{user.name}</TitleAvatar>
                  <SubtitleAvatar>2km</SubtitleAvatar>
                </View>
              </Card>

              <Card direction="column" justify="flex-start" align="flex-start">
                <SubtitleAvatar>
                  <Bullet numberOfLine={1} /> Endereço de embarque
                </SubtitleAvatar>

                <SubtitleAvatar>
                  <Bullet numberOfLine={1} color="orange" /> Endereço destino
                </SubtitleAvatar>
              </Card>
            </Card>

            <Card>
              <Item>R$12,00</Item>
              <Item>|</Item>

              <Item>
                5min <Span>Aprox.</Span>
              </Item>
            </Card>

            <TouchableOpacity>
              <Text>Aceitar Corrida</Text>
            </TouchableOpacity>
          </BoxHome>
        </>
      )}

      {/* mototáxi em corrida */}
      {type === "M" && status === "C" && (
        <>
          <AvatarCard top={`${insets.top}px`}>
            <Avatar
              source={{
                uri: avatar,
              }}
            />
            <View>
              <TitleAvatar>{user.name}</TitleAvatar>
              <SubtitleAvatar>{user.email}</SubtitleAvatar>
            </View>
          </AvatarCard>

          <BoxHome>
            <Card justify="space-between">
              <Card justify="flex-start">
                <Avatar
                  source={{
                    uri: user.avatar,
                  }}
                />

                <View>
                  <TitleAvatar>{user.name}</TitleAvatar>
                  <SubtitleAvatar>2km</SubtitleAvatar>
                </View>
              </Card>

              <Card direction="column" justify="flex-start" align="flex-start">
                <SubtitleAvatar>
                  <Bullet numberOfLine={1} /> Endereço de embarque
                </SubtitleAvatar>

                <SubtitleAvatar>
                  <Bullet numberOfLine={1} color="orange" /> Endereço destino
                </SubtitleAvatar>
              </Card>
            </Card>

            <Card>
              <Item>R$12,00</Item>
              <Item>|</Item>

              <Item>
                5min <Span>Aprox.</Span>
              </Item>
            </Card>

            <TouchableOpacity>
              <Text>Cancelar Moto-táxi</Text>
            </TouchableOpacity>
          </BoxHome>
        </>
      )}
    </ContainerHome>
  );
}
