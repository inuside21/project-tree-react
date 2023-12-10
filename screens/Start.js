import { useState, useEffect } from 'react';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, ScrollView, View, VirtualizedList } from 'react-native';
import MapView from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { ActivityIndicator, Appbar, Avatar, Badge, Banner, Button, Card, Checkbox, DataTable, Dialog, Divider, FAB, Icon, IconButton, List, Modal, Portal, Provider, RadioButton, SegmentedButtons, Snackbar, Surface, Switch, Text, TextInput,  MD2Colors } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfig from '../config/config';


export default function Start({ route, navigation }) {
  //const { itemId, otherParam } = route.params; https://reactnavigation.org/docs/params

  // START
  // =========================


  // INTERACTION
  // =========================
  const onPressLogin = () => {
    navigation.navigate("Login");
  }


  // FUNCTIONS
  // =========================


  // VIEW
  // =========================
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/bg0.png")} resizeMode="cover" style={styles.imageBg}>
        <ScrollView style={{ flex: 1, }} contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <View style={{ flex: 3, }}> 
            <Text style={{ color: AppConfig.whiteColor, fontSize: 50, fontWeight: 'bold' }}>Hi welcome</Text>
            <Text style={{ color: AppConfig.whiteColor, fontSize: 25, fontWeight: "100" }}>We can protect your future</Text>

            <Image source={require("../assets/icons/pic1.png")} style={{ alignSelf: 'center', height: 300, width: 400, marginTop: 15, }}></Image>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 10 }}>
            <Button icon={require('../assets/icons/arr3.png')} mode="contained" buttonColor={AppConfig.mainColor} onPress={() => onPressLogin()} contentStyle={{ flexDirection: "row-reverse", paddingTop: 12 }}  labelStyle={{ fontSize: 20 }} style={{ height: 60, borderRadius: 10 }}>
              Get Started
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
