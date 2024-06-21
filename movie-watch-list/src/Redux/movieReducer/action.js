import axios from "axios";
import {
  MOVIE_REQUEST,
  MOVIE_SUCCESS,
  MOVIE_FAILURE,
  ADD_MOVIE,
  DELETE_MOVIE,
  EDIT_MOVIE,
  TOGGLE_WATCHED,
  RATE_MOVIE,
  REVIEW_MOVIE,
} from "./actionTypes";

const API_URL = "https://kutta-api.onrender.com/movies";

export const movieRequest = () => ({ type: MOVIE_REQUEST });

export const movieSuccess = (movies) => ({
  type: MOVIE_SUCCESS,
  payload: movies,
});

export const movieFailure = (error) => ({
  type: MOVIE_FAILURE,
  payload: error,
});

export const fetchMovies = () => async (dispatch) => {
  dispatch(movieRequest());
  try {
    const response = await axios.get(API_URL);
    dispatch(movieSuccess(response.data));
  } catch (error) {
    dispatch(movieFailure(error.message));
  }
};

export const addMovie = (movie) => async (dispatch) => {
  dispatch(movieRequest());
  try {
    console.log(movie,"movies")
    const response = await axios.post(API_URL, movie);
    dispatch({ type: ADD_MOVIE, payload: response.data });
  } catch (error) {
    dispatch(movieFailure(error.message));
  }
};

export const deleteMovie = (id) => async (dispatch) => {
  dispatch(movieRequest());
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: DELETE_MOVIE, payload: id });
  } catch (error) {
    dispatch(movieFailure(error.message));
  }
};

export const editMovie = (id, updatedMovie) => async (dispatch) => {
  dispatch(movieRequest());
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedMovie);
    dispatch({ type: EDIT_MOVIE, payload: response.data });
  } catch (error) {
    dispatch(movieFailure(error.message));
  }
};

export const toggleWatched = (id, watched) => async (dispatch) => {
  dispatch(movieRequest());
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { watched });
    dispatch({ type: TOGGLE_WATCHED, payload: response.data });
  } catch (error) {
    dispatch(movieFailure(error.message));
  }
};

export const rateMovie = (id, rating) => async (dispatch) => {
  dispatch(movieRequest());
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { rating });
    dispatch({ type: RATE_MOVIE, payload: response.data });
  } catch (error) {
    dispatch(movieFailure(error.message));
  }
};

export const reviewMovie = (id, review) => async (dispatch) => {
  dispatch(movieRequest());
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { review });
    console.log(response,"REview")
    dispatch({ type: REVIEW_MOVIE, payload: response.data });
  } catch (error) {
    dispatch(movieFailure(error.message));
  }
};
