export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  top_Songs: null,
  item: null,
  currentPlaying:null,
  selectedPlaylistId:"37i9dQZF1F0sijgNaJdgit"
  // remove after developing.....
  // token:'BQATrDELSN37_EPV3bxUNoC9z61hp6B7J_ZOQvFFPhQ1SbxOwNtx7I_J2DKcgeW2gFl7pQuduNK9jUQdQE6_IVRWx4Z1SYospVoDknjQKlsmwh8A1d-OsGbMK0DSQiU7iRRUo_moU_cwMf6ktckkLiJmhhiYKhUDd5z0K44yEATL4VvJgSC6lpVdxYdBkFZl-670NdNj7EKxMJwt7w',
  // token: null
};

const reducer = (state, action) => {
  console.log("hello", action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_TOP_SONGS":
      return {
        ...state,
        top_Songs: action.top_songs,
      };
      case "SET_PLAYING":
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };

    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };
    default:
      return state;
  }
};

export default reducer;
