import { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../customHooks/useLoader";
import axios from "axios";
import { useData } from "../../dataProvider/DataProvider";

export function SignUp() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		emailId: "",
		password: ""
	});
	const { isLoaded, setIsLoaded, error, setError } = useLoader();
	const [message, setMessage] = useState(null);
	const navigate = useNavigate();
	const { apiURL } = useData();

	function updateFormData(event) {
		const { id, value } = event.target;
		setFormData({ ...formData, [id]: value });
	}

	async function signUp() {
		try {
			setIsLoaded(true);
			const { data } = await axios.post(
				`${apiURL}/signup`,
				formData
			);
			if (data.success) {
				setIsLoaded(false);
				setMessage(data.message);
			}
		} catch (error) {
			const {
				response: { data }
			} = error;
			setIsLoaded(false);
			setError(data.message);
		}
	}

	function gotoLogin() {
		navigate("/login");
	}

	return (
		<div>
			<header className={styles["login-page-header"]}>Kharidari</header>
			<div>
				<form className={styles["login-form"]}>
					<div className={styles["input-field"]}>
						<label className={styles["label"]} htmlFor="firstName">
							First name*
						</label>
						<input
							type="text"
							className={styles["text-input"]}
							placeholder="First name*"
							id="firstName"
							value={formData.firstName}
							onChange={updateFormData}
						/>
					</div>
					<div className={styles["input-field"]}>
						<label className={styles["label"]} htmlFor="lastName">
							Last Name*
						</label>
						<input
							type="text"
							className={styles["text-input"]}
							placeholder="Last Name*"
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
					<div className={styles["login-btn"]} onClick={signUp}>
						Sign Up
					</div>
					<div className="loading">
						{message && (
							<div>
								Successfully Signed up, now login.
								<div
									className={styles["login-btn"]}
									onClick={gotoLogin}
								>
									Go to Login
								</div>
							</div>
						)}
					</div>
					<div className="loading">{isLoaded && "Signing Up..."}</div>
					<div className="error">{error}</div>
				</form>
			</div>
		</div>
	);
}
