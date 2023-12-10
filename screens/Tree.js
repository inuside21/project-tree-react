import { useState, useEffect } from 'react';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, ScrollView, View, VirtualizedList } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { ActivityIndicator, Appbar, Avatar, Badge, Banner, Button, Card, Checkbox, DataTable, Dialog, Divider, FAB, Icon, IconButton, List, Modal, Portal, Provider, RadioButton, SegmentedButtons, Snackbar, Surface, Switch, Text, TextInput,  MD2Colors } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfig from '../config/config';


export default function Tree({ route, navigation }) {
  const { tToken, treeId } = route.params;
  const [isLoading, setIsLoading] = useState(true);

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
      LoadInsight();
    });

    return unsubscribe;
  }, [navigation]);

  const LoadInsight = async () => {
    setIsLoading(true);

    try 
    {
      const url = AppConfig.webserver + "server/api.php?mode=treeview";
  
      /*
      // Prepare the data as an object
      const data = {
        tUname: tUname, 
      };
      body: JSON.stringify(data),
      */

      // Prepare the data as FormData
      const formData = new FormData();
      formData.append('treeId', treeId);

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
          setTreeData(responseData.data);
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

  const DataReportHolder = (data) => {
    return (
      <Surface style={styles.surface} elevation={4}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{data.dev_message}</Text>
        <Text style={{ fontSize: 12, }}>{data.dev_date}</Text>
      </Surface>
    );
  }

  const DataTreeHolder = (data) => {
    return (
      <Pressable style={{ height: 110 }}>
        <Surface style={styles.surfaceTree} elevation={4}>
          <Image source={data.dev_image + "?v=" + new Date()} style={{ alignSelf: 'center', height: 75, width: 75, borderRadius: 20, marginBottom: 5 }}></Image>
          <Text style={{ fontSize: 12, textAlign: "center" }}>{data.dev_name}</Text>
        </Surface>
      </Pressable>
    );
  }

  // VIEW
  // =========================
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/bg2.png")} resizeMode="cover" style={styles.imageBg}>

        <Appbar.Header mode='center-aligned'>
          <Appbar.BackAction onPress={ () => navigation.goBack() } color={AppConfig.mainColor} />
          <Appbar.Content title="Tree Monitored" />
        </Appbar.Header>

        { /* Loading */ 
          isLoading ? ( 
            <ScrollView style={{ flex: 1, }} contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
              <ActivityIndicator animating={true} color={AppConfig.whiteColor} /> 
            </ScrollView>
          ) : (
            <ScrollView style={{ flex: 1, }} contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
                <View style={{ flex: 1, justifyContent: "flex-start" }}>
                  <Image source={treeData.dev_image + "?v=" + new Date()} style={{ alignSelf: 'center', height: 300, width: 300, marginTop: 15, }}></Image>
                  <Text style={{ color: AppConfig.whiteColor, fontSize: 25, fontWeight: 'bold', marginTop: 20, marginBottom: 10, alignSelf: "center" }}>{treeData.dev_desc}</Text>

                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: AppConfig.whiteColor, fontSize: 15 }}>Tree Type</Text>
                    <Text style={{ color: AppConfig.whiteColor, fontSize: 15 }}>{treeData.dev_treetype}</Text>
                  </View>
                  <View style={{flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: AppConfig.whiteColor, fontSize: 15 }}>Age</Text>
                    <Text style={{ color: AppConfig.whiteColor, fontSize: 15 }}>{treeData.dev_treeage}</Text>
                  </View>
                  <View style={{flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: AppConfig.whiteColor, fontSize: 15 }}>Location</Text>
                    <Text style={{ color: AppConfig.whiteColor, fontSize: 15 }}>{treeData.dev_treeloc}</Text>
                  </View>

                  <Text style={{ color: AppConfig.whiteColor, fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Description</Text>
                  <Text style={{ color: AppConfig.whiteColor, fontSize: 15 }}>{treeData.dev_treedesc}</Text>
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
    height: 50,
    width: "100%",
    justifyContent: "center",
    marginVertical: 1,
    padding: 5,
  },

  surfaceTree: {
    borderRadius: 20,
    width: "45%",
    alignItems: "center",
    marginVertical: 1,
    padding: 5,
  },
});
