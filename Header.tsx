import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useDerivedValue,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
const { width } = Dimensions.get("window");

type Props = {
  y: Animated.SharedValue<number>;
  x: Animated.SharedValue<number>;
  minMaxTime: { minTime: number; maxTime: number };
};

export const Header = ({ y, x, minMaxTime }: Props) => {
  const price = useDerivedValue(() => {
    const p = interpolate(y.value, [200, 0], [0, 300]);
    return `$ ${p.toLocaleString()}`;
  });
  const date = useDerivedValue(() => {
    const d = interpolate(
      x.value,
      [20, 335],
      [minMaxTime.minTime, minMaxTime.maxTime]
    );
    return `${new Date(d).toUTCString()}`;
  });

  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <View>
          <Text style={styles.label}>HKD</Text>
          <ReText text={price}></ReText>
          <ReText text={date}></ReText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  values: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontWeight: "500",
    fontSize: 24,
  },
  label: {
    fontSize: 18,
  },
});
