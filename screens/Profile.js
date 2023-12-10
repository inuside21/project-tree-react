import { useState, useEffect } from 'react';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, ScrollView, View, VirtualizedList } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { ActivityIndicator, Appbar, Avatar, Badge, Banner, Button, Card, Checkbox, DataTable, Dialog, Divider, FAB, Icon, IconButton, List, Modal, Portal, Provider, RadioButton, SegmentedButtons, Snackbar, Surface, Switch, Text, TextInput,  MD2Colors } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfig from '../config/config';


export default function Profile({ route, navigation }) {
  const { tToken } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState({});

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
      LoadInsight();
    });

    return unsubscribe;
  }, [navigation]);

  const LoadInsight = async () => {
    setIsLoading(true);

    try 
    {
      const url = AppConfig.webserver + "server/api.php?mode=userview";
  
      /*
      // Prepare the data as an object
      const data = {
        tUname: tUname, 
      };
      body: JSON.stringify(data),
      */

      // Prepare the data as FormData
      const formData = new FormData();
      formData.append('tToken', tToken);

      // Use Promise.race to implement the timeout
      const timeoutDuration = 10000;
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeoutDuration)
      );
  
      // Send the POST request with a timeout
      const response = await Promise.race([
        fetch(url, {
          method: 'POST',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
          body: formData,
        }),
        timeoutPromise,
      ]);
  
      // Check if the request was successful
      if (response.ok) 
      {
        const responseData = await response.json();
        console.log('Response from server:', responseData);

        // ok
        if (responseData.status == "ok")
        {
          setUserData(responseData.data);
        }

        // error
        else
        {
        }

        setIsLoading(false);
      } 
      else 
      {
        setIsLoading(false);
        console.error('Error:', response.status, response.statusText);
      }
    } 
    catch (error) 
    {
      setIsLoading(false);
      console.error('Error:', error.message);
    }
  }


  // VIEW
  // =========================
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/bg2.png")} resizeMode="cover" style={styles.imageBg}>

        <Appbar.Header mode='center-aligned'>
          <Appbar.BackAction onPress={ () => navigation.goBack() } color={AppConfig.mainColor} />
          <Appbar.Content title="Profile" />
        </Appbar.Header>

        { /* Loading */ 
          isLoading ? ( 
            <ScrollView style={{ flex: 1, }} contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
              <ActivityIndicator animating={true} color={AppConfig.whiteColor} /> 
            </ScrollView>
          ) : (
            <ScrollView style={{ flex: 1, }} contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
                <View style={{ flex: 1, justifyContent: "flex-start" }}>
                  <Image source={userData.userpic} style={{ alignSelf: 'center', height: 200, width: 200, borderRadius: 100, alignSelf: "center", marginTop: 50 }}></Image>

                  <Text style={{ color: AppConfig.whiteColor, fontSize: 40, fontWeight: 'bold', textTransform: "capitalize", alignSelf: "center", marginTop: 20 }}>{userData.user_fname}</Text>
                  <Text style={{ color: AppConfig.whiteColor, fontSize: 20, marginTop: 10, alignSelf: "center" }}>@{userData.user_uname}</Text>
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
          <Appbar.Action icon={require("../assets/icons/home2.png")} onPress={() => navigation.navigate("Home", { tToken: tToken })} size={35} />
          <Appbar.Action icon={require("../assets/icons/box3.png")} onPress={() => navigation.navigate("Menu", { tToken: tToken })} size={35} />
          <Appbar.Action icon={require("../assets/icons/logout.png")} onPress={() => navigation.navigate("LoginMain")} size={35} />
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
