import { useState, useEffect } from 'react';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, ScrollView, View, VirtualizedList } from 'react-native';
import MapView from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { ActivityIndicator, Appbar, Avatar, Badge, Banner, Button, Card, Checkbox, DataTable, Dialog, Divider, FAB, Icon, IconButton, List, Modal, Portal, Provider, RadioButton, SegmentedButtons, Snackbar, Surface, Switch, Text, TextInput,  MD2Colors } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfig from '../config/config';


export default function Menu({ route, navigation }) {
  const { tToken } = route.params;
  const [userData, setUserData] = new useState({});

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
  // Load Data

  // VIEW
  // =========================
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/bg2.png")} resizeMode="cover" style={styles.imageBg}>

        <ScrollView style={{ flex: 1, }} contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <Pressable style={{ width: "45%" }} onPress={ () => navigation.goBack() }>
              <Surface style={styles.surface} elevation={4}>
                <Image source={require("../assets/icons/home2.png")} style={{ alignSelf: 'center', height: 50, width: 50 }}></Image>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}> Home </Text>
              </Surface>
            </Pressable>
            
            <Pressable style={{ width: "45%" }} onPress={ () => navigation.navigate("Insight", { tToken: tToken }) }>
              <Surface style={styles.surface} elevation={4}>
                <Image source={require("../assets/icons/chart2.png")} style={{ alignSelf: 'center', height: 50, width: 50 }}></Image>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}> Insights </Text>
              </Surface>
            </Pressable>
          </View>

          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <Pressable style={{ width: "45%" }} onPress={ () => navigation.navigate("Fire", { tToken: tToken }) }>
              <Surface style={styles.surface} elevation={4}>
                <Image source={require("../assets/icons/fire.png")} style={{ alignSelf: 'center', height: 50, width: 50 }}></Image>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}> Fire </Text>
              </Surface>
            </Pressable>
            
            <Pressable style={{ width: "45%" }} onPress={ () => navigation.navigate("Fall", { tToken: tToken }) }>
              <Surface style={styles.surface} elevation={4}>
                <Image source={require("../assets/icons/tree.png")} style={{ alignSelf: 'center', height: 50, width: 50 }}></Image>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}> Fall </Text>
              </Surface>
            </Pressable>
          </View>

          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <Pressable style={{ width: "45%" }} onPress={ () => navigation.navigate("Maintenance", { tToken: tToken }) }>
              <Surface style={styles.surface} elevation={4}>
                <Image source={require("../assets/icons/setting.png")} style={{ alignSelf: 'center', height: 50, width: 50 }}></Image>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}> Maintenance </Text>
              </Surface>
            </Pressable>
            
            <Pressable style={{ width: "45%" }} onPress={ () => navigation.navigate("History", { tToken: tToken }) }>
              <Surface style={styles.surface} elevation={4}>
                <Image source={require("../assets/icons/history.png")} style={{ alignSelf: 'center', height: 50, width: 50 }}></Image>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}> History </Text>
              </Surface>
            </Pressable>
          </View>

          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <Pressable style={{ width: "45%" }} onPress={ () => navigation.navigate("About", { tToken: tToken }) }>
              <Surface style={styles.surface} elevation={4}>
                <Image source={require("../assets/icons/group.png")} style={{ alignSelf: 'center', height: 50, width: 50 }}></Image>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}> About Us </Text>
              </Surface>
            </Pressable>
            
            <Pressable style={{ width: "45%" }} onPress={ () => navigation.navigate("Profile", { tToken: tToken }) }>
              <Surface style={styles.surface} elevation={4}>
                <Image source={require("../assets/icons/user2.png")} style={{ alignSelf: 'center', height: 50, width: 50 }}></Image>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}> Profile </Text>
              </Surface>
            </Pressable>
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

  surface: {
    padding: 20,
    height: 150,
    width: "100%",
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 10,
  },
});
