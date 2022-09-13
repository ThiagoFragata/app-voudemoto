import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Intl from "intl";
import "intl/locale-data/jsonp/pt-BR"; // or any other locale you need

import { PROVIDER_GOOGLE } from "react-native-maps";

import Pulse from "react-native-pulse";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ButtonSignOut } from "../../components/ButtonSignOut";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/axios";
import {
  Bullet,
  Map,
  TextMedium,
  TextRegular,
} from "../../styles/globalStyles";

import {
  Address,
  Avatar,
  AvatarCard,
  BoxHome,
  ButtonCallDrive,
  Card,
  ContainerHome,
  ContainerPulse,
  HeaderHome,
  InputSearchRide,
  Item,
  Span,
  SubtitleAvatar,
  TitleAvatar,
} from "./styles";

interface InfoRideProps {
  price: string;
  distance: {
    text: string;
  };
  duration: {
    text: string;
  };
  start_address: string;
  end_address: string;
}

export default function Home({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const params = route.params;

  let origin = params.origin?.place_id;
  let destiny = params.destiny?.place_id;

  const { user, avatar } = useAuth();

  const [infoRide, setInfoRide] = useState<InfoRideProps>();

  const [type, setType] = useState("P");
  // P - passageiro
  // M - motoboy

  const [status, setStatus] = useState("S");
  // S - Sem corrida
  // I - Passageiro com informações da corrida
  // P - Pesquisando
  // A - Aceitar Corrida
  // C - Em Corrida

  //buscar dados do user
  useEffect(() => {
    setType(user.userType);
  }, []);

  async function getDataRide() {
    try {
      const { data } = await api.post("/pre-ride", { origin, destiny });

      if (data.error === false) {
        setInfoRide({
          distance: data.info.distance,
          end_address: data.info.end_address,
          duration: data.info.duration,
          price: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(data.info.price),
          start_address: data.info.start_address,
        });

        setStatus("I");
      } else {
        setStatus("S");
      }
    } catch (err) {
      console.error(err.message);
      setStatus("S");
    }
  }

  //buscar dados da corrida
  useFocusEffect(
    useCallback(() => {
      getDataRide();
    }, [origin, destiny])
  );

  return (
    <ContainerHome>
      {status === "P" && <ButtonSignOut />}

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
            {avatar && (
              <Avatar
                source={{
                  uri: avatar,
                }}
              />
            )}
            <View>
              <TitleAvatar>{user.name}</TitleAvatar>
              <SubtitleAvatar>Passageiro</SubtitleAvatar>
            </View>
          </AvatarCard>

          <BoxHome>
            <SubtitleAvatar>Olá, {user.name}</SubtitleAvatar>
            <TitleAvatar>Para onde você quer ir?</TitleAvatar>
            <TouchableOpacity onPress={() => navigation.navigate("Ride")}>
              <InputSearchRide
                keyboardType="default"
                editable={false}
                placeholder="Para onde você quer ir?"
              />
            </TouchableOpacity>
          </BoxHome>
        </>
      )}

      {/* procurando corrida e apertar pra chamar moto-taxi ou cancelar*/}
      {type === "P" && status === "I" && (
        <>
          <HeaderHome top={`${insets.top}px`}>
            <Address>
              <SubtitleAvatar>
                <Bullet numberOfLine={1} /> {infoRide.start_address}
              </SubtitleAvatar>

              <SubtitleAvatar>
                <Bullet numberOfLine={1} color="orange" />{" "}
                {infoRide.end_address}
              </SubtitleAvatar>
            </Address>

            <TouchableOpacity onPress={() => navigation.navigate("Ride")}>
              <TextRegular size={12} align="center">
                Toque para editar
              </TextRegular>
            </TouchableOpacity>
          </HeaderHome>

          <BoxHome>
            <SubtitleAvatar align="center">Convencional </SubtitleAvatar>
            <Card>
              <Item>{infoRide.price}</Item>
              <Item>|</Item>
              <Item>{infoRide.duration.text}</Item>
            </Card>

            {status === "I" ? (
              <ButtonCallDrive type="C">
                <TextMedium size={14} align="center" color="white">
                  Chamar Moto-táxi
                </TextMedium>
              </ButtonCallDrive>
            ) : (
              <ButtonCallDrive type="F">
                <TextMedium size={14} align="center" color="white">
                  Cancelar Moto-táxi
                </TextMedium>
              </ButtonCallDrive>
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
