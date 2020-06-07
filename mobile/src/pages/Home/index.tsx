import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Text, Image, StyleSheet, Platform} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Feather as Icon} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface ItemsArray{
  label: string;
  value: string
}

const Home = () => {
  const navigation = useNavigation();

  const[ufs, setUfs] = useState<ItemsArray[]>([]);
  const[cities, setCities] = useState<ItemsArray[]>([]);
  const[selectedUf, setSelectedUf] = useState('0');
  const[selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(response => {
      const ufInitials = response.data.map(uf => ({label:uf.sigla, value:uf.sigla}));
      setUfs(ufInitials);
    })
  },[]);
  console.log(selectedUf);

  useEffect(()=>{
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/microrregioes`)
    .then(response => {
      const citiesNames = response.data.map(city => ({label:city.nome, value:city.nome}));
      setCities(citiesNames);
    })
  },[selectedUf]);

  function handleNavigationPoints(){
    navigation.navigate('Points', {
      selectedUf,
      selectedCity
    });
  }
    return (
    <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{width:274, height:368}}
    >
        <View style={styles.main}>
            <Image source={require('../../assets/logo.png')} />
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
        </View>

        <View style={styles.footer}>

            <RNPickerSelect 
              useNativeAndroidPickerStyle={false}
              style={styles}
              placeholder={{label:'Selecione uma UF', value:null}}
              onValueChange={(value) => setSelectedUf(value)} 
              items={ufs}
            />

            <RNPickerSelect 
              useNativeAndroidPickerStyle={false}
              style={styles}
              placeholder={{label:'Selecione uma Cidade', value:null}}
              onValueChange={(value) => setSelectedCity(value)} 
              items={cities}
            />

            <RectButton style={styles.button} onPress={handleNavigationPoints}>
                <View style={styles.buttonIcon}>
                  <Icon name="arrow-right" color="#FFF" size={24} />
                </View>
                <Text style={styles.buttonText}>
                  Entrar
                </Text>
            </RectButton>
        </View>
    </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    inputAndroid: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 8,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },

    inputIOS: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 8,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;