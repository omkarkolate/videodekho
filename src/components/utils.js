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
				await dispatch({
					type: "REMOVE_FROM_LIKED_VIDEOS",
					payload: videoId
				});
				return true;
			}
		} else {
			const { data } = await axios.post(
				`${apiURL}/likedVideos/${userId}/${videoId}`
			);
			if (data.success) {
				await dispatch({
					type: "ADD_TO_LIKED_VIDEOS",
					payload: data.video
				});
				return true;
			}
		}
	} catch (error) {
		const {
			response: { data }
		} = error;
		console.log(data.message, data.error);
		return false;
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
				await dispatch({
					type: "REMOVE_FROM_PLAYLIST",
					payload: videoId
				});
				return true;
			}
		} else {
			const { data } = await axios.post(
				`${apiURL}/playlist/${userId}/${videoId}`
			);
			if (data.success) {
				await dispatch({
					type: "ADD_TO_PLAYLIST",
					payload: data.video
				});
				return true;
			}
		}
	} catch (error) {
		const {
			response: { data }
		} = error;
		console.log(data.message, data.error);
		return false;
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
				await dispatch({
					type: "REMOVE_FROM_WATCH_LATER",
					payload: videoId
				});
				return true;
			}
		} else {
			const { data } = await axios.post(
				`${apiURL}/watchLater/${userId}/${videoId}`
			);
			if (data.success) {
				await dispatch({
					type: "ADD_TO_WATCH_LATER",
					payload: data.video
				});
				return true;
			}
		}
	} catch (error) {
		const {
			response: { data }
		} = error;
		console.log(data.message, data.error);
		return false;
	}
}

export async function addOrRemoveFromWatchHistory(
	inArray,
	userId,
	videoId,
	dispatch,
	apiURL
) {
	try {
		if (inArray) {
			const { data } = await axios.delete(
				`${apiURL}/watchHistory/${userId}/${videoId}`
			);
			if (data.success) {
				await dispatch({
					type: "REMOVE_FROM_WATCH_HISTORY",
					payload: videoId
				});
				return true;
			}
		} else {
			const { data } = await axios.post(
				`${apiURL}/watchHistory/${userId}/${videoId}`
			);
			if (data.success) {
				await dispatch({
					type: "ADD_TO_WATCH_HISTORY",
					payload: data.video
				});
				return true;
			}
		}
	} catch (error) {
		const {
			response: { data }
		} = error;
		console.log(data.message, data.error);
		return false;
	}
}

export async function addToWatchHistory(
	inArray,
	userId,
	videoId,
	dispatch,
	apiURL
) {
	try {
		const { data } = await axios.post(
			`${apiURL}/watchHistory/${userId}/${videoId}`
		);
		if (data.success) {
			if (inArray) {
				await dispatch({
					type: "REMOVE_FROM_WATCH_HISTORY",
					payload: videoId
				});
			}
			await dispatch({
				type: "ADD_TO_WATCH_HISTORY",
				payload: data.video
			});
			return true;
		}
	} catch (error) {
		const {
			response: { data }
		} = error;
		console.log(data.message, data.error);
		return false;
	}
}

