import axios from "axios";

export async function addOrRemoveFromLikedVideos(
	inArray,
	userId,
	videoId,
	dispatch,
	apiURL
) {
	try {
		if (inArray) {
			const { data } = await axios.delete(
				`${apiURL}/likedVideos/${userId}/${videoId}`
			);
			if (data.success) {
				dispatch({
					type: "REMOVE_FROM_LIKED_VIDEOS",
					payload: videoId
				});
			}
		} else {
			const { data } = await axios.post(
				`${apiURL}/likedVideos/${userId}/${videoId}`
			);
			if (data.success) {
				dispatch({
					type: "ADD_TO_LIKED_VIDEOS",
					payload: data.video
				});
			}
		}
	} catch (error) {
		const {
			response: { data }
		} = error;
		console.log(data.message, data.error);
	}
}

export async function addOrRemoveFromPlaylist(
	inArray,
	userId,
	videoId,
	dispatch,
	apiURL
) {
	try {
		if (inArray) {
			const { data } = await axios.delete(
				`${apiURL}/playlist/${userId}/${videoId}`
			);
			if (data.success) {
				dispatch({
					type: "REMOVE_FROM_PLAYLIST",
					payload: videoId
				});
			}
		} else {
			const { data } = await axios.post(
				`${apiURL}/playlist/${userId}/${videoId}`
			);
			if (data.success) {
				dispatch({
					type: "ADD_TO_PLAYLIST",
					payload: data.video
				});
			}
		}
	} catch (error) {
		const {
			response: { data }
		} = error;
		console.log(data.message, data.error);
	}
}

export async function addOrRemoveFromWatchLater(
	inArray,
	userId,
	videoId,
	dispatch,
	apiURL
) {
	try {
		if (inArray) {
			const { data } = await axios.delete(
				`${apiURL}/watchLater/${userId}/${videoId}`
			);
			if (data.success) {
				dispatch({
					type: "REMOVE_FROM_WATCH_LATER",
					payload: videoId
				});
			}
		} else {
			const { data } = await axios.post(
				`${apiURL}/watchLater/${userId}/${videoId}`
			);
			if (data.success) {
				dispatch({
					type: "ADD_TO_WATCH_LATER",
					payload: data.video
				});
			}
		}
	} catch (error) {
		const {
			response: { data }
		} = error;
		console.log(data.message, data.error);
	}
}
