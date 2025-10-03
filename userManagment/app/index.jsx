import { 
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  Platform,
} from "react-native";
import { Link, TextInput } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import profilee from "@/assets/images/profile.jpg";
const theApp = () => {
  //magjia Api
   const [data, setData] = useState([]);

   //data fetch 
  const getApiData = async () => {
    const url = "https://jsonplaceholder.typicode.com/users";
    let result = await fetch(url);
    result = await result.json();
    setData(result);
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    // <SafeAreaView>   
     <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User management</Text>

        {/* //fillimi i linkut */}
        <Link href="/AddUser" asChild>
          <Pressable style={styles.butoni}>
            <Text style={{ color: "#448CDA"}}>
              Add User
              </Text>
              <FontAwesome5 style={styles.plusIcona} name="plus" />
            
          </Pressable>
        </Link>
        {/* fundi ti linkut */}
      </View>
      {/* fundi ti header */}

      <View>
        <FlatList
          data={data}
          
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.containerList}>

              <View>
                <Image
                  source={profilee}
                  style={styles.image}
                />
              </View>

              <View>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.company?.name}</Text>
              
              </View>
            </View>
          )}
        />
      </View>
    </View>
    

  );
};

export default theApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F2F2F2",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    backgroundColor: "#F2F2F2",
    gap: 70,
    marginTop: 100,
  },
  headerText: {
    color: "#448CDA",
    fontSize: 20,
    paddingBottom: 70,
  },
  butoni: {
    borderWidth: 2,
    flexDirection: "row",
    
    alignSelf: "center",
    alignItems:"center",
    gap:6,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#448CDA",
  },
  plusIcona: {
    color: "#448CDA",
    fontSize: 19,
    
  },

  // stilizimi per kta listat
  containerList: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#448CDA",
    backgroundColor: "#fff",
    marginBottom: 30,
    alignItems: "center",
    marginTop: 30,
flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignSelf: "center",

  },
  image: {
   width: 100,
    height: 100, 
   borderRadius: 25
  },
});
