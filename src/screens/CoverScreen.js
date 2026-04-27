// src/screens/CoverScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoverScreen({ navigation }) {
  const handleStart = () => {
    navigation.navigate('Lamina1'); // 👈 esto lo lleva a la lámina uno
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Imagen a la izquierda */}
        <View style={styles.left}>
          <Image
            source={require('../../assets/mascot.png')} // tu imagen portada
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Texto y botón a la derecha */}
        <View style={styles.right}>
          <Text style={styles.hola}>¡Hola!</Text>
          <Text style={styles.titulo}>Me llamo [Nombre del profesional]. 
            
          </Text>
          <Text style={styles.subtitulo}>
            Hoy quiero invitarte a jugar y hacer algunas actividades divertidas para conocer cómo aprendes. Antes de empezar, te contaré unas cosas importantes. 
          </Text>
           <View style={styles.pill}>
            <Text style={styles.pillText}>¿Quieres ayudarme apretando el botón azul? ¡Muy bien!</Text>
          </View>

          {/* 👇 Aquí está tu botón */}
          <Pressable style={styles.boton} onPress={handleStart}>
            <Text style={styles.botonTexto}>¡Comenzar!</Text>
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
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
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
    fontSize: 18,
    letterSpacing: 0.3,
  },
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
  image: {
    width: '100%',
    height: '80%',
  },
  hola: {
    fontSize: 50,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.dark,
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 20,
    lineHeight: 28,
    color: colors.muted,
    marginBottom: 24,
  },
  boton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignSelf: 'flex-start',
    shadowColor: colors.dark,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  botonTexto: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
