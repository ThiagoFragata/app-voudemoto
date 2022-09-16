import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import Intl from "intl";
import "intl/locale-data/jsonp/pt-BR";

import socket from "../../services/socket";

import { PROVIDER_GOOGLE } from "react-native-maps";

import Pulse from "react-native-pulse";
import { Marker, Polyline } from "react-native-maps";
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

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import {
  Address,
  Avatar,
  AvatarCard,
  BoxHome,
  ButtonAcceptRide,
  ButtonCallDrive,
  Card,
  CardUser,
  ContainerHome,
  ContainerPulse,
  HeaderHome,
  InputSearchRide,
  Item,
  SubtitleAvatar,
  TitleAddress,
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
  route: LatLng[];
}

interface RideProps {
  info: {
    user: {
      _id: string;
      gId: string;
      nome: string;
      email: string;
      avatar?: string;
      socketId?: string;
    };
    ride: {
      price: string;
      distance: {
        text: string;
      };
      duration: {
        text: string;
      };
      start_address: string;
      end_address: string;
      route: LatLng[];
    };
  };
}

interface LatLng {
  latitude: number;
  longitude: number;
}

export default function Home({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const params = route.params;
  const mapRef = useRef(null);
  const ws = useRef(null);

  let origin = params?.origin?.place_id;
  let destiny = params?.destiny?.place_id;

  const { user } = useAuth();

  const [driverLocation, setDriverLocation] = useState({
    latitude: -3.1301294,
    longitude: 58.4386439,
  });

  const [payment, setPayment] = useState<any>();
  const [infoRide, setInfoRide] = useState<InfoRideProps>(null);
  const [ride, setRide] = useState<RideProps>();
  const [inRide, setInRide] = useState<any>();
  const [routesDriver, setRoutesDriver] = useState(null);
  const [socketId, setSocketId] = useState(null);

  const [type, setType] = useState("P");
  // P - passageiro
  // M - motoboy

  const [status, setStatus] = useState("C");
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
          route: data.info.route,
        });

        setStatus("I");
      } else {
        setStatus("S");
      }
    } catch (err) {
      console.log(err.message);
      setStatus("S");
    }
  }

  //buscar dados da corrida
  useFocusEffect(
    useCallback(() => {
      getDataRide();
    }, [origin, destiny])
  );

  // atualiza camera de posição do mapa
  useEffect(() => {
    mapRef.current.fitToCoordinates(infoRide?.route, {
      options: {
        edgePadding: {
          top: 100,
          bottom: 150,
          right: 70,
          left: 70,
        },
      },
    });
  }, [infoRide]);

  //conectar socket
  function initSocket() {
    ws.current = socket();

    ws.current.on("connect", () => {
      const id = ws.current.id;
      updateSocket(id);
      setSocketId(id);

      ws.current.on("ride-request", (ride) => {
        console.log("socket de solicitação de corrida =>", ride);
        if (ride) {
          setRide(ride);
          setStatus("A");
        }
      });

      ws.current.on("ride", (ride) => {
        console.log("socket de corrida aceita =>", ride);
        if (ride) {
          console.log("dados da ride =>", ride);
          setInRide(ride);
          setStatus("C");
        }
      });

      ws.current.on("ride-update", (coordinates) => {
        console.log("socket de coordinates =>", coordinates);
        updateMapLocation(coordinates);
      });
    });
  }

  //atualizar id socket
  async function updateSocket(socketId: string) {
    try {
      const { data } = await api.put(`/socket/${user.uId}`, {
        socketId: socketId,
      });

      if (data.error === true) {
        throw new Error("Socket vazio!");
      }
    } catch (err) {
      console.log("Update socketId error => ", err.message);
    }
  }

  useFocusEffect(
    useCallback(() => {
      initSocket();
    }, [origin, destiny])
  );

  async function updateLocation(coordinates) {
    try {
      await api.put(`/location/${user.uId}`, {
        coordinates,
        socketId: socketId,
        status: status,
      });
    } catch (err) {
      console.log("Update  location error => ", err.message);
    }
  }

  async function updateMapLocation(coordinates) {
    if (user.userType === "P") {
      setDriverLocation({
        latitude: coordinates.coordinates[0],
        longitude: coordinates.coordinates[1],
      });
    }

    mapRef.current.animateCamera({
      center: {
        latitude: coordinates.coordinates[0],
        longitude: coordinates.coordinates[1],
      },
      zoom: 14,
    });
  }

  //chamando corrida
  async function RequestRide() {
    try {
      const payload = {
        userId: user.uId,
        info: infoRide,
      };

      const { data } = await api.post("/call-ride", payload);

      if (data.error === true) {
        throw new Error(data);
      } else {
        setStatus("P");
      }
    } catch (err) {
      setStatus("S");
      console.log(err.message);
    }
  }

  //aceitando corrida
  async function AcceptedRide() {
    try {
      const payload = {
        info: ride.info.ride,
        userId: ride.info.user._id,
        driverId: user.uId,
      };

      const { data } = await api.post("/accept-ride", payload);

      if (data.error === true) {
        throw new Error(data);
      } else {
        Alert.alert("Corrida Aceita");
        setStatus("C");
        console.log(data.ride);
        setRoutesDriver(data.ride.infoRide.route);
      }
    } catch (err) {
      setStatus("S");
      Alert.alert("Não foi possivel aceitar essa corrida");
      console.log(err.message);
    }
  }

  //cancelando corrida
  async function CancelRide(message: string) {
    try {
      const { data } = await api.get(`/payment/${user.uId}`);
      setStatus("S");
      // setPayment({
      //   tipo: data.data.payment.tipoChave,
      //   chave: data.data.payment.chave,
      // });

      // navigation.replace("Payment", payment);

      Alert.alert("Corrida Finalizada", message);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <ContainerHome>
      {status === "S" && <ButtonSignOut />}
      {/* mapa */}
      <Map
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -3.1298824,
          longitude: -58.4345648,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onRegionChangeComplete={(region) => {
          updateLocation([region.latitude, region.longitude]);
          setDriverLocation(region);
        }}
        disabled={status === "P" || status === "A"}
      >
        {/* {(ride?.info.user._id || user.userType === "M") && (
          <Marker coordinate={driverLocation}>
            <Fontisto name="motorcycle" size={24} color="black" />
          </Marker>
        )} */}

        {routesDriver && (
          <>
            <Marker coordinate={routesDriver[0]}>
              <MaterialIcons name="emoji-people" size={24} color="black" />
            </Marker>

            <Polyline
              coordinates={routesDriver}
              strokeWidth={4}
              strokeColor="#000"
            />

            <Marker coordinate={routesDriver[routesDriver.length - 1]}>
              <MaterialCommunityIcons
                name="map-marker"
                size={24}
                color="black"
              />
            </Marker>
          </>
        )}

        {infoRide && (
          <>
            <Marker coordinate={infoRide.route[0]}>
              <MaterialIcons name="emoji-people" size={24} color="black" />
            </Marker>

            <Polyline
              coordinates={infoRide.route}
              strokeWidth={4}
              strokeColor="#000"
            />

            <Marker coordinate={infoRide.route[infoRide.route.length - 1]}>
              <MaterialCommunityIcons
                name="map-marker"
                size={24}
                color="black"
              />
            </Marker>
          </>
        )}
      </Map>

      {/* passageiro sem corrida à procurar corrida */}
      {type === "P" && status === "S" && (
        <>
          <AvatarCard top={`${insets.top}px`}>
            {user.avatar && (
              <Avatar
                source={{
                  uri: user.avatar,
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
              <SubtitleAvatar numberOfLines={1}>
                <Bullet /> {infoRide.start_address}
              </SubtitleAvatar>

              <SubtitleAvatar numberOfLines={1}>
                <Bullet color="orange" /> {infoRide.end_address}
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
              <ButtonCallDrive type="C" onPress={() => RequestRide()}>
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

      {/* passageiro pesquisando mototáxi PULSE */}
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
          <HeaderHome top={`${insets.top}px`}>
            <SubtitleAvatar numberOfLines={1}>
              <Bullet /> {inRide?.infoRide.start_address}
            </SubtitleAvatar>

            <SubtitleAvatar numberOfLines={1}>
              <Bullet color="orange" /> {inRide?.infoRide.end_address}
            </SubtitleAvatar>
          </HeaderHome>

          <BoxHome>
            <Card justify="flex-start">
              {inRide?.infoDriver.avatar && (
                <Avatar
                  source={{
                    uri: inRide?.infoDriver.avatar,
                  }}
                />
              )}
              <View>
                <TitleAvatar>{inRide?.infoDriver.nome}</TitleAvatar>
                <SubtitleAvatar>
                  {inRide?.infoMotocycle.modelo}, {inRide?.infoMotocycle.cor}
                </SubtitleAvatar>
              </View>
            </Card>

            <Card>
              <Item>{inRide?.infoRide.price}</Item>
              <Item>|</Item>

              <Item>{inRide?.infoRide.distance.text}</Item>
            </Card>

            <ButtonAcceptRide
              type="F"
              onPress={() => CancelRide("Não esqueça de pagar")}
            >
              <TextMedium align="center" color="white">
                Finalizar Corrida
              </TextMedium>
            </ButtonAcceptRide>
          </BoxHome>
        </>
      )}

      {/* mototáxi sem corrida*/}
      {type === "M" && status === "S" && (
        <>
          <AvatarCard top={`${insets.top}px`}>
            <Avatar
              source={{
                uri: user.avatar,
              }}
            />
            <View>
              <TitleAvatar>{user.name}</TitleAvatar>
              <SubtitleAvatar>Moto-taxista</SubtitleAvatar>
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
                uri: user.avatar,
              }}
            />
            <View>
              <TitleAvatar>{user.name}</TitleAvatar>
              <SubtitleAvatar>Moto-taxista</SubtitleAvatar>
            </View>
          </AvatarCard>

          <BoxHome>
            <Card justify="space-between">
              <Card justify="flex-start">
                {ride?.info?.user?.avatar && (
                  <Avatar
                    source={{
                      uri: ride?.info?.user?.avatar,
                    }}
                  />
                )}

                <CardUser>
                  <TitleAvatar numberOfLines={1}>
                    {ride?.info.user.nome}
                  </TitleAvatar>
                  <SubtitleAvatar numberOfLines={1}>
                    {ride?.info.ride.distance.text}
                  </SubtitleAvatar>
                </CardUser>
              </Card>

              <Card direction="column" justify="flex-start" align="flex-start">
                <TitleAddress numberOfLines={1}>
                  <Bullet /> {ride?.info.ride.start_address}
                </TitleAddress>

                <TitleAddress numberOfLines={1}>
                  <Bullet color="orange" />
                  {ride?.info.ride.end_address}
                </TitleAddress>
              </Card>
            </Card>
            <Card>
              <Item numberOfLines={1}>{ride?.info.ride.price}</Item>

              <Item>|</Item>

              <Item numberOfLines={1}>{ride?.info.ride.duration.text}</Item>
            </Card>

            <ButtonAcceptRide type="C" onPress={() => AcceptedRide()}>
              <TextMedium align="center" color="white">
                Aceitar Corrida
              </TextMedium>
            </ButtonAcceptRide>
          </BoxHome>
        </>
      )}

      {/* mototáxi em corrida */}
      {type === "M" && status === "C" && (
        <>
          <AvatarCard top={`${insets.top}px`}>
            <Avatar
              source={{
                uri: user.avatar,
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
                {ride?.info.user.avatar && (
                  <Avatar
                    source={{
                      uri: ride.info.user.avatar,
                    }}
                  />
                )}

                <CardUser>
                  <TitleAvatar numberOfLines={1}>
                    {ride?.info.user.nome}
                  </TitleAvatar>
                  <SubtitleAvatar numberOfLines={1}>
                    {ride?.info.ride.distance.text}
                  </SubtitleAvatar>
                </CardUser>
              </Card>

              <Card direction="column" justify="flex-start" align="flex-start">
                <TitleAddress numberOfLines={1}>
                  <Bullet /> {ride?.info.ride.start_address}
                </TitleAddress>

                <TitleAddress numberOfLines={1}>
                  <Bullet color="orange" /> {ride?.info.ride.end_address}
                </TitleAddress>
              </Card>
            </Card>

            <Card>
              <Item numberOfLines={1}>{ride?.info.ride.price}</Item>

              <Item>|</Item>

              <Item numberOfLines={1}>{ride?.info.ride.distance.text}</Item>
            </Card>

            <ButtonAcceptRide
              type="F"
              onPress={() => CancelRide("Não esqueça de receber")}
            >
              <TextMedium align="center" color="white">
                Finalizar Corrida
              </TextMedium>
            </ButtonAcceptRide>
          </BoxHome>
        </>
      )}
    </ContainerHome>
  );
}
