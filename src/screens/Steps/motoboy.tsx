import React from "react";

import { useForm, Controller } from "react-hook-form";

import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import { ButtonPayment, InputMasked, RegisterMotoboy } from "./styles";

export default function Motoboy() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      licensePlate: "",
      vehicleModel: "",
      vehicleColor: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <View>
        <TouchableOpacity>
          <Text>Voltar</Text>
        </TouchableOpacity>

        <Text>Dados Cadastrais</Text>

        <TouchableOpacity>
          <Text>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <RegisterMotoboy>
        <KeyboardAwareScrollView>
          <View>
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Text>Nome</Text>
                    <TextInput
                      keyboardType="default"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </>
                )}
                name="name"
              />
              {errors.name && <Text>Nome é obrigatório.</Text>}
            </View>
          </View>

          <View>
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Text>Telefone</Text>
                    <InputMasked
                      // style={styles.input}
                      type={"cel-phone"}
                      options={{
                        maskType: "BRL",
                        withDDD: true,
                        dddMask: "(99) ",
                      }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </>
                )}
                name="phone"
              />
              {errors.phone && <Text>Número do telefone é obrigatório.</Text>}
            </View>
          </View>

          <View>
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Text>E-mail</Text>
                    <TextInput
                      keyboardType="email-address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </>
                )}
                name="email"
              />
              {errors.email && <Text>É-mail é obrigatório..</Text>}
            </View>
          </View>

          <View>
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Text>CNH</Text>
                    <InputMasked
                      type={"custom"}
                      options={{
                        mask: "99999999999",
                      }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </>
                )}
                name="licensePlate"
              />
              {errors.licensePlate && <Text>Número da CNH é obrigatório.</Text>}
            </View>
          </View>

          <View>
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Text>Placa do veículo</Text>
                    <TextInput
                      keyboardType="default"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </>
                )}
                name="vehicleModel"
              />
              {errors.vehicleModel && (
                <Text>Número da placa é obrigatório.</Text>
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
                    <Text>Cor do veículo</Text>
                    <TextInput
                      keyboardType="default"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </>
                )}
                name="vehicleColor"
              />
              {errors.vehicleColor && (
                <Text>Cor do veículo é obrigatório.</Text>
              )}
            </View>
          </View>

          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <ButtonPayment>Cadastrar</ButtonPayment>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </RegisterMotoboy>
    </>
  );
}
