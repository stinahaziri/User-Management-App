import { 
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  Platform,
  ActivityIndicatorBase,
} from "react-native";
import { Link} from "expo-router";
import { TextInput,ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import{filter} from "lodash.filter";
import profilee from "@/assets/images/profile.jpg";
import { UserContext } from "@/app/UserContext";

const theApp = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setQuery] = useState("");

  const [apiUsers, setApiUsers] = useState([]);
  const [allApiUsers, setAllApiUsers] = useState([]); // kopje origjinale

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setApiUsers(data);
        setAllApiUsers(data);
        setLoading(false);
      });
  }, []);

  const contains = (user, query) => {
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      (user.company?.name?.toLowerCase().includes(query) ?? false)
    );
  };

  const handleSearch = (query) => {
    setQuery(query);
    const formattedQuery = query.toLowerCase();

    // filtro user-at lokalë
    const filteredLocal = user.filter(u => contains(u, formattedQuery));
    // filtro user-at nga API
    const filteredApi = allApiUsers.filter(u => contains(u, formattedQuery));

    setApiUsers(filteredApi);
    setFilteredLocalUsers(filteredLocal);
  };

  const [filteredLocalUsers, setFilteredLocalUsers] = useState([]);

  const data = searchQuery
    ? [...filteredLocalUsers, ...apiUsers]
    : [...user, ...allApiUsers];

  if(isLoading){
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <ActivityIndicator size={"large"} color="#5500dc"/>
      </View>
    )
  }
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
  <TextInput
   style={styles.search}
    placeholder="Search.."
    placeholderTextColor="#888"
    clearButtonMode="always"
    autoCapitalize="none"
    autoCorrect={false}
    value={searchQuery}
    onChangeText={handleSearch}
    />
</View>
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
    // alignItems: "center",
    marginBottom:230
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
  search:{
height:50,
width:"80%",
 borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#000",
    alignSelf: "center",
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
