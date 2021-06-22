import { ScaleLinear } from "d3";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

type Props = {
  y: Animated.SharedValue<number>;
  scaleY: Animated.SharedValue<ScaleLinear<number, number, never>>;
};

export const Header = ({ y, scaleY }: Props) => {
  const price = useDerivedValue(() => {
    scaleY.value(y.value) + "";
  });
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <View>
          <ReText style={styles.value} text={price} />
          <Text style={styles.label}>HKD</Text>
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
