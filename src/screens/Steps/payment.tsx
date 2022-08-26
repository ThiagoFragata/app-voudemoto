import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import {
  ButtonPayment,
  Container,
  ContainerCreditCard,
  HeaderPayment,
  SubtitlePayment,
  TitlePayment,
} from "./styles";

export default function Payment() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nameCard: "",
      numberCard: "",
      monthYearCard: "",
      cvcCard: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Container>
      <HeaderPayment>
        <TitlePayment>Escolha como pagar</TitlePayment>
        <SubtitlePayment>
          Preencha os dados do cartão de crédito
        </SubtitlePayment>
      </HeaderPayment>

      <ContainerCreditCard>
        <Text>Payment</Text>
        {/* <KeyboardAwareScrollView>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label>Nome do cartão</Label>
                <Input
                  keyboardType="default"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
            name="nameCard"
          />
          {errors.nameCard && (
            <ErrorPayment>Nome do cartão é obrigatório.</ErrorPayment>
          )}

          <GroupCard>
            <Item>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Label>Número do cartão</Label>
                    <Input
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </>
                )}
                name="numberCard"
              />
              {errors.numberCard && (
                <ErrorPayment>Numero do cartão é obrigatório..</ErrorPayment>
              )}
            </Item>
          </GroupCard>

          <GroupCard>
            <Item>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Label>MM/AA</Label>
                    <Input
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </>
                )}
                name="monthYearCard"
              />
              {errors.monthYearCard && (
                <ErrorPayment>
                  Data de validade do cartão é obrigatório..
                </ErrorPayment>
              )}
            </Item>

            <ItemSpace>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Label>CVC/CVV</Label>
                    <Input
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </>
                )}
                name="cvcCard"
              />
              {errors.cvcCard && (
                <ErrorPayment>Código do cartão é obrigatório..</ErrorPayment>
              )}
            </ItemSpace>
          </GroupCard>

          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <ButtonPayment>Adicionar</ButtonPayment>
          </TouchableOpacity>
        </KeyboardAwareScrollView> */}
      </ContainerCreditCard>
    </Container>
  );
}
