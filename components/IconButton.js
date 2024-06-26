import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ name, color, onPress }) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
        // android_ripple={{ color: "#ccc" }}
      >
        <Ionicons name={name} size={24} color={color} />
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {},
  icon: {},
  pressed: {
    opacity: 0.7,
  },
});
