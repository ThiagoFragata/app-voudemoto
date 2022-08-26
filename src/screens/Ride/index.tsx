import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";

import {
  ContainerRide,
  ButtonRide,
  AddressList,
  FormRide,
  AddressItem,
} from "./styled";

export default function Ride() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      boarding: "",
      destiny: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <ContainerRide>
      <View>
        <TouchableOpacity>
          <Text>Voltar</Text>
        </TouchableOpacity>

        <Text>Corrida</Text>

        <TouchableOpacity>
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <FormRide>
        <View>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text>Embarque</Text>
                  <TextInput
                    keyboardType="default"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </>
              )}
              name="boarding"
            />
            {errors.boarding && (
              <Text>Por favor informe seu local de embarque</Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text>Destino</Text>
                  <TextInput
                    keyboardType="default"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </>
              )}
              name="destiny"
            />
            {errors.destiny && <Text>Por favor informe seu destino</Text>}
          </View>
        </View>

        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <ButtonRide>Atualizar no mapa</ButtonRide>
        </TouchableOpacity>
      </FormRide>

      <AddressList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={(_item, _index) => (
          <AddressItem>
            <Text>Menlo Parl</Text>
            <Text>Palo Alto, CA</Text>
          </AddressItem>
        )}
      />
    </ContainerRide>
  );
}
