import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    try {
      const response = await axios.get('https://ghibliapi.vercel.app/films');
      const allMovies = response.data;

      // Filtra os filmes conforme o texto digitado
      const filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );

      setMovies(filtered);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o nome do filme Ghibli..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button mode="contained" onPress={searchMovies} style={styles.button}>
        Buscar
      </Button>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            {item.image && <Card.Cover source={{ uri: item.image }} />}
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph>{item.release_date}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('Details', { movie: item })}>
                Ver Detalhes
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
});

export default HomeScreen;
