// src/screens/ConsentScreen.js
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

export default function ConsentScreen({ navigation }) {
  const shotModalRef = useRef(null);
  const [childName, setChildName] = useState('');
  const [choice, setChoice] = useState(null); // 'yes' | 'no'
  const [modalVisible, setModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const disabled = childName.trim() === '';

  const openModal = (opt) => {
    if (disabled) return;
    setChoice(opt);
    setSaved(false);
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Espera breve para asegurar que el modal terminó de renderizar
      await new Promise((r) => setTimeout(r, 120));

      // 1) Capturar SOLO la tarjeta del modal
      const uri = await shotModalRef.current?.capture?.({
        format: 'png',
        quality: 0.95,
      });

      if (!uri) throw new Error('No se generó la imagen');

      // 2) Pedir permiso y tratar de guardar en galería
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        try {
          await MediaLibrary.saveToLibraryAsync(uri);
          setSaved(true);
          setSaving(false);
          return;
        } catch {
          // si falla guardado, caemos al fallback de compartir
        }
      }

      // 3) Fallback (Expo Go / permisos limitados): compartir archivo
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
        setSaved(true);
      } else {
        Alert.alert('Aviso', 'No se pudo guardar ni compartir la imagen en este entorno.');
      }

      setSaving(false);
    } catch (e) {
      setSaving(false);
      console.log(e);
      Alert.alert('Error', 'No se pudo generar o guardar la captura.');
    }
  };

  const handleFinish = () => {
    setModalVisible(false);
    setChoice(null);
    setChildName('');
    navigation.navigate('Cover');
  };

  const today = new Date();
const fechaFormateada = `${today.getDate().toString().padStart(2, '0')}/${
  (today.getMonth() + 1).toString().padStart(2, '0')
}/${today.getFullYear()}`;

const textLine =
  choice === 'yes'
    ? `Yo, ${childName.trim()}, quiero participar en el estudio. Fecha: ${fechaFormateada}`
    : `Yo, ${childName.trim()}, no quiero participar en el estudio. Fecha: ${fechaFormateada}`;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* IZQUIERDA: título, nombre y "quiero:" + imagen */}
          <View style={styles.left}>
            <Text style={styles.title}>¿QUIERES PARTICIPAR EN EL ESTUDIO?</Text>

            <Text style={styles.label}>Yo,</Text>
            <TextInput
              value={childName}
              onChangeText={setChildName}
              placeholder="Escribe el nombre aquí"
              style={styles.input}
              maxLength={40}
            />
            <Text style={styles.label}>quiero:</Text>

            {/* Imagen para no dejar vacío */}
            <Image
              source={require('../../assets/conse.png')}
              style={styles.conseImage}
              resizeMode="contain"
            />
          </View>

          {/* DERECHA: botones de elección */}
          <View style={styles.right}>
            <Pressable
              style={[styles.choiceBtn, disabled && styles.disabled]}
              onPress={() => openModal('yes')}
              disabled={disabled}
            >
              <Image
                source={require('../../assets/check.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </Pressable>

            <Pressable
              style={[styles.choiceBtn, disabled && styles.disabled]}
              onPress={() => openModal('no')}
              disabled={disabled}
            >
              <Image
                source={require('../../assets/cross.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>

        {/* MODAL de confirmación (capturamos esta tarjeta) */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <ViewShot ref={shotModalRef} style={{ width: '80%' }}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Confirmación</Text>

                <Text
                  style={[
                    styles.modalText,
                    choice === 'yes' && { color: colors.yes },
                    choice === 'no' && { color: colors.no },
                  ]}
                >
                  {textLine}
                </Text>

                {!saved ? (
                  <Pressable
                    style={[styles.saveBtn, saving && styles.saving]}
                    onPress={handleSave}
                    disabled={saving}
                  >
                    <Text style={styles.saveBtnText}>
                      {saving ? 'Guardando…' : 'Guardar registro'}
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable style={styles.finishBtn} onPress={handleFinish}>
                    <Text style={styles.finishBtnText}>Finalizar</Text>
                  </Pressable>
                )}

                {!saving && !saved && (
                  <Pressable style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                  </Pressable>
                )}
              </View>
            </ViewShot>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const colors = {
  bg: '#F7FBFF',
  primary: '#1B6EF3',
  dark: '#0F172A',
  muted: '#475569',
  white: '#FFFFFF',
  yes: '#4CAF50', // verde
  no: '#E53935',  // rojo
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  left: {
    flex: 1.2,
    justifyContent: 'flex-start', // nombre más arriba
    marginTop: 20,
  },
  right: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end', // botones más abajo
    gap: 20,
    flexDirection: 'column',
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.dark,
    marginBottom: 12,
  },
  label: { fontSize: 20, color: colors.muted, marginTop: 8 },
  input: {
    marginTop: 6,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D8E1F1',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 20,
    color: colors.dark,
    width: '100%',
  },
  conseImage: {
    width: '100%',
    height: 300,
    marginTop: 10,
  },
  choiceBtn: {
    width: 220,
    height: 220,
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 3,
  },
  icon: { width: 200, height: 200, borderRadius: 16 },
  choiceText: { fontSize: 20, fontWeight: '900' },
  disabled: { opacity: 0.4 },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: { fontSize: 22, fontWeight: '900', color: colors.dark },
  modalText: { fontSize: 18, textAlign: 'center', fontWeight: '700' },

  saveBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 16,
  },
  saveBtnText: { color: colors.white, fontSize: 18, fontWeight: '800' },
  saving: { opacity: 0.6 },

  finishBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 16,
  },
  finishBtnText: { color: colors.white, fontSize: 18, fontWeight: '900' },

  cancelBtn: { marginTop: 4, padding: 8 },
  cancelText: { color: colors.muted, fontSize: 16, textDecorationLine: 'underline' },
});
