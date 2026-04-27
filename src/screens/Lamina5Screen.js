// src/screens/Lamina7Screen.js
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Lamina5Screen({ navigation }) {
  const handleNext = () => {
  navigation.navigate('Lamina6');
};


  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Imagen a la izquierda */}
        <View style={styles.left}>
          <Image
            source={require('../../assets/lamina7.png')} // coloca tu imagen aquí
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Texto + botón a la derecha */}
        <View style={styles.right}>
          <Text style={styles.numero}>5</Text>

          <Text style={styles.titulo}>
            En algunos juegos voy a usar mi teléfono para guardar tus respuestas, 
            así después puedo anotarlas con calma.
 
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
  pillBg: '#E8F0FF',
  pillBorder: '#BBD1FF',
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
    fontSize: 28,
    lineHeight: 34,
    color: colors.dark,
    marginBottom: 10,
    fontWeight: '800',
  },
  resalto: { color: colors.primary },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.pillBg,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.pillBorder,
  },
  pillText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.3,
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
