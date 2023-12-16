import { useState, useEffect } from 'react';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, ScrollView, View, VirtualizedList } from 'react-native';
import MapView from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Audio } from 'expo-av';
import { ActivityIndicator, Appbar, Avatar, Badge, Banner, Button, Card, Checkbox, DataTable, Dialog, Divider, FAB, Icon, IconButton, List, Modal, Portal, Provider, RadioButton, SegmentedButtons, Snackbar, Surface, Switch, Text, TextInput,  MD2Colors } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfig from '../config/config';


export default function Login({ route, navigation }) {
  //const { itemId, otherParam } = route.params; https://reactnavigation.org/docs/params

  // START
  // =========================


  // INTERACTION
  // =========================
  const onPressLoginMain = () => {
    navigation.navigate("LoginMain");
  }

  const onPressRegister = () => {
    navigation.navigate("Register");
  }


  // FUNCTIONS
  // =========================


  // VIEW
  // =========================
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/bg3.png")} resizeMode="cover" style={styles.imageBg}>
        <ScrollView style={{ flex: 1, }} contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: AppConfig.whiteColor, fontSize: 50, fontWeight: 'bold' }}>Hi welcome</Text>
            <Text style={{ color: AppConfig.whiteColor, fontSize: 25, fontWeight: "100", marginBottom: 50 }}>We can protect your future</Text>

            <Button mode="contained" buttonColor={AppConfig.whiteColor} textColor={AppConfig.blackColor} onPress={() => onPressLoginMain()} contentStyle={{ flexDirection: "row-reverse", height: "100%" }}  labelStyle={{ fontSize: 20, fontWeight: "bold" }} style={{ height: 100, borderRadius: 20, marginVertical: 10 }}>
              LOGIN
            </Button>
            <Button mode="contained" buttonColor={AppConfig.whiteColor} textColor={AppConfig.blackColor} onPress={() => onPressRegister()} contentStyle={{ flexDirection: "row-reverse", height: "100%" }}  labelStyle={{ fontSize: 20, fontWeight: "bold" }} style={{ height: 100, borderRadius: 20, marginVertical: 10 }}>
              REGISTER
            </Button>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

// STYLES
// =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageBg: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});
