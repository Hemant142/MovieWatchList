// src/components/EditMovieForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { editMovie } from '../actions/actions';
import { Box, Button, Input, Textarea, Stack, Heading } from '@chakra-ui/react';
import { editMovie } from '../Redux/movieReducer/action';

const EditMovieForm = ({ movie }) => {
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [releaseYear, setReleaseYear] = useState(movie.releaseYear);
  const [genre, setGenre] = useState(movie.genre);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMovie = {
      ...movie,
      title,
      description,
      releaseYear: parseInt(releaseYear, 10),
      genre,
    };
    dispatch(editMovie(movie.id, updatedMovie));
  };

  return (
    <Box>
      <Heading as="h3" size="lg">Edit Movie</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Release Year"
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
          <Input
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <Button type="submit" colorScheme="blue">Update Movie</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditMovieForm;
