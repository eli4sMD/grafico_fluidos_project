import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import data from '../paradas.json';

function calculateDensity(pressure, depth) {
    let g = 9.81; // aceleración debido a la gravedad en m/s²
    let pressureInPascals = pressure * 6894.76; // convertir la presión de psia a Pascales
    let density = pressureInPascals / (g * depth); // calcular la densidad en kg/m³
    return density;
}

export default function ChartComponent() {
  const pressureData = data.map(item => ({ 
    value: item.Pressure, 
    label: item.Time,
    depth: item.Depth,
    dataPointText: `Profundidad: ${item.Depth}` 
  }));
  const temperatureData = data.map(item => ({ 
    value: item.Temperature, 
    depth: item.Depth,
    label: item.Time,
    temp: item.Temperature,
    dataPointText: `Profundidad: ${item.Depth}`
  }));

  const fluidTypes = data.map(item => {
    const density = calculateDensity(item.Pressure, item.Depth);
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
      <View style={{marginTop: 30}}></View>
      <Text>Gráfico de Presión vs Profundidad</Text>
      <ScrollView horizontal={true}>
        <LineChart
          areaChart
          initialSpacing={20}
          data={pressureData}
          height={280}
          maxValue={5800}
          showVerticalLines
          backgroundColor="black"
          startFillColor="rgba(20,105,81,0.3)"
          endFillColor="rgba(20,85,81,0.01)"
          startOpacity={0.9}
          endOpacity={0.2}
          spacing={75}
          color1="orange"
          textColor1="white"
          hideRules
          dataPointsHeight={6}
          dataPointsWidth={6}
          dataPointsColor1="blue"
          yAxisColor="black"
          xAxisColor="black"
          yAxisTextStyle={{color: 'black'}}
          textShiftY={-2}
          textShiftX={-5}
          textFontSize={11}
          pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            strokeDashArray: [2, 5],
            pointerColor: 'lightgray',
            radius: 4,
            pointerLabelWidth: 100,
            pointerLabelHeight: 120,
            pointerLabelComponent: items => {
              const item = items[0];
              return (
                <View
                  style={{
                    height: 120,
                    width: 100,
                    backgroundColor: '#282C3E',
                    borderRadius: 4,
                    justifyContent:'center',
                    paddingLeft:16,
                  }}>
                  <Text style={{color: 'lightgray',fontSize:12}}>Presión</Text>
                  <Text style={{color: 'white', fontWeight:'bold'}}>{item.value}</Text>
                  <Text style={{color: 'lightgray',fontSize:12,marginTop:12}}>Profundidad</Text>
                  <Text style={{color: 'white', fontWeight:'bold'}}>{item.depth}</Text>
                </View>
              );
            },
          }}
        />
      </ScrollView>
      <Text>Gráfico de Temperatura vs Profundidad</Text>
      <ScrollView horizontal={true}>
      <LineChart
        areaChart
        initialSpacing={20}
        data={temperatureData}
        height={330}
        maxValue={65}
        yAxisOffset={110}
        spacing={90}
        hideRules
        showVerticalLines
        startFillColor="rgba(20,105,81,0.3)"
        endFillColor="rgba(20,85,81,0.01)"
        startOpacity={0.9}
        endOpacity={0.2}
        backgroundColor="black"
        color1="skyblue"
        textColor1="white"
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor1="red"
        textShiftY={-6}
        textShiftX={5}
        textFontSize={11}
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerStripColor: 'lightgray',
          pointerStripWidth: 2,
          strokeDashArray: [2, 5],
          pointerColor: 'lightgray',
          radius: 4,
          pointerLabelWidth: 100,
          pointerLabelHeight: 120,
          pointerLabelComponent: (items) => {
            const item = items[0];
            return (
              <View
                style={{
                  height: 130,
                  width: 150,
                  backgroundColor: '#282C3E',
                  borderRadius: 4,
                  justifyContent:'center',
                  paddingLeft:16,
                }}>
                <Text style={{color: 'lightgray',fontSize:12}}>Temperatura</Text>
                <Text style={{color: 'white', fontWeight:'bold'}}>{item.temp}</Text>
                <Text style={{color: 'lightgray',fontSize:12,marginTop:12}}>Profundidad</Text>
                <Text style={{color: 'white', fontWeight:'bold'}}>{item.depth}</Text>
              </View>
            );
          },
        }}
      />
      </ScrollView>
      <Text>Tipos de Fluido por Parada:</Text>
      {fluidTypes.map((fluidType, index) => (
          <Text key={index}>{`PARADA N° ${index + 1}: ${fluidType}`}</Text>
      ))}
    </ScrollView>
  );
}