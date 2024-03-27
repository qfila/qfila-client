import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import SignUpForm from '@/components/SignUpForm';
import SignInForm from '@/components/SignInForm';

export default function FormScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>QFila</Text>
        <Text style={styles.subtitle}>
          Login
        </Text>
      </View>
      <SignInForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    width: 'auto'
  },
  top: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 48
  },
  subtitle: {
    fontSize: 24,
    color: '#777'
  }
});
