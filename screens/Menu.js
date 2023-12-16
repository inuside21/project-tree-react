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


export default function Menu({ route, navigation }) {
  const { tToken } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      LoadUser();
    });

    return unsubscribe;
  }, [navigation]);

  const LoadUser = async () => {
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
                {
                  userData && userData.user_logfire && Number(userData.user_logfire) > 0 ?
                  (
                    <Badge style={{ marginTop: -30 }} size={30}>{userData.user_logfire}</Badge>
                  ) : null
                }
                <Image source={require("../assets/icons/fire.png")} style={{ alignSelf: 'center', height: 50, width: 50 }}></Image>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}> Fire </Text>
              </Surface>
            </Pressable>
            
            <Pressable style={{ width: "45%" }} onPress={ () => navigation.navigate("Fall", { tToken: tToken }) }>
              <Surface style={styles.surface} elevation={4}>
                {
                  userData && userData.user_logfall && Number(userData.user_logfall) > 0 ? 
                  (
                    <Badge style={{ marginTop: -30 }} size={30}>{userData.user_logfall}</Badge>
                  ) : null
                }
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
                {
                  userData && userData.user_logmain && Number(userData.user_logmain) > 0 ?
                  (
                    <Badge style={{ marginTop: -30 }} size={30}>{userData.user_logmain}</Badge>
                  ) : null
                }
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
