import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLayoutEffect } from "react";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
// import { FavoritesContext } from "../store/context/favorites-context";

const MealDetailScreen = ({ route, navigation }) => {
  // const favoriteMealsContext = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();
  const { mealId } = route.params;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  // const mealIsFavorite = favoriteMealsContext.ids.includes(mealId);
  const mealIsFavorite = favoriteMealIds.includes(mealId);

  const changeFavoriteStatusHandler = () => {
    if (mealIsFavorite) {
      // favoriteMealsContext.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      // favoriteMealsContext.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            name={mealIsFavorite ? "star" : "star-outline"}
            onPress={changeFavoriteStatusHandler}
            color="white"
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.rootContainer}
    >
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.outerListContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listContainer: {
    width: "80%",
    // marginHorizontal: 40,
  },
  outerListContainer: {
    alignItems: "center",
  },
});
