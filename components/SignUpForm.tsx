import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet, Pressable, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from './ui/inputs';
import api from '@/modules/api';

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
  const [error, setError] = useState('');
  
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

  const onSubmit = async ({ name, email, password }: YupSchemaType) => {
    try {
      setError('');

      await api.post('/user', {
        username: name,
        email,
        password,
        role: 'USER',
      });
    } catch (error) {
      console.error(error);
      setError('Erro inesperado na API')
      // toast.error(axiosErrorMessageHandler(error as Error));
    }
  };

  return (
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
            secureTextEntry
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
            secureTextEntry
          />
        )}
        name="confirm_password"
      />

      <TouchableOpacity style={styles.pressable} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.pressableText}>
          {
            isSubmitting ? <ActivityIndicator size={24} color="#FFF" /> : 'Cadastrar'
          }
        </Text>
      </TouchableOpacity>
      {
        error ? (
          <Text style={styles.error}>
            {error}
          </Text>
        ) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    gap: 16,
    width: '100%',
  },
  pressable: {
    borderRadius: 8,
    backgroundColor: '#044557',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableText: {
    fontWeight: '200',
    color: '#FAFAFA',
    fontSize: 16
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16
  }
});

export default SignUpForm;