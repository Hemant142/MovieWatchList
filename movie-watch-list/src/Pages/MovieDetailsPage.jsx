import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, rateMovie, reviewMovie } from '../Redux/movieReducer/action';
import {
  Box, Button, Heading, Image, Text, Stack, Divider, FormControl, FormLabel,
  Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  Input, IconButton, useToast,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import Rating from 'react-rating';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const { movies } = useSelector((state) => state.movieReducer);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [editingRating, setEditingRating] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies());
    } else {
      const movie = movies.find((movie) => movie.id === id);
      if (movie) {
        setRating(movie.rating || 0);
        setReview(movie.review || []); // Set initial reviews from store
      }
    }
  }, [dispatch, id, movies]);

  const handleRatingClick = (newRating) => {
    setNewRating(newRating);
    setShowRatingModal(true);
  };

  const handleEditRating = () => {
    setEditingRating(true);
    setNewRating(rating); // Initialize newRating with current rating
  };

  const handleSubmitRating = async () => {
    try {
      await dispatch(rateMovie(id, newRating));
      setRating(newRating); // Update local rating state
      setShowRatingModal(false);
      toast({
        title: 'Rating saved',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setEditingRating(false); // Reset editing state
    } catch (error) {
      console.error('Error updating rating:', error);
      toast({
        title: 'An error occurred',
        description: 'Failed to save rating. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddReview = () => {
    if (newReview.trim() !== '') {
      const updatedReview = [...review, newReview]; // Add new review to local state
      dispatch(reviewMovie(id, updatedReview)); // Dispatch action to update review in store
      setReview(updatedReview); // Update local state with new review
      setNewReview('');
    }
  };

  const handleCancelAddReview = () => {
    setNewReview('');
  };

  const movie = movies.find((movie) => movie.id === id);

  if (!movie) return <p>Loading...</p>;

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white">
      <Heading as="h1" size="xl" textAlign="center" mb={4}>
        {movie.title}
      </Heading>
      <Flex justifyContent="center" mb={6}>
        <Image src={movie.image} alt={movie.title} maxW="400px" borderRadius="lg" />
      </Flex>
      <Stack spacing={4}>
        <Text fontSize="lg" textAlign="center">
          {movie.description}
        </Text>
        <Divider />
        <Flex justifyContent="space-between">
          <Box>
            <Text fontWeight="bold">Release Year:</Text>
            <Text>{movie.releaseYear}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Genre:</Text>
            <Text>{movie.genre}</Text>
          </Box>
        </Flex>
        <Divider />
        <Box>
          <FormControl>
            <FormLabel>Rating ({movie.rating})</FormLabel>
            <Flex alignItems="center">
              {editingRating ? (
                <Input
                  type="number"
                  placeholder="Edit Rating"
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                />
              ) : (
                <Rating
                  initialRating={rating}
                  emptySymbol={<StarIcon color="gray.300" />}
                  fullSymbol={<StarIcon color="yellow.500" />}
                  onChange={handleRatingClick}
                />
              )}
              <Button ml={4} colorScheme="blue" onClick={editingRating ? handleSubmitRating : handleEditRating}>
                {editingRating ? 'Confirm Rating' : 'Edit Rating'}
              </Button>
            </Flex>
          </FormControl>
        </Box>
        <Divider />
        <Box align="left">
          <Text fontSize="xl" fontWeight="bold" mb={2} >
            All Reviews({review.length})
          </Text>
          <Flex align="center" mb={4}>
            <Input
              variant="flushed"
              placeholder="Add a review"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              mb={2}
            />
            <Button ml={4} colorScheme="blue" onClick={handleAddReview} isDisabled={!newReview.trim()}>
              Save
            </Button>
            <Button ml={2} variant="ghost" onClick={handleCancelAddReview}>
              Cancel
            </Button>
          </Flex>
          <Stack spacing={4} align="flex-start" mb={4}>
            {review.length > 0 ? (
              review.map((item, index) => (
                <Box key={index} p={3} borderWidth="1px" borderRadius="md">
                  <Text>{item}</Text>
                </Box>
              ))
            ) : (
              <Text>No reviews yet</Text>
            )}
          </Stack>
        
        </Box>
      </Stack>

      <Modal isOpen={showRatingModal} onClose={() => setShowRatingModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Rating</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to set the rating to {newRating}?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitRating}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={() => setShowRatingModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovieDetailsPage;
