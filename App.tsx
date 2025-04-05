import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image} from 'react-native';
import axios from 'axios';

type Endereco = {
  cep: string;
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
}

export default function App() {
  const [contador, setContador] = useState(0);
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState<Endereco|null>(null); //pode-se ser usado também " useState<any>(null) " nesse jeito queremos dizer que é genérico, ou seja, pode-se receber qualquer coisa.

  useEffect(() => {
    carregarCepInicial()
  }, [])

  async function carregarCepInicial(){
    let resposta = axios.get('https://viacep.com.br/ws/08344-320/json/')
    let NovoEndereco = ((await resposta)).data;
    setEndereco(NovoEndereco);
    setCep(NovoEndereco.cep)
  }

  function contar(){
    setContador(contador + 1);
    console.log('Contador', contador);
  }

  async function pesquisarCEP(){
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    let enderecoNovo = await (await fetch(url)).json();
    setEndereco(enderecoNovo);
    console.log('Endereco', enderecoNovo);
  }

  return (
    <View style={styles.container}>
      <Text>Contador: {contador}</Text>
      <StatusBar style="auto" />
      <Button title='contar' onPress={contar}></Button>
      <Image source={{ uri: 'https://placehold.co/150' }} style={{ width: 150, height: 150 }} />
      
      <Text>Cep:</Text> {/* Display the label here */}
      <TextInput 
        onChangeText={setCep} 
        value={cep} 
        style={styles.input}
      />

      <Button title='Enviar CEP' onPress={pesquisarCEP} />

      <View style={styles.card}>
        <Text>CEP: {cep}</Text>
        {endereco && 
          <View>
            <Text>Rua: {endereco.logradouro}</Text>
            <Text>Bairro: {endereco.bairro}</Text>
            <Text>Cidade: {endereco.localidade}</Text>
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingLeft: 8,
  }
});
