import { Text } from "react-native";
const MealDetailScreen = ({ route }) => {
  const { mealId } = route.params;
  return <Text>This is meal detail - {mealId}</Text>;
};

export default MealDetailScreen;
