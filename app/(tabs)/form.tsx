import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import SignUpForm from '@/components/SignUpForm';
import { styled } from 'nativewind';

const StyledView = styled(View)
const StyledText = styled(Text)

export default function FormScreen() {
  return (
    <View style={styles.container}>
      <StyledView className='mb-5'>
        <StyledText className='text-5xl font-light text-red-500'>QFila</StyledText>
        <StyledText className='text-2xl font-light text-muted w-max ml-auto leading-6'>
          Cadastro
        </StyledText>
      </StyledView>
      <SignUpForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
