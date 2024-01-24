export const initialState = {
  user: null,
  playlists: [],
  isPlaying: false,
  item: null,
  currentPlaying: null,
  selectedPlaylistId: null,
  selectedPlaylist: null,
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
    case "SET_PLAYING":
      return {
        ...state,
        currentPlaying: action.currentPlaying,
      };
    case "SET_IS_PLAYING":
      return {
        ...state,
        isPlaying: action.isPlaying,
      };

    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };
    case "SET_SELECTED_PLAYLIST_ID":
      return {
        ...state,
        selectedPlaylistId: action.id,
      };
    case "SET_SELECTED_PLAYLIST":
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    default:
      return state;
  }
};

export default reducer;
