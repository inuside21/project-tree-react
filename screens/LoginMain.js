import { useState, useEffect } from 'react';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, ScrollView, View, VirtualizedList } from 'react-native';
import MapView from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { ActivityIndicator, Appbar, Avatar, Badge, Banner, Button, Card, Checkbox, DataTable, Dialog, Divider, FAB, Icon, IconButton, List, Modal, Portal, Provider, RadioButton, SegmentedButtons, Snackbar, Surface, Switch, Text, TextInput,  MD2Colors } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfig from '../config/config';


export default function LoginMain({ route, navigation }) {
  //const { itemId, otherParam } = route.params; https://reactnavigation.org/docs/params

  // START
  // =========================
  const [tUname, setTUname] = useState("");
  const [tPword, setTPword] = useState("");

  // modal
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modVisible, setModVisible] = useState(false);    // Modal OK
  const hideModal = () => setModVisible(false);

  // INTERACTION
  // =========================
  const onPressLogin = async () => {
    try 
    {
      const url = AppConfig.webserver + "server/api.php?mode=userlogin";
  
      /*
      // Prepare the data as an object
      const data = {
        tUname: tUname,
      };
      body: JSON.stringify(data),
      */

      // Prepare the data as FormData
      const formData = new FormData();
      formData.append('tUname', tUname);
      formData.append('tPword', tPword);

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
          if (responseData.data.length == 8)
          {
            setTUname("");
            setTPword("");
            navigation.navigate("Home", { tToken: responseData.data });
          }

          else
          {
            onPressShowModal("Request Failed", "Token Invalid");
          }
        }

        // error
        else
        {
          onPressShowModal(responseData.title, responseData.message);
        }
      } 
      else 
      {
        onPressShowModal("Request Failed", "Reload the App");
        console.error('Error:', response.status, response.statusText);
      }
    } 
    catch (error) 
    {
      onPressShowModal("Request Failed", "Reload the App");
      console.error('Error:', error.message);
    }
  }

  const onPressRegister = () => {
    navigation.navigate("Register");
  }

  const onPressShowModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModVisible(true);
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
            <Text style={{ color: AppConfig.whiteColor, fontSize: 50, fontWeight: 'bold' }}>Login</Text>

            <Surface style={styles.surface} elevation={4}>
              <View style={{ flex: 1, width: "100%" }}>

                <TextInput
                  label="Username"
                  mode="outlined"
                  value={tUname}
                  onChangeText={text => setTUname(text)}
                  right={<TextInput.Icon icon="account" color={AppConfig.mainColor} size={30} />}
                  style={{ borderRadius: 25, height: 60, marginVertical: 5 }}
                  outlineStyle={{ borderRadius: 25, height: 60 }}
                />

                <TextInput
                  label="Password"
                  mode="outlined"
                  value={tPword}
                  onChangeText={text => setTPword(text)}
                  secureTextEntry={true}
                  right={<TextInput.Icon icon="lock" color={AppConfig.mainColor} size={30} />}
                  style={{ borderRadius: 25, height: 60, marginVertical: 5 }}
                  outlineStyle={{ borderRadius: 25, height: 60 }}
                />

                <Button mode="contained" buttonColor={AppConfig.mainColor} textColor={AppConfig.whiteColor} onPress={() => onPressLogin()} contentStyle={{ flexDirection: "row-reverse", height: "100%" }}  labelStyle={{ fontSize: 20, fontWeight: "bold" }} style={{ height: 60, borderRadius: 20, marginVertical: 10 }}>
                  Login
                </Button>
                <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center", marginTop: 10, }}>Don't have an account?</Text>
                <Button mode="contained" buttonColor={AppConfig.mainColor} textColor={AppConfig.whiteColor} onPress={() => onPressRegister()} contentStyle={{ flexDirection: "row-reverse", height: "100%" }}  labelStyle={{ fontSize: 20, fontWeight: "bold" }} style={{ height: 60, borderRadius: 20, marginVertical: 10 }}>
                  Register
                </Button>
              </View>
              
            </Surface>
            
          </View>
        </ScrollView>

        { /* Modal OK */}
        <Modal visible={modVisible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }} style={{ marginHorizontal: 10, }}>
          <Text style={{ color: AppConfig.mainColor, fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>{ modalTitle }</Text>
          <Text style={{ fontSize: 20 }}>{ modalMessage }</Text>

          <Button mode="contained" buttonColor={AppConfig.mainColor} onPress={() => hideModal()} contentStyle={{ flexDirection: "row-reverse", height: "100%" }}  labelStyle={{ fontSize: 20 }} style={{ height: 40, borderRadius: 10, marginTop: 30, }}>
            OK
          </Button>
        </Modal>

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
    marginTop: 50,
    padding: 20,
    height: 400,
    width: "100%",
    alignItems: 'center',
    borderRadius: 25,
  },
});
