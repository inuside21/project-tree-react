import { useState, useEffect } from 'react';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, ScrollView, View, VirtualizedList } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { ActivityIndicator, Appbar, Avatar, Badge, Banner, Button, Card, Checkbox, DataTable, Dialog, Divider, FAB, Icon, IconButton, List, Modal, Portal, Provider, RadioButton, SegmentedButtons, Snackbar, Surface, Switch, Text, TextInput,  MD2Colors } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfig from '../config/config';


export default function About({ route, navigation }) {
  const { tToken, treeId } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const [treeData, setTreeData] = useState({});

  // START
  // =========================
  const { bottom } = useSafeAreaInsets();
  const BOTTOM_APPBAR_HEIGHT = 80;


  // INTERACTION
  // =========================


  // FUNCTIONS
  // =========================
  // Load Data
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
    });

    return unsubscribe;
  }, [navigation]);


  // VIEW
  // =========================
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/bg2.png")} resizeMode="cover" style={styles.imageBg}>

        <Appbar.Header mode='center-aligned'>
          <Appbar.BackAction onPress={ () => navigation.goBack() } color={AppConfig.mainColor} />
          <Appbar.Content title="About Us" />
        </Appbar.Header>

        { /* Loading */ 
          isLoading ? ( 
            <ScrollView style={{ flex: 1, }} contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
              <ActivityIndicator animating={true} color={AppConfig.whiteColor} /> 
            </ScrollView>
          ) : (
            <ScrollView style={{ flex: 1, }} contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
                <View style={{ flex: 1, justifyContent: "flex-start" }}>
                  <Image source={require("../assets/icons/pic1.png")} style={{ alignSelf: 'center', height: 400, width: 400, marginVertical: -50 }}></Image>

                  <Text style={{ color: AppConfig.whiteColor, fontSize: 40, fontWeight: 'bold' }}>About Us</Text>
                  <Text style={{ color: AppConfig.whiteColor, fontSize: 20, marginTop: 10}}>The real-time tree fall detection system captures the tilting angles and direction of tree displacement using smart sensing technology.</Text>
                  <Text style={{ color: AppConfig.whiteColor, fontSize: 20, marginTop: 20 }}>It also sends out alerts and alarms to the stakeholders based on the dynamic thresholds. All these are achieved by a combination of the state-of-the-art loT sensors, data analytics and an interactive dashboard.</Text>
                </View>
            </ScrollView>
          )
        }

        <Appbar
          style={[
            styles.bottom,
            {
              height: BOTTOM_APPBAR_HEIGHT + bottom,
              backgroundColor: AppConfig.whiteColor,
              justifyContent: "space-evenly"
            },
          ]}
          safeAreaInsets={{ bottom }}
        >
          <Appbar.Action icon={require("../assets/icons/chart2.png")} onPress={() => navigation.navigate("Insight", { tToken: tToken })} size={35} />
          <Appbar.Action icon={require("../assets/icons/home2.png")} onPress={() => navigation.navigate("Home", { tToken: tToken })} size={35} />
          <Appbar.Action icon={require("../assets/icons/box3.png")} onPress={() => navigation.navigate("Menu", { tToken: tToken })} size={35} />
        </Appbar>

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

  bottom: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  surface: {
    borderRadius: 25,
    height: 150,
    width: "100%",
    justifyContent: "center",
    marginVertical: 75,
    padding: 20,
  },

  surfaceTree: {
    borderRadius: 20,
    width: "45%",
    alignItems: "center",
    marginVertical: 1,
    padding: 5,
  },
});
