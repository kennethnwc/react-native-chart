import { curveBasis, line, scaleLinear, scaleTime } from "d3";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";
import { getYForX, parse, serialize } from "react-native-redash";
import { Path, Svg } from "react-native-svg";
import { Cursor } from "./Cursor";
import { Header } from "./Header";

const data = [
  { x: new Date(2018, 9, 1).getTime(), y: 0 },
  { x: new Date(2018, 9, 16).getTime(), y: 0 },
  { x: new Date(2018, 9, 17).getTime(), y: 200 },
  { x: new Date(2018, 10, 1).getTime(), y: 200 },
  { x: new Date(2018, 10, 2).getTime(), y: 300 },
  { x: new Date(2018, 10, 5).getTime(), y: 300 },
];

const height = 200;
const { width } = Dimensions.get("window");
const verticalPadding = 5;
const AnimatedPath = Animated.createAnimatedComponent(Path);

export const margin = { left: 20, right: 20 };
export const innerWidth = width - margin.left - margin.right;

export default function App() {
  const minTime = new Date(2018, 9, 1).getTime();
  const maxTime = new Date(2018, 10, 5).getTime();
  const scaleX = scaleTime()
    .domain([minTime, maxTime])
    .range([margin.left, innerWidth]);
  const scaleY = scaleLinear().domain([0, 300]).range([height, 0]);

  const path = parse(
    line<{ x: number; y: number }>()
      .x((d) => scaleX(d.x))
      .y((d) => scaleY(d.y))
      .curve(curveBasis)(data) || ""
  );

  const animatedProps = useAnimatedProps(() => {
    return { d: serialize(path) };
  });

  const current = useSharedValue({ path: path });

  const x = useSharedValue(innerWidth);
  const y = useSharedValue(getYForX(path, x.value)!);

  return (
    <View style={styles.container}>
      <Header y={y} x={x} minMaxTime={{ minTime, maxTime }} />
      <View>
        <Svg width={innerWidth} height={height}>
          <AnimatedPath
            animatedProps={animatedProps}
            fill="transparent"
            stroke="#367be2"
            strokeWidth={5}
          />
        </Svg>
        <Cursor data={current} y={y} x={x} />
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
