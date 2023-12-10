import { useState, useEffect } from 'react';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, ScrollView, View, VirtualizedList } from 'react-native';
import MapView from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { ActivityIndicator, Appbar, Avatar, Badge, Banner, Button, Card, Checkbox, DataTable, Dialog, Divider, FAB, Icon, IconButton, List, Modal, Portal, Provider, RadioButton, SegmentedButtons, Snackbar, Surface, Switch, Text, TextInput,  MD2Colors } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfig from '../config/config';


export default function Home({ route, navigation }) {
  const { tToken } = route.params;
  const [userData, setUserData] = new useState({});

  // START
  // =========================
  const currentDate = new Date();
  const dateFormatOptions = {
    weekday: 'long', // 'long' for the full weekday name
    day: 'numeric',
    month: 'short', // 'short' for the abbreviated month name
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(currentDate);
  console.log(formattedDate + " " + tToken);


  // INTERACTION
  // =========================
  const onPressMenu = () => {
    navigation.navigate("Menu", { tToken: tToken });
  }


  // FUNCTIONS
  // =========================
  // Load Data
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(tToken);
    });

    return unsubscribe;
  }, [navigation]);

  // VIEW
  // =========================
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/bg1.png")} resizeMode="cover" style={styles.imageBg}>

        <ScrollView style={{ flex: 1, }} contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <View style={{ flex: 1, flexDirection: "row-reverse", marginTop: 24 }}>
            <Pressable onPress={() => onPressMenu()}>
              <Image source={require("../assets/icons/box1.png")} style={{ alignSelf: 'center', height: 50, width: 50 }}></Image>
            </Pressable>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={{ color: AppConfig.whiteColor, fontSize: 50, fontWeight: 'bold' }}>Hi There!</Text>
            <Text style={{ color: AppConfig.whiteColor, fontSize: 25, fontWeight: "100" }}>{ formattedDate }</Text>

            <View style={{ height: 2, width: "100%", backgroundColor: AppConfig.whiteColor, marginTop: 10 }}></View>

            <Image source={require("../assets/icons/pic2.png")} style={{ alignSelf: 'center', height: 300, width: 400 }}></Image>
            <Image source={require("../assets/icons/pic3.png")} style={{ alignSelf: 'center', height: 300, width: 400 }}></Image>
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
