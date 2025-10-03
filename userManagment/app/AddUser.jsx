import { Image } from "expo-image";
import { Alert, Platform, StyleSheet } from "react-native";
import { Fonts } from "@/constants/theme";
import { View, Text, Button, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { useState, useContext } from "react";
import { useRouter } from "expo-router";
import { UserContext } from "@/app/UserContext";

export default function AddUser() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!name || !email) {
      alert("Name and email are required!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      company: { name: companyName },
    };

    setUser([newUser, ...user]);

    router.push("/");
  };

  return (
    // style={styles.container}
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.label}>Enter your name here:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.inputet}
          placeholder="Enter Your Name..."
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.label}>
        <Text>Enter your email here:</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.inputet}
          placeholder="Enter Your Email..."
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.label}>
        <Text>Enter your company name here:</Text>

        <TextInput
          value={companyName}
          onChangeText={setCompanyName}
          style={styles.inputet}
          placeholder="Enter Your Companys name.."
          placeholderTextColor="#888"
        />
      </View>
      <Pressable style={styles.butoni} onPress={handleSubmit}>
        <Text style={styles.butoniText}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    padding: 20,
  },
  label: {
    fontSize: 15,
    color: "#333",
    
    marginBottom: 6,
    fontWeight: "500",
  },
  inputet: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 14,
    color: "#000",
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  butoni: {
    backgroundColor: "#448CDA",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  butoniText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
