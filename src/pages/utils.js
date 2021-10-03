import axios from "axios";

function validateEmail(emailId) {
	const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegx.test(emailId);
}

function validateMobileNumber(mobileNumber) {
	const mobileNumberRegx = /^[7-9]{1,1}\d{9,9}$/;
	return mobileNumberRegx.test(mobileNumber);
}

export function validate(id, value, formData) {
	switch (id) {
		case "firstName":
		case "lastName":
		case "password":
		case "oldPassword":
			return value !== "";

		case "emailId":
			return validateEmail(value);

		case "mobileNumber":
			return validateMobileNumber(value);

		case "confirmPassword":
			return formData.password.value === value;

		default:
			break;
	}
}

export function isAllInputsValid(formData) {
	const inputs = Object.keys(formData);
	for (const input of inputs) {
		if (!formData[input].isValid) {
			return false;
		}
	}
	return true;
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
