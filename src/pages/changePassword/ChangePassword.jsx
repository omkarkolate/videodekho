import { useState } from "react";
import styles from "./changePassword.module.css";
import { useLoader } from "../../customHooks/useLoader";
import axios from "axios";
import { useData } from "../../dataProvider/DataProvider";
import { validate, isAllInputsValid } from "../utils";
import { Header } from "../../components/index";

export function ChangePassword() {
	const [formData, setFormData] = useState({
		oldPassword: { value: "", isValid: null, className: "text-input" },
		password: { value: "", isValid: null, className: "text-input" },
		confirmPassword: { value: "", isValid: null, className: "text-input" }
	});
	const [validationError, setValidationError] = useState(null);
	const { isLoaded, setIsLoaded, error, setError } = useLoader();
	const [message, setMessage] = useState(null);
	const {
		state: { userId },
		apiURL
	} = useData();

	function updateFormData(event) {
		if (validationError) setValidationError(null);
		if (error) setError(null);

		const { id, value } = event.target;
		const isValid = validate(id, value, formData);
		const className = isValid ? "text-input-valid" : "text-input-invalid";
		setFormData({ ...formData, [id]: { value, isValid, className } });
	}

	function resetFormData() {
		setFormData({
			oldPassword: { value: "", isValid: null, className: "text-input" },
			password: { value: "", isValid: null, className: "text-input" },
			confirmPassword: {
				value: "",
				isValid: null,
				className: "text-input"
			}
		});
	}

	async function changePassword() {
		if (!isAllInputsValid(formData)) {
			setValidationError("Please fill the required information");
			return;
		}
		try {
			setIsLoaded(true);
			const { data } = await axios.put(
				`${apiURL}/users/change-password/${userId}`,
				{
					oldPassword: formData.oldPassword.value,
					newPassword: formData.password.value
				}
			);
			if (data.success) {
				setIsLoaded(false);
				setMessage(data.message);
			}
			resetFormData();
		} catch (error) {
			const {
				response: { data }
			} = error;
			setIsLoaded(false);
			setError(`${data.message}. ${data.error}`);
		}
	}

	return (
		<div>
			<Header brandName title="Change Password" />
			<div>
				<form className={styles["login-form"]}>
					<div className={styles["input-field"]}>
						<label className={styles["label"]} htmlFor="password">
							Old Password*
						</label>
						<input
							type="password"
							className={styles[formData.oldPassword.className]}
							placeholder="Old Password*"
							id="oldPassword"
							value={formData.oldPassword.value}
							onChange={updateFormData}
						/>
					</div>
					<div className={styles["input-field"]}>
						<label className={styles["label"]} htmlFor="password">
							New Password*
						</label>
						<input
							type="password"
							className={styles[formData.password.className]}
							placeholder="New Password*"
							id="password"
							value={formData.password.value}
							onChange={updateFormData}
						/>
					</div>
					<div className={styles["input-field"]}>
						<label
							className={styles["label"]}
							htmlFor="confirmPassword"
						>
							Confirm Password*
						</label>
						<input
							type="password"
							className={
								styles[formData.confirmPassword.className]
							}
							placeholder="Retype Password*"
							id="confirmPassword"
							value={formData.confirmPassword.value}
							onChange={updateFormData}
						/>
					</div>
					<div
						className={styles["login-btn"]}
						onClick={changePassword}
					>
						Change Password
					</div>
					<div className="error">{validationError}</div>
					<div className="loading">
						{message && <div>Password changed successfully.</div>}
					</div>
					<div className="loading">
						{isLoaded && "Changing Password..."}
					</div>
					<div className="error">{error}</div>
				</form>
			</div>
		</div>
	);
}
