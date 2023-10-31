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

  const pressureData = data.map((item, index) => ({ 
    value: item.Pressure, 
    label: item.Description,
    depth: item.Depth,
    dataPointText: fluidTypes[index]
  }));

  const temperatureData = data.map((item, index) => ({ 
    value: item.Temperature, 
    depth: item.Depth,
    label: item.Description,
    temp: item.Temperature,
    dataPointText: fluidTypes[index]
  }));

   
  return (
    <ScrollView>
      <View style={{marginTop: 30}}></View>
      <Text>Gráfico de Presión vs Profundidad</Text>
      <ScrollView horizontal={true}>
        <LineChart
          areaChart
          initialSpacing={10}
          data={pressureData}
          height={280}
          maxValue={5800}
          showVerticalLines
          backgroundColor="black"
          startFillColor="rgba(20,105,81,0.3)"
          endFillColor="rgba(20,85,81,0.01)"
          startOpacity={0.9}
          endOpacity={0.2}
          spacing={54}
          color1="skyblue"
          textColor1="white"
          hideRules
          dataPointsHeight={6}
          dataPointsWidth={6}
          verticalLinesColor={"skyblue"}
          dataPointsColor1="red"
          yAxisColor="black"
          xAxisColor="black"
          yAxisTextStyle={{color: 'black'}}
          textShiftY={-2}
          textShiftX={6}
          textFontSize={11}
          pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            strokeDashArray: [2, 5],
            pointerColor: 'red',
            radius: 4,
            pointerLabelWidth: 100,
            pointerLabelHeight: 120,
            pointerLabelComponent: items => {
              const item = items[0];
              return (
                <View
                  style={{
                    height: 120,
                    width: 120,
                    backgroundColor: '#282C3E',
                    borderRadius: 4,
                    justifyContent:'center',
                    paddingLeft:16,
                    paddingRight:16
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
        initialSpacing={10}
        data={temperatureData}
        height={330}
        maxValue={65}
        yAxisOffset={110}
        spacing={54}
        hideRules
        showVerticalLines
        startFillColor="rgba(20,105,81,0.3)"
        endFillColor="rgba(20,85,81,0.01)"
        startOpacity={0.9}
        endOpacity={0.2}
        verticalLinesColor={"skyblue"}
        backgroundColor="black"
        color1="skyblue"
        textColor1="white"
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor1="red"
        textShiftY={-2}
        textShiftX={6}
        textFontSize={11}
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerStripColor: 'lightgray',
          pointerStripWidth: 2,
          strokeDashArray: [2, 5],
          pointerColor: 'red',
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