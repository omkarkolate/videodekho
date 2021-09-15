import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/";
import { useLoader } from "../../customHooks/useLoader";
import { useData } from "../../dataProvider/DataProvider";
import styles from "./profile.module.css";

export function Profile() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		mobileNumber: "",
		emailId: "",
		password: ""
	});

	const { state, dispatch, apiURL } = useData();
	const { isLoaded, setIsLoaded, error, setError } = useLoader();

	useEffect(() => {
		setFormData({ ...state });
	}, [state]);

	function updateFormData(event) {
		const { id, value } = event.target;
		setFormData({ ...formData, [id]: value });
	}

	async function updateUserProfile() {
		try {
			setIsLoaded(true);
			const { data } = await axios.put(
				`${apiURL}/users/${state.userId}`,
				formData
			);
			if (data.success) {
				const {
					firstName,
					lastName,
          emailId,
          password
				} = data.user;
				await dispatch({
					type: "UPDATE_USER",
					payload: {
						firstName,
						lastName,
            emailId, 
            password
					}
				});
			}
			setIsLoaded(false);
		} catch (error) {
			const {
				response: { data }
			} = error;
			console.log(data.message, data.error);
			setError(`${data.message}. ${data.error}`);
			setIsLoaded(false);
		}
	}

	return (
		<div>
			<Header title="My Profile" />
			<form className={styles["profile-form"]}>
				<div className={styles["input-field"]}>
					<label className={styles["label"]} htmlFor="firstName">
						First Name*
					</label>
					<input
						type="text"
						className={styles["text-input"]}
						placeholder="First Name*"
						id="firstName"
						value={formData.firstName}
						onChange={updateFormData}
					/>
				</div>
				<div className={styles["input-field"]}>
					<label className={styles["label"]} htmlFor="lastName">
						Last Name
					</label>
					<input
						type="text"
						className={styles["text-input"]}
						placeholder="Last Name"
						id="lastName"
						value={formData.lastName}
						onChange={updateFormData}
					/>
				</div>
				<div className={styles["input-field"]}>
					<label className={styles["label"]} htmlFor="emailId">
						Email id*
					</label>
					<input
						type="text"
						className={styles["text-input"]}
						placeholder="Email id*"
						id="emailId"
						value={formData.emailId}
						onChange={updateFormData}
					/>
				</div>
				<div className={styles["input-field"]}>
					<label className={styles["label"]} htmlFor="password">
						Password*
					</label>
					<input
						type="password"
						className={styles["text-input"]}
						placeholder="Password*"
						id="password"
						value={formData.password}
						onChange={updateFormData}
					/>
				</div>
				<div className={styles["save-btn"]} onClick={updateUserProfile}>
					{isLoaded ? "Saving data..." : "Save"}
				</div>
				<div className="error">{error}</div>
			</form>
		</div>
	);
}
