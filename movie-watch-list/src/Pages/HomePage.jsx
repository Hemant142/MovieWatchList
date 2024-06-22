import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie, toggleWatched, addMovie, editMovie } from '../Redux/movieReducer/action';
import {
  Box, Button, Grid, GridItem, Heading, Image, Text, Stack, Divider, ButtonGroup, Card, CardBody, CardFooter,
  useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel, Input, Textarea, Skeleton, useDisclosure
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
  const dispatch = useDispatch();
  const { movies, isLoading, isError } = useSelector((state) => state.movieReducer);
  const [expanded, setExpanded] = useState({});
  const [newMovie, setNewMovie] = useState({
    id: '',
    title: '',
    description: '',
    releaseYear: '',
    genre: '',
    watched: false,
    rating: '',
    review: '',
    image: ''
  });

  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const handleToggleWatched = (id, watched) => {
    dispatch(toggleWatched(id, !watched));
  };

  const toggleDescription = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderDescription = (description, id) => {
    if (expanded[id]) {
      return (
        <>
          {description} <span style={{ color: 'gray', cursor: 'pointer' }} onClick={() => toggleDescription(id)}>less</span>
        </>
      );
    }
    if (description.length > 100) {
      return (
        <>
          {description.substring(0, 100)}... <span style={{ color: 'gray', cursor: 'pointer' }} onClick={() => toggleDescription(id)}>more</span>
        </>
      );
    }
    return description;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleEditOpen = (movie) => {
    setNewMovie(movie);
    onEditOpen();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editMovie(newMovie.id, newMovie));
    onEditClose();
    setNewMovie({
      id: '',
      title: '',
      description: '',
      releaseYear: '',
      genre: '',
      watched: false,
      rating: '',
      review: '',
      image: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = uuidv4(); // Generate a new UUID
      await dispatch(addMovie({ ...newMovie, id })); // Include the generated UUID
      onClose(); // Close the modal after successfully adding the movie
      setNewMovie({
        id: '',
        title: '',
        description: '',
        releaseYear: '',
        genre: '',
        watched: false,
        rating: '',
        review: '',
        image: ''
      });
      // Fetch movies again to update the list
      dispatch(fetchMovies());
    } catch (error) {
      console.error('Error adding movie:', error);
      // Handle error state if needed
    }
  };
  
  if (isLoading) return (
    <Box padding={4} textAlign="center">
      <Heading as="h2" size="lg" mb={6} color={headingColor}>
        Data is loading from db.json. Please wait. It may take a while.
      </Heading>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
      >
        {Array(8).fill("").map((_, index) => (
          <GridItem key={index}>
            <Card maxW="sm" h="full" boxShadow="lg">
              <Skeleton height="300px" />
              <CardBody>
                <Skeleton height="20px" my="4" />
                <Skeleton height="20px" my="4" />
                <Skeleton height="20px" my="4" />
                <Skeleton height="20px" my="4" />
                <Skeleton height="20px" my="4" />
              </CardBody>
              <CardFooter>
                <Skeleton height="40px" width="full" />
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
  if (isError) return <p>Error loading movies.</p>;
  return (
    <Box padding={4}>
      <Heading as="h1" size="xl" mb={6} textAlign="center" color={headingColor}>
        Movie Watchlist
      </Heading>
      <Button colorScheme="blue" onClick={onOpen} mb={6}>Add Movie</Button>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
      >
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <GridItem key={movie.id}>
              <Card maxW="sm" h="full" boxShadow="lg" transition="transform 0.2s">
                <CardBody>
                  <Link to={`/movie/${movie.id}`}>
                    <Image
                      _hover={{ transform: 'scale(1.05)' }}
                      src={movie.image}
                      alt={movie.title}
                      borderRadius="lg"
                      mb={4}
                    />
                  </Link>
                  <Stack spacing={3}>
                    <Heading size="md" color={headingColor}>
                      {movie.title}
                    </Heading>
                    <Text color={textColor}>{renderDescription(movie.description, movie.id)}</Text>
                    <Text color={textColor}>Release Year: {movie.releaseYear}</Text>
                    <Text color={textColor}>Genre: {movie.genre}</Text>
                    <Button
                      variant="solid"
                      colorScheme={movie.watched ? 'green' : 'blue'}
                      onClick={() => handleToggleWatched(movie.id, movie.watched)}
                    >
                      <Text color="white" fontSize="lg">
                        {movie.watched ? 'Watched' : 'Unwatched'}
                      </Text>
                    </Button>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing={2}>
                    <Button colorScheme="red" onClick={() => handleDelete(movie.id)}>
                      Delete
                    </Button>
                    <Button onClick={() => handleEditOpen(movie)} variant="outline" colorScheme="blue">
                      Edit
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </GridItem>
          ))
        ) : (
          <Text>No movies found.</Text>
        )}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input name="title" value={newMovie.title} placeholder='Title' onChange={handleChange} />
              </FormControl>
              <FormControl id="description" isRequired mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={newMovie.description} onChange={handleChange} />
              </FormControl>
              <FormControl id="releaseYear" isRequired mt={4}>
                <FormLabel>Release Year</FormLabel>
                <Input name="releaseYear" type="number" placeholder='Release Year' value={newMovie.releaseYear} onChange={handleChange} />
              </FormControl>
              <FormControl id="genre" isRequired mt={4}>
                <FormLabel>Genre</FormLabel>
                <Input name="genre" value={newMovie.genre} placeholder='Genre' onChange={handleChange} />
              </FormControl>
              <FormControl id="rating" mt={4}>
                <FormLabel>Rating</FormLabel>
                <Input name="rating" type="number" placeholder='Rating' value={newMovie.rating} onChange={handleChange} />
              </FormControl>
              <FormControl id="review" mt={4}>
                <FormLabel>Review</FormLabel>
                <Textarea name="review" value={newMovie.review} onChange={handleChange} />
              </FormControl>
              <FormControl id="image" mt={4}>
                <FormLabel>Image URL</FormLabel>
                <Input name="image" value={newMovie.image} placeholder='Image URL' onChange={handleChange} />
              </FormControl>
              <Button mt={4} colorScheme="blue" type="submit">
                Add Movie
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleEditSubmit}>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input name="title" value={newMovie.title} placeholder='Title' onChange={handleChange} />
              </FormControl>
              <FormControl id="description" isRequired mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={newMovie.description} onChange={handleChange} />
              </FormControl>
              <FormControl id="releaseYear" isRequired mt={4}>
                <FormLabel>Release Year</FormLabel>
                <Input name="releaseYear" type="number" placeholder='Release Year' value={newMovie.releaseYear} onChange={handleChange} />
              </FormControl>
              <FormControl id="genre" isRequired mt={4}>
                <FormLabel>Genre</FormLabel>
                <Input name="genre" value={newMovie.genre} placeholder='Genre' onChange={handleChange} />
              </FormControl>
              <FormControl id="rating" mt={4}>
                <FormLabel>Rating</FormLabel>
                <Input name="rating" type="number" placeholder='Rating' value={newMovie.rating} onChange={handleChange} />
              </FormControl>
              <FormControl id="review" mt={4}>
                <FormLabel>Review</FormLabel>
                <Textarea name="review" value={newMovie.review} onChange={handleChange} />
              </FormControl>
              <FormControl id="image" mt={4}>
                <FormLabel>Image URL</FormLabel>
                <Input name="image" value={newMovie.image} placeholder='Image URL' onChange={handleChange} />
              </FormControl>
              <Button mt={4} colorScheme="blue" type="submit">
                Save Changes
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HomePage;
