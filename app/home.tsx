import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import SecureStore from 'expo-secure-store';
import WebView from 'react-native-webview';

export default function HomeScreen() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'http://localhost:5001' }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
