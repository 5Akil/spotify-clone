export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  top_Songs: null,
  item: null,
  currentPlaying: null,
  selectedPlaylistId: "37i9dQZF1F0sijgNaJdgit", 
  token: null
};

const reducer = (state, action) => {
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
