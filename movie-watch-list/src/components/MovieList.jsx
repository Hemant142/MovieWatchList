// src/components/MovieList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie, toggleWatched } from '../Redux/movieReducer/action';
import { Box, Button, List, ListItem, Stack, Text, Heading, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, isLoading, isError } = useSelector((state) => state.movieReducer);
console.log(movies,"moveis")
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const handleToggleWatched = (id, watched) => {
    dispatch(toggleWatched(id, !watched));
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading movies.</p>;

  return (
    <Box>
      <Heading as="h1" size="xl">Movie Watchlist</Heading>
      {movies && movies.length > 0 ? (
        <List spacing={3}>
          {movies.map((movie) => (
            <ListItem key={movie.id}>
              <Stack direction="row" spacing={4} align="center">
                <Image boxSize="100px" src={movie.image} alt={movie.title} />
                <Box>
                  <Heading as="h2" size="md">
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                  </Heading>
                  <Text>{movie.description}</Text>
                  <Text>Release Year: {movie.releaseYear}</Text>
                  <Text>Genre: {movie.genre}</Text>
                  <Text>Watched: {movie.watched ? "Yes" : "No"}</Text>
                  <Button onClick={() => handleToggleWatched(movie.id, movie.watched)}>
                    {movie.watched ? "Mark as Unwatched" : "Mark as Watched"}
                  </Button>
                  <Button onClick={() => handleDelete(movie.id)} colorScheme="red">Delete</Button>
                </Box>
              </Stack>
            </ListItem>
          ))}
        </List>
      ) : (
        <Text>No movies found.</Text>
      )}
    </Box>
  );
};

export default MovieList;
