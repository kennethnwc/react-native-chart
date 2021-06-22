import { curveBasis, curveStepAfter, line, scaleLinear, scaleTime } from "d3";
import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { Defs, LinearGradient, Path, Stop, Svg } from "react-native-svg";
import { Cursor } from "./Cursor";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { parse, serialize } from "react-native-redash";
import { Header } from "./Header";

const data = [
  { x: new Date(2018, 9, 1), y: 0 },
  { x: new Date(2018, 9, 16), y: 0 },
  { x: new Date(2018, 9, 17), y: 200 },
  { x: new Date(2018, 10, 1), y: 200 },
  { x: new Date(2018, 10, 2), y: 300 },
  { x: new Date(2018, 10, 5), y: 300 },
];

const height = 200;
const { width } = Dimensions.get("window");
const verticalPadding = 5;
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function App() {
  const scaleX = scaleTime()
    .domain([new Date(2018, 9, 1), new Date(2018, 10, 5)])
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain([0, 300])
    .range([height - verticalPadding, verticalPadding]);

  const path = parse(
    line<{ x: Date; y: number }>()
      .x((d) => scaleX(d.x))
      .y((d) => scaleY(d.y))
      .curve(curveStepAfter)(data) || ""
  );

  const animatedProps = useAnimatedProps(() => {
    return { d: serialize(path) };
  });

  const current = useSharedValue({ path: path });
  const y = useSharedValue(0);
  const sharedY = useSharedValue(scaleY);
  console.log(sharedY);
  return (
    <View style={styles.container}>
      <Header y={y} scaleY={sharedY} />
      <View>
        <Svg width={width} height={height}>
          <AnimatedPath
            animatedProps={animatedProps}
            fill="transparent"
            stroke="#367be2"
            strokeWidth={5}
          />
        </Svg>
        <Cursor data={current} y={y} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 60,
  },
});
