import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from './ui/inputs';

const yupSchema = yup.object({
    name: yup
      .string()
      .min(3, 'Insira no mínimo 3 caracteres.')
      .max(50, 'Insira no máximo 50 caracteres.')
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/,
        'Insira apenas letras.',
      )
      .matches(/^\S.*\S$/, 'Insira um nome válido.')
      .required('Nome é obrigatório.'),
    email: yup.string().email('Email inválido').required('Email é obrigatório.'),
    password: yup
      .string()
      .matches(/(?:[a-zA-Z].*){6,}/, 'Insira no mínimo 6 letras.')
      .matches(/.*[A-Z].*/, 'Insira no mínimo 1 letra maiúscula.')
      .matches(/.*[a-z].*/, 'Insira no mínimo 1 letra minúscula.')
      .matches(/.*[0-9].*/, 'Insira no mínimo 1 número.')
      .matches(
        /.*[!@#$%^&*()_+{}[\]/:;<>,.?~\\-].*/,
        'Insira pelo menos um dos seguintes símbolos: !@#$%^&*()_+{}[]/:;<>,.?~\\-',
      )
      .required('Senha é obrigatório.'),
    confirm_password: yup
      .string()
      .required('Confirmação de senha é obrigatória.')
      .oneOf([yup.ref('password')], 'As senhas digitadas não coincidem.'),
});

type YupSchemaType = yup.InferType<typeof yupSchema>;

function SignUpForm() {
    const {
      control,
      handleSubmit,
      getValues,
      formState: { errors, isSubmitting },
      register,
      setValue
    } = useForm<YupSchemaType>({
      resolver: yupResolver(yupSchema),
    });

    const teste = () => {
      console.log('PRESS')
    }

  const onSubmit = async ({ name, email, password }: YupSchemaType) => {
    console.log('shodres') 
    try {
      console.log('shodres') 
      // await api.post('/user', {
      //     username: name,
      //     email,
      //     password,
      //     role: isManager ? 'MANAGER' : 'USER',
      // });

      // toast.success('Cadastro realizado com sucesso!');
      // push('/sign-in');
    } catch (error) {
      // toast.error(axiosErrorMessageHandler(error as Error));
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({ field: { onChange, ...restField } }) => (
            <Input
              onChangeText={onChange}
              {...restField}
              error={!!errors.name}
              helperText={errors.name?.message}
              placeholder="Nome completo"
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          render={({ field: { onChange, ...restField } }) => (
            <Input
              onChangeText={onChange}
              {...restField}
              error={!!errors.email}
              helperText={errors.email?.message}
              placeholder="E-mail"
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          render={({ field: { onChange, ...restField } }) => (
            <Input
              onChangeText={onChange}
              {...restField}
              error={!!errors.password}
              helperText={errors.password?.message}
              placeholder="Senha"
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          render={({ field: { onChange, ...restField } }) => (
            <Input
              onChangeText={onChange}
              {...restField}
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message}
              placeholder="Confirmar senha"
            />
          )}
          name="confirm_password"
        />

        <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16
  }
});

export default SignUpForm;