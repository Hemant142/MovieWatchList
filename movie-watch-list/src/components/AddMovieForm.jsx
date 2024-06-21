// src/components/AddMovieForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { addMovie } from '../actions/actions';
import { Box, Button, Input, Textarea, Stack, Heading } from '@chakra-ui/react';
import { addMovie } from '../Redux/movieReducer/action';

const AddMovieForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      title,
      description,
      releaseYear: parseInt(releaseYear, 10),
      genre,
      watched: false,
      rating: 0,
      review: '',
      image: 'https://via.placeholder.com/150', // Placeholder image
    };
    dispatch(addMovie(newMovie));
    setTitle('');
    setDescription('');
    setReleaseYear('');
    setGenre('');
  };

  return (
    <Box>
      <Heading as="h3" size="lg">Add New Movie</Heading>
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
          <Button type="submit" colorScheme="blue">Add Movie</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddMovieForm;
