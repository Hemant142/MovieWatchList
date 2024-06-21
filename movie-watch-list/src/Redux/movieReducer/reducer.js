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

const initialState = {
  isLoading: false,
  isError: false,
  movies: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MOVIE_REQUEST:
      return { ...state, isLoading: true };

    case MOVIE_SUCCESS:
      return { ...state, isLoading: false, movies: payload };

    case MOVIE_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, { ...payload, id: state.movies.length + 1 }]
      };

    case DELETE_MOVIE:
      return {
        ...state,
        isLoading: false,
        movies: state.movies.filter((movie) => movie.id !== payload),
      };

    case EDIT_MOVIE:
      return {
        ...state,
        isLoading: false,
        movies: state.movies.map((movie) =>
          movie.id === payload.id ? { ...movie, ...payload } : movie
        ),
      };

    case TOGGLE_WATCHED:
      return {
        ...state,
        isLoading: false,
        movies: state.movies.map((movie) =>
          movie.id === payload.id ? { ...movie, watched: payload.watched } : movie
        ),
      };

    case RATE_MOVIE:
      return {
        ...state,
        isLoading: false,
        movies: state.movies.map((movie) =>
          movie.id === payload.id ? { ...movie, rating: payload.rating } : movie
        ),
      };

    case REVIEW_MOVIE:
      return {
        ...state,
        isLoading: false,
        movies: state.movies.map((movie) =>
          movie.id === payload.id ? { ...movie, review: payload.review } : movie
        ),
      };

    default:
      return state;
  }
};
