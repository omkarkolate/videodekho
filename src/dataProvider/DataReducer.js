export function dataReducer(state, { type, payload }) {
	switch (type) {
		case "ADD_VIDEOS":
			return { ...state, videos: payload };

		case "SAVE_USER":
			return { ...state, userId: payload._id, ...payload };

		case "UPDATE_USER":
			return { ...state, ...payload };

		case "ADD_TO_WATCH_LATER":
			return {
				...state,
				watchLater: [...state.watchLater, payload]
			};

		case "REMOVE_FROM_WATCH_LATER":
			return {
				...state,
				watchLater: state.watchLater.filter(
					({ _id }) => _id !== payload
				)
			};

		case "ADD_TO_LIKED_VIDEOS":
			return {
				...state,
				likedVideos: [...state.likedVideos, payload]
			};

		case "REMOVE_FROM_LIKED_VIDEOS":
			return {
				...state,
				likedVideos: state.likedVideos.filter(
					({ _id }) => _id !== payload
				)
			};

		case "ADD_TO_PLAYLIST":
			return {
				...state,
				playlist: [...state.playlist, payload]
			};

		case "REMOVE_FROM_PLAYLIST":
			return {
				...state,
				playlist: state.playlist.filter(({ _id }) => _id !== payload)
			};

		case "ADD_TO_HISTORY":
			return {
				...state,
				history: [...payload, ...state.history]
			};

		case "REMOVE_FROM_HISTORY":
			return {
				...state,
				history: state.history.filter(({ _id }) => _id !== payload)
			};

		case "CLEAR_HISTORY":
			return { ...state, history: payload };

		case "RESET_USER_DATA":
			return { ...state, ...payload };

		default:
			return state;
	}
}
