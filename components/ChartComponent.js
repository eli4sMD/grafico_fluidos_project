import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import data from '../paradas.json';

export default function ChartComponent() {
  // Crear arrays para presión, temperatura y profundidad
  const pressureData = data.map(item => ({ value: item.Pressure, dataPointText: `Profundidad: ${item.Depth}` }));
  const temperatureData = data.map(item => ({ value: item.Temperature, dataPointText: `Profundidad: ${item.Depth}` }));

  // Tipos de fluido por parada
  const fluidTypes = data.map(item => {
    const density = item.Pressure / item.Depth;
    let fluidType = "Desconocido";
    if (density >= 800 && density <= 900) {
      fluidType = "Agua Salada";
    } else if (density > 900) {
      fluidType = "Petróleo";
    } else {
      fluidType = "Gas";
    }
    return fluidType;
  });

  return (
    <ScrollView>
        <View style = {{marginTop: 30}}></View>
      <Text>Gráfico de Presión vs Profundidad</Text>
      <LineChart
        initialSpacing={20}
        data={pressureData}
        height={250}
        maxValue={5800}
        showVerticalLines
        spacing={94}
        color1="orange"
        textColor1="green"
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor1="blue"
        textShiftY={-2}
        textShiftX={-5}
        textFontSize={11}
      />
      <Text>Gráfico de Temperatura vs Profundidad</Text>
      <LineChart
        initialSpacing={20}
        data={temperatureData}
        height={350}
        maxValue={70}
        yAxisOffset={110}
        showVerticalLines
        spacing={94}
        color1="skyblue"
        textColor1="green"
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor1="red"
        textShiftY={-10}
        textShiftX={-5}
        textFontSize={11}
      />
      <Text>Tipos de Fluido por Parada:</Text>
      {fluidTypes.map((fluidType, index) => (
        <Text key={index}>{`PARADA N° ${index + 1}: ${fluidType}`}</Text>
      ))}
    </ScrollView>
  );
}
