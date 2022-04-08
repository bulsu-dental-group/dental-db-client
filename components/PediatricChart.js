import Svg, { Path, Ellipse, Text, TSpan } from "react-native-svg"

const black = "#000"
const red = "red"

export function PediatricChart({value, onChange}){

    function handlePress(i){
        onChange(value.map((val, k) => (i === k ? !val : val)))
    }

    return (
        <Svg
            width={350}
            height={560}
            viewBox="0 0 400 1100"
            id="svg6183"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.00941,
            }}
            onPress={() => handlePress(0)}
            cx={44.7}
            cy={296.7}
            rx={41.9}
            ry={51.2}
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 0.923588,
            }}
            onPress={() => handlePress(1)}
            cx={63.6}
            cy={206.1}
            rx={33}
            ry={37.5}
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.01958,
            }}
            onPress={() => handlePress(2)}
            cx={92.3}
            cy={143}
            rx={25.7}
            ry={28.2}
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 0.985974,
            }}
            onPress={() => handlePress(3)}
            cx={129.5}
            cy={100.8}
            rx={25.4}
            ry={27.9}
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 0.944743,
            }}
            onPress={() => handlePress(4)}
            cx={178.8}
            cy={81.1}
            rx={25.4}
            ry={31.2}
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.00276,
            }}
            onPress={() => handlePress(19)}
            cx={39.9}
            cy={414.1}
            rx={39.7}
            ry={48.9}
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.11195,
            }}
            onPress={() => handlePress(18)}
            cx={61.1}
            cy={501}
            rx={32.4}
            ry={40.4}
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.13349,
            }}
            onPress={() => handlePress(17)}
            cx={97.8}
            cy={561.1}
            rx={26.6}
            ry={27.1}
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.03115,
            }}
            onPress={() => handlePress(16)}
            cx={135.2}
            cy={601.5}
            rx={23.7}
            ry={28.7}
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.02863,
            }}
            onPress={() => handlePress(15)}
            cx={182.3}
            cy={617.2}
            rx={21.8}
            ry={26.9}
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.00941,
            }}
            onPress={() => handlePress(9)}
            cx={-366.1}
            cy={296.7}
            rx={41.9}
            ry={51.2}
            transform="scale(-1 1)"
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 0.923588,
            }}
            onPress={() => handlePress(8)}
            cx={-347.1}
            cy={206.1}
            rx={33}
            ry={37.5}
            transform="scale(-1 1)"
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.01958,
            }}
            onPress={() => handlePress(7)}
            cx={-318.4}
            cy={143}
            rx={25.7}
            ry={28.2}
            transform="scale(-1 1)"
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 0.985974,
            }}
            onPress={() => handlePress(6)}
            cx={-281.3}
            cy={100.8}
            rx={25.4}
            ry={27.9}
            transform="scale(-1 1)"
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 0.944743,
            }}
            onPress={() => handlePress(5)}
            cx={-232}
            cy={81.1}
            rx={25.4}
            ry={31.2}
            transform="scale(-1 1)"
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.00276,
            }}
            onPress={() => handlePress(10)}
            cx={-370.8}
            cy={414.1}
            rx={39.7}
            ry={48.9}
            transform="scale(-1 1)"
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.11195,
            }}
            onPress={() => handlePress(11)}
            cx={-349.6}
            cy={501}
            rx={32.4}
            ry={40.4}
            transform="scale(-1 1)"
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.13349,
            }}
            onPress={() => handlePress(12)}
            cx={-312.9}
            cy={561.1}
            rx={26.6}
            ry={27.1}
            transform="scale(-1 1)"
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.03115,
            }}
            onPress={() => handlePress(13)}
            cx={-275.5}
            cy={601.5}
            rx={23.7}
            ry={28.7}
            transform="scale(-1 1)"
            />
            <Ellipse
            style={{
                fill: "#fff",
                stroke: "#fff",
                strokeWidth: 1.02863,
            }}
            onPress={() => handlePress(14)}
            cx={-228.5}
            cy={617.2}
            rx={21.8}
            ry={26.9}
            transform="scale(-1 1)"
            />
            <Path
            onPress={() => handlePress(0)}
            fill={value[0] ? red : black}
            stroke={value[0] ? red : black}
            strokeWidth={0.9}
            d="m34 243 11-1c7 0 6 1 11 2h6c7 2 15 9 20 16 5 9 7 19 7 30 0 27-11 55-40 55-26-1-35-22-39-46l-3-21c0-20 7-32 27-35Zm3 2c-9 2-17 4-22 12-6 10-5 23-4 33 4 23 8 46 32 51h10c22-3 31-23 32-45l1-8c-1-10-2-19-8-27-9-14-26-17-41-16zm5 6h2c4 7 8 6 15 7-3 6-8 3-12 7-3 3-3 8-4 12l14-2c-5 7-13 8-16 12-2 3-5 17 4 19 6 1 12-5 18 0l-17 7-3 18h-2c0-5 1-15-6-18-3-1-8 1-11 1 2-6 7-7 8-17 0-2 0-6-3-7l-9 2c3-6 14-10 14-16 0-4-5-5-7-12 10-2 11-5 15-13zm28 13c4 4 4 8 5 14 1 9 1 25-1 34-2 6-3 11-7 15l4-13 2-21-1-17-2-12z"
            />
            <Path
            onPress={() => handlePress(1)}
            fill={value[1] ? red : black}
            stroke={value[1] ? red : black}
            strokeWidth={0.9}
            d="M55 165h8c17 0 31 22 33 38 1 11-4 33-13 39-3 3-14 4-19 4l-18-3c-5 0-7 1-11-5-4-4-7-16-5-22l5-13 1-12c2-12 7-22 19-26zm1 3c-11 3-16 13-18 25v11l-6 15c0 6 3 18 9 21l22 3c5 0 14 0 18-3 5-3 9-14 11-20 1-5 2-10 1-16-1-12-11-30-23-34-4-2-9-2-14-2zm-15 43c7-1 13-5 14-14 2-8-3-16 8-19l-2 19 12-4-11 14c-2 5 0 14 1 19l-10 8 2-11-11 5 9-14H41v-3zm37-18c4 2 4 9 4 13 0 9-2 24-10 28 2-6 5-9 6-17 3-9 1-15 0-24z"
            />
            <Path
            onPress={() => handlePress(2)}
            fill={value[2] ? red : black}
            stroke={value[2] ? red : black}
            strokeWidth={0.9}
            d="M91 113c8-2 12-1 18 5 9 8 11 17 11 29-1 6-1 13-5 17-6 8-15 5-23 5-5 0-17 2-21-2s-6-13-6-18c0-18 9-33 26-36zm1 2c-11 2-16 7-21 18-2 4-3 6-3 10-1 6 1 19 6 22l6 1h21l8-1c7-3 8-14 8-22 0-15-9-30-25-28zm-17 37c0-16 7-27 22-29-3 4-6 2-12 7-6 6-7 14-8 22h-2zm2 18h1l-1 1v-1z"
            />
            <Path
            onPress={() => handlePress(3)}
            fill={value[3] ? red : black}
            stroke={value[3] ? red : black}
            strokeWidth={0.9}
            d="M104 113c-2-3-4-7-4-11 1-17 25-32 39-31l7 1 5 13 1 6c0 14 0 39-18 40l-7-1c-13-4-13-9-21-14-2-3-4-2-7-4l5 1zm30-39c-11 3-27 11-30 25-2 5 1 10 4 14 5 8 18 16 27 15 6-1 9-5 11-10 3-8 4-23 3-31l-4-10c-3-3-7-3-11-3zm-20 26c3-11 14-14 23-14-3 4-6 1-11 4-5 2-8 7-12 10z"
            />
            <Path
            onPress={() => handlePress(4)}
            fill={value[4] ? red : black}
            stroke={value[4] ? red : black}
            strokeWidth={0.9}
            d="M145 73c-2-11 5-15 13-17 12-5 20-5 32-5 4 0 10 1 12 5 2 2 2 10 2 13l-2 19c-3 16-9 29-26 24-3-1-7-2-9-4-11-8-13-16-19-27l-5-9 2 1zm31-19c-7 2-15 3-21 6-3 2-7 3-8 7s3 12 5 16c6 12 17 29 32 27 7-1 10-6 12-12 3-9 5-23 5-32l-1-8c-3-5-19-4-24-4zm-18 20c7-8 24-14 32-6-6 0-9-3-17-1-5 2-10 7-15 7z"
            />
            <Path
            onPress={() => handlePress(15)}
            fill={value[15] ? red : black}
            stroke={value[15] ? red : black}
            strokeWidth={0.9}
            d="M181 590h9c9 4 10 23 10 33 0 4 2 12 0 15-4 5-10 5-15 4-7 0-22-3-26-10-2-4 0-10 1-14 4-11 10-24 21-28zm2 3c-11 3-16 15-20 25-1 3-3 9-1 12 1 3 5 5 7 6 7 3 18 5 24 3 8-2 5-8 5-15-1-8-1-26-9-31h-6zm-14 29c4 2 8 6 13 7l9-2c-6 7-20 4-22-5z"
            />
            <Path
            onPress={() => handlePress(16)}
            fill={value[16] ? red : black}
            stroke={value[16] ? red : black}
            strokeWidth={0.9}
            d="M137 571h4c20-2 20 21 20 37 0 8-2 19-10 21-11 3-27-5-35-14-4-4-7-11-7-17 1-6 3-8 6-12l5-6c3-4 12-8 17-9zm2 3c-10 2-26 12-27 24 0 6 3 11 7 15 7 8 20 15 30 13s9-16 9-24c0-14-3-30-19-28zm-18 5h-1l1 1v-1zm2 23 11 9 13 4c-10 0-21-2-24-13z"
            />
            <Path
            onPress={() => handlePress(17)}
            fill={value[17] ? red : black}
            stroke={value[17] ? red : black}
            strokeWidth={0.9}
            d="M98 536c6-1 17-2 22 4s5 15 5 22c0 13-8 29-21 31-17 2-32-13-33-30-1-6 0-21 5-25 2-2 4-2 7-2h15zm-16 3c-8 2-9 13-9 21 1 16 14 31 29 30s20-18 20-32c0-5-1-11-4-15-6-8-18-4-27-4h-9zm-2 13h2c2 14 6 25 20 28v2c-15-1-22-15-22-30z"
            />
            <Path
            onPress={() => handlePress(18)}
            fill={value[18] ? red : black}
            stroke={value[18] ? red : black}
            strokeWidth={0.9}
            d="M68 457c8-1 18 8 20 17l1 6v5c0 8 2 8 4 15 3 10 3 24-4 32l-6 5-10 3c-16 2-34-10-41-26-3-8-4-16-4-24 0-5 1-10 3-14 2-3 7-6 11-8 6-4 19-9 26-11zm1 3c-6 1-21 8-27 11-3 2-7 4-9 8s-2 11-2 15c0 7 2 15 5 21 7 14 23 24 37 22 3 0 6-2 9-4 10-6 12-19 9-31-3-9-5-6-5-18v-9c-2-7-10-15-17-15zm-9 14h2l4 19 10-10-5 17c0 5 6 14 8 18-3 5-3 6-3 12l-6-11c-2 4-3 6-7 9l2-16-11 4c2-5 8-8 8-15 1-7-5-13-5-19 0-3 1-6 3-8zm-18 5h2c0 10-2 12 2 23 2 7 7 13 8 19-10-9-15-28-12-42z"
            />
            <Path
            onPress={() => handlePress(19)}
            fill={value[19] ? red : black}
            stroke={value[19] ? red : black}
            strokeWidth={0.9}
            d="M34 361c10-1 26 3 31 15 2 6 2 16 2 24l6 37c1 6 1 15-4 19-2 3-10 5-13 6l-13 2c-13-1-28-6-36-19-11-19-8-56 7-73 6-7 11-9 20-11zm-1 4c-21 4-29 27-29 48v8c0 15 7 29 20 35 10 4 33 8 42-1 3-3 4-8 4-13 1-15-7-28-7-43 0-7 1-16-2-22-4-11-19-13-28-12zm8 11h1c4 7 8 7 15 7-2 6-7 4-12 8-3 3-3 7-3 11l14-1c-5 6-13 6-16 11-3 4-5 17 3 19 6 2 12-4 18 0l-16 7-3 19h-3c0-6 1-16-5-18H22c2-6 7-7 8-17 1-2 0-6-3-6l-9 2c2-5 8-7 11-11 2-2 4-4 3-6 0-3-4-6-6-11 9-4 10-3 15-14zm-21 4 3 1c-7 15-7 23-7 40 0 11 2 12 4 20-6-2-7-14-7-21 0-15 0-27 7-40z"
            />
            <Path
            onPress={() => handlePress(9)}
            fill={value[9] ? red : black}
            stroke={value[9] ? red : black}
            strokeWidth={0.9}
            d="m376 243-12-1c-6 0-5 1-11 2l-5 1c-8 2-16 8-20 15-6 9-7 19-7 30 0 28 11 55 40 55 25 0 35-22 39-46l2-20c0-21-7-33-26-36zm-4 3c9 1 17 3 23 12s5 22 3 33c-3 22-8 45-32 50l-9 1c-23-3-31-23-33-45v-9c0-9 2-19 7-27 9-14 26-17 41-15zm-5 5h-2c-4 8-7 6-15 8 4 6 8 3 13 7 3 3 3 8 3 12l-14-2c5 7 13 7 16 11 2 3 5 17-4 19-5 2-12-4-17 0l16 7 3 19h3c0-6-1-16 5-18 3-1 8 0 12 1-2-7-8-8-8-18-1-2 0-6 2-6l10 2c-3-7-15-11-15-16 0-4 5-6 7-13-9-2-11-4-15-13zm-27 13c-4 4-5 9-6 15-1 9 0 24 2 34 1 6 2 10 7 14l-4-12-3-21 2-17 2-13z"
            />
            <Path
            onPress={() => handlePress(8)}
            fill={value[8] ? red : black}
            stroke={value[8] ? red : black}
            strokeWidth={0.9}
            d="M355 166h-9c-16 0-31 21-32 38-1 11 3 32 12 39 4 3 14 4 19 3l19-2c4-1 6 0 11-5 3-5 6-16 5-22l-6-13v-13c-2-11-8-22-19-25zm-2 3c11 2 17 13 18 24l1 11c1 5 5 11 5 16 1 6-3 17-8 20-3 2-19 3-23 3-5 0-13 0-17-2-5-4-10-14-11-20l-2-17c2-12 12-30 23-34 5-2 9-2 14-1zm16 42c-8-1-13-4-15-13-1-9 3-17-8-20l3 19-13-4 12 14c2 5 0 14-1 19l10 9-2-12 10 5-8-14h12v-3zm-38-18c-3 3-3 9-3 13 0 9 2 24 9 29-1-6-4-9-6-17-2-10-1-16 0-25z"
            />
            <Path
            onPress={() => handlePress(7)}
            fill={value[7] ? red : black}
            stroke={value[7] ? red : black}
            strokeWidth={0.9}
            d="M319 113c-8-1-12-1-18 5-10 8-11 17-11 30 0 5 1 12 5 17 6 7 14 4 22 4 6 0 18 2 22-2 3-4 5-12 5-18 1-17-9-32-25-36zm-2 3c11 2 16 6 21 17l4 11c0 6-1 18-7 22l-6 1h-21l-7-1c-8-4-9-15-8-22 0-16 8-30 24-28zm18 36c-1-15-7-27-22-29 3 5 5 2 11 8s8 13 9 21h2zm-3 18h-1l1 1v-1z"
            />
            <Path
            onPress={() => handlePress(6)}
            fill={value[6] ? red : black}
            stroke={value[6] ? red : black}
            strokeWidth={0.9}
            d="M306 113c1-3 3-7 3-11 0-17-24-31-38-30l-7 1-6 12v7c-1 13-1 39 17 39l7-1c13-3 14-9 21-14 3-2 4-1 7-4l-4 1zm-31-38c12 2 28 11 31 24 1 6-1 10-4 14-6 8-19 17-28 15-6-1-9-4-11-10-3-7-4-22-2-30 0-3 1-8 3-10 3-3 7-4 11-3zm20 25c-3-11-13-14-23-14 3 4 6 2 12 5l11 9z"
            />
            <Path
            onPress={() => handlePress(5)}
            fill={value[5] ? red : black}
            stroke={value[5] ? red : black}
            strokeWidth={0.9}
            d="M265 74c2-11-5-15-14-18-12-4-19-4-32-4-4 0-9 0-12 4-2 3-1 10-1 14l2 19c3 15 9 28 26 24l9-5c10-8 12-15 18-27l5-8-1 1zm-31-19c7 1 15 3 21 6 3 1 6 3 7 6 1 4-3 12-4 16-6 13-18 30-33 27-7-1-9-5-12-12-3-8-5-23-5-32l1-7c3-6 19-5 25-4zm17 20c-6-9-24-15-32-6 7-1 10-3 18-1 5 1 9 6 14 7z"
            />
            <Path
            onPress={() => handlePress(14)}
            fill={value[14] ? red : black}
            stroke={value[14] ? red : black}
            strokeWidth={0.9}
            d="M229 590h-9c-9 4-10 24-11 33 0 4-2 12 1 16s10 4 14 4c8 0 22-3 26-11 3-4 0-9-1-14-3-11-9-24-20-28zm-2 3c10 3 16 15 19 25 1 4 3 9 2 12l-8 7c-6 2-17 4-24 3-7-3-4-9-4-15 0-8 1-27 8-31 2-2 4-1 7-1zm14 29c-4 3-8 7-13 7-3 1-7-1-10-1 6 7 20 3 23-6z"
            />
            <Path
            onPress={() => handlePress(13)}
            fill={value[13] ? red : black}
            stroke={value[13] ? red : black}
            strokeWidth={0.9}
            d="M272 571h-3c-20-1-20 22-20 38 0 7 1 18 9 20 12 3 28-5 35-14 4-4 8-10 7-17 0-5-3-8-6-12l-4-6-18-9zm-1 3c10 2 25 12 26 24 1 6-2 11-6 15-7 8-20 16-31 14-9-2-9-17-9-25 0-14 3-30 20-28zm17 5h1l-1 1v-1zm-2 23-11 9-12 4c9 0 20-1 23-13z"
            />
            <Path
            onPress={() => handlePress(12)}
            fill={value[12] ? red : black}
            stroke={value[12] ? red : black}
            strokeWidth={0.9}
            d="M312 536c-7-1-18-1-23 5-4 5-4 14-4 21 0 14 7 29 21 31 16 2 31-13 33-30 1-6-1-21-6-25l-6-1-15-1zm16 3c7 3 9 14 8 21 0 16-13 31-28 30-16 0-21-18-21-32 0-4 1-11 4-15 6-7 19-4 27-4h10zm1 14h-1c-2 14-6 25-20 27v2c15-1 21-14 21-29z"
            />
            <Path
            onPress={() => handlePress(11)}
            fill={value[11] ? red : black}
            stroke={value[11] ? red : black}
            strokeWidth={0.9}
            d="M342 457c-9 0-18 8-21 17v11c0 9-2 9-5 16-2 10-2 23 5 31l6 5 9 3c16 3 35-10 41-25 4-8 4-16 4-25 0-4 0-9-2-13-3-4-7-7-11-9l-26-11zm-1 3c5 1 21 8 26 11 4 2 8 5 10 9s2 10 2 15c-1 7-2 15-5 21-7 13-23 23-38 21-3 0-6-1-8-3-11-7-12-20-9-32 2-9 4-6 5-18v-8c2-8 10-15 17-16zm9 14h-2l-5 19-9-10 5 18c-1 5-6 13-9 18 3 4 4 5 4 11l6-10c2 4 2 6 6 8l-2-16 12 5c-3-6-9-9-9-16 0-6 6-13 6-18 0-4-2-6-3-9zm17 6h-2c1 10 2 12-1 22-2 8-7 14-8 19 10-8 14-28 11-41z"
            />
            <Path
            onPress={() => handlePress(10)}
            fill={value[10] ? red : black}
            stroke={value[10] ? red : black}
            strokeWidth={0.9}
            d="M376 361c-11-1-27 4-31 15-3 7-2 17-2 24l-7 37c-1 6 0 15 4 19 3 3 10 5 14 6 4 2 8 3 12 2 14 0 28-6 36-18 12-20 9-57-6-73-6-7-12-10-20-12zm1 4c20 5 29 28 29 48v9c0 14-8 28-20 34-10 5-34 8-42 0-4-4-5-9-5-13 0-15 7-29 7-44 0-7-1-16 2-22 4-10 19-13 29-12zm-8 11h-2c-4 8-8 7-15 8 2 6 8 3 12 7 3 3 3 8 4 12l-14-2c4 7 12 7 16 12 2 3 5 16-4 18-6 2-12-4-17 0l16 7 3 19h3c0-5-1-15 4-17 3-2 9 0 12 0-2-7-7-8-8-17 0-3 0-6 3-7l10 2c-3-5-8-7-12-11-1-1-3-3-3-6l7-11c-10-4-10-3-15-14zm20 4-3 1c8 15 8 24 7 41 0 10-2 11-4 20 6-3 7-15 7-21 0-15 0-27-7-41z"
            />
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={-37.2}
            y={313.3}
            fill="#000"
            id="text28013"
            >
            <TSpan
                id="tspan10829"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={-37.2}
                y={313.3}
            >
                {"A"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={-13}
            y={215.9}
            fill="#000"
            id="text28016"
            >
            <TSpan
                id="tspan10829-2"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={-13}
                y={215.9}
            >
                {"B"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={29.9}
            y={128.8}
            fill="#000"
            id="text28019"
            >
            <TSpan
                id="tspan10829-9"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={29.9}
                y={128.8}
            >
                {"C"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={85.5}
            y={71.2}
            fill="#000"
            id="text28022"
            >
            <TSpan
                id="tspan10829-1"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={85.5}
                y={71.2}
            >
                {"D"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={157}
            y={44.1}
            fill="#000"
            id="text28025"
            >
            <TSpan
                id="tspan10829-24"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={157}
                y={44.1}
            >
                {"E"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={-450.2}
            y={314.7}
            fill="#000"
            transform="scale(-1 1)"
            id="text28028"
            >
            <TSpan
                id="tspan10829-3"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={-450.2}
                y={314.7}
            >
                {"A"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={287.6}
            y={68.2}
            fill="#000"
            id="text28031"
            >
            <TSpan
                id="tspan10829-1-4"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={287.6}
                y={68.2}
            >
                {"D"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={217.9}
            y={42.6}
            fill="#000"
            id="text28034"
            >
            <TSpan
                id="tspan10829-24-4"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={217.9}
                y={42.6}
            >
                {"E"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={344.6}
            y={133.6}
            fill="#000"
            id="text28037"
            >
            <TSpan
                id="tspan10829-9-2"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={344.6}
                y={133.6}
            >
                {"C"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={386.9}
            y={215.6}
            fill="#000"
            id="text28040"
            >
            <TSpan
                id="tspan10829-2-7"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={386.9}
                y={215.6}
            >
                {"B"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={-38}
            y={429.5}
            fill="#000"
            id="text28043"
            >
            <TSpan
                id="tspan10829-8"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={-38}
                y={429.5}
            >
                {"A"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={-449.4}
            y={430.9}
            fill="#000"
            transform="scale(-1 1)"
            id="text28046"
            >
            <TSpan
                id="tspan10829-3-2"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={-449.4}
                y={430.9}
            >
                {"A"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={-12.5}
            y={524.2}
            fill="#000"
            id="text28049"
            >
            <TSpan
                id="tspan10829-2-5"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={-12.5}
                y={524.2}
            >
                {"B"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={387.4}
            y={523.8}
            fill="#000"
            id="text28052"
            >
            <TSpan
                id="tspan10829-2-7-4"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={387.4}
                y={523.8}
            >
                {"B"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={27.5}
            y={594.6}
            fill="#000"
            id="text28055"
            >
            <TSpan
                id="tspan10829-9-0"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={27.5}
                y={594.6}
            >
                {"C"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={342.2}
            y={599.4}
            fill="#000"
            id="text28058"
            >
            <TSpan
                id="tspan10829-9-2-4"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={342.2}
                y={599.4}
            >
                {"C"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={82.7}
            y={670.5}
            fill="#000"
            id="text28061"
            >
            <TSpan
                id="tspan10829-1-2"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={82.7}
                y={670.5}
            >
                {"D"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={284.8}
            y={667.5}
            fill="#000"
            id="text28064"
            >
            <TSpan
                id="tspan10829-1-4-4"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={284.8}
                y={667.5}
            >
                {"D"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={154.1}
            y={688.7}
            fill="#000"
            id="text28067"
            >
            <TSpan
                id="tspan10829-24-8"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={154.1}
                y={688.7}
            >
                {"E"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "36.67665655px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.98241,
            }}
            x={215}
            y={687.2}
            fill="#000"
            id="text28070"
            >
            <TSpan
                id="tspan10829-24-4-6"
                style={{
                strokeWidth: 0.98241,
                fontSize: "36.67665655px",
                }}
                x={215}
                y={687.2}
            >
                {"E"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "28.8174px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.709863,
            }}
            x={236.3}
            y={362.2}
            fill="#000"
            transform="scale(1.00183 .99817)"
            id="text28073"
            >
            <TSpan
                id="tspan10829-4-4"
                style={{
                fontSize: "28.8174px",
                strokeWidth: 0.709863,
                }}
                x={236.3}
                y={362.2}
            >
                {"RIGHT"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "28.8174px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.709863,
            }}
            x={82.7}
            y={362.2}
            fill="#000"
            transform="scale(1.00183 .99817)"
            id="text28076"
            >
            <TSpan
                id="tspan10829-4-4-8"
                style={{
                fontSize: "28.8174px",
                strokeWidth: 0.709863,
                }}
                x={82.7}
                y={362.2}
            >
                {"LEFT"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "28.8174px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.709863,
            }}
            x={154.8}
            y={147.2}
            fill="#000"
            transform="scale(1.00183 .99817)"
            id="text28079"
            >
            <TSpan
                id="tspan10829-4-4-2"
                style={{
                fontSize: "28.8174px",
                strokeWidth: 0.709863,
                }}
                x={154.8}
                y={147.2}
            >
                {"UPPER"}
            </TSpan>
            </Text>
            <Text
            xmlSpace="preserve"
            style={{
                fontSize: "28.8174px",
                lineHeight: 1.25,
                fontFamily: "Arial",
                InkscapeFontSpecification: "Arial",
                strokeWidth: 0.709863,
            }}
            x={152.6}
            y={573.8}
            fill="#000"
            transform="scale(1.00183 .99817)"
            id="text28082"
            >
            <TSpan
                id="tspan10829-4-4-2-8"
                style={{
                fontSize: "28.8174px",
                strokeWidth: 0.709863,
                }}
                x={152.6}
                y={573.8}
            >
                {"LOWER"}
            </TSpan>
            </Text>
        </Svg>
    )
}