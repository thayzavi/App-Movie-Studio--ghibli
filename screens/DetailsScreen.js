import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;

  const addToFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites') || '[]';
      const favorites = JSON.parse(existingFavorites);
      favorites.push(movie);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Filme adicionado aos favoritos!');
    } catch (error) {
      console.error(error);
    }
  };

  if (!movie) {
    return <Paragraph>Carregando...</Paragraph>;
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: movie.image }} />
        <Card.Content>
          <Title>{movie.title}</Title>
          <Paragraph>{movie.description}</Paragraph>
          <Paragraph>Diretor: {movie.director}</Paragraph>
          <Paragraph>Produtor: {movie.producer}</Paragraph>
          <Paragraph>Ano: {movie.release_date}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={addToFavorites}>Adicionar aos Favoritos</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default DetailsScreen;
