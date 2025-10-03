import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function UserDetail() {
  const { id, name, email, company } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <Text>Company: {company}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
