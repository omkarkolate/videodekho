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

		case "ADD_TO_WATCH_HISTORY":
			return {
				...state,
				watchHistory: [payload, ...state.watchHistory]
			};

		case "REMOVE_FROM_WATCH_HISTORY":
			return {
				...state,
				watchHistory: state.watchHistory.filter(
					({ _id }) => _id !== payload
				)
			};

		case "CLEAR_WATCH_HISTORY":
			return { ...state, watchHistory: payload };

		case "RESET_USER_DATA":
			return { ...state, ...payload };

		default:
			return state;
	}
}
