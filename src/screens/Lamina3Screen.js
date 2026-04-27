// src/screens/Lamina3Screen.js
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Lamina3Screen({ navigation }) {
  const handleNext = () => {
  navigation.navigate('Lamina4');
};


  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Imagen a la izquierda */}
        <View style={styles.left}>
          <Image
            source={require('../../assets/lamina3.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Texto + botón a la derecha */}
        <View style={styles.right}>
          <Text style={styles.numero}>3</Text>

          <Text style={styles.titulo}>
          Vamos a jugar para ver cómo mueves tu cuerpo, cómo usas tus palabras y cómo te diviertes con los números. Hoy y mañana haremos actividades juntos, y algunas serán con la tablet, ¡como un juego especial!
          </Text>

          <Pressable style={styles.boton} onPress={handleNext}>
            <Text style={styles.botonTexto}>Siguiente</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const colors = {
  bg: '#F7FBFF',
  primary: '#1B6EF3',
  dark: '#0F172A',
  muted: '#475569',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  left: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 12,
  },
  right: {
    flex: 1.2,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  image: { width: '100%', height: '80%' },
  numero: {
    fontSize: 56,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 6,
  },
  titulo: {
  fontSize: 26,
  lineHeight: 34,
  color: colors.dark,
  marginBottom: 12,
  fontWeight: '800',
  textAlign: 'justify', 
},
  sub: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.muted,
    marginBottom: 24,
  },
  boton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderRadius: 24,
    alignSelf: 'flex-start',
    shadowColor: colors.dark,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  botonTexto: { color: colors.white, fontSize: 20, fontWeight: '800' },
});
