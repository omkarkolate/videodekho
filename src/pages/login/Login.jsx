import { useState } from "react";
import styles from "./login.module.css";
import { useAuth } from "../../authProvider/AuthProvider";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useLoader } from "../../customHooks/useLoader";
import { useData } from "../../dataProvider/DataProvider";
import { validate, isAllInputsValid } from "../utils";

export function Login() {
	const [formData, setFormData] = useState({
		emailId: { value: "", isValid: null, className: "text-input" },
		password: { value: "", isValid: null, className: "text-input" }
	});
	const [validationError, setValidationError] = useState(null);
	const { isLoaded, setIsLoaded, error, setError } = useLoader();
	const {
		isLoaded: isGuestLoaded,
		setIsLoaded: setIsGuestLoaded
	} = useLoader();
	const { dispatch } = useData();
	const { loginWithCredintials } = useAuth();
	const { state } = useLocation();
	const navigate = useNavigate();

	function updateFormData(event) {
		if (validationError) setValidationError(null);
		if (error) setError(null);

		const { id, value } = event.target;
		const isValid = validate(id, value);
		const className = isValid ? "text-input-valid" : "text-input-invalid";
		setFormData({ ...formData, [id]: { value, isValid, className } });
	}

	async function loginHandler() {
		if (!isAllInputsValid(formData)) {
			setValidationError("Please fill the required information");
			return;
		}

		setIsLoaded(true);
		const data = await loginWithCredintials(
			formData.emailId.value,
			formData.password.value
		);

		if (data.success) {
			setIsLoaded(false);
			await dispatch({ type: "SAVE_USER", payload: { ...data.user } });
			navigate(state?.from ? state.from : "/");
		} else {
			setIsLoaded(false);
			setError(data.error);
		}
	}

	async function guestLoginHandler() {
		setIsGuestLoaded(true);
		const data = await loginWithCredintials("guest@email.com", "guest@123");

		if (data.success) {
			setIsGuestLoaded(false);
			await dispatch({ type: "SAVE_USER", payload: { ...data.user } });
			navigate(state?.from ? state.from : "/");
		} else {
			setIsGuestLoaded(false);
			setError(data.error);
		}
	}

	return (
		<div>
			<header className={styles["login-page-header"]}>Kharidari</header>
			<div>
				<form className={styles["login-form"]}>
					<div className={styles["input-field"]}>
						<label className={styles["label"]} htmlFor="emailId">
							Email id*
						</label>
						<input
							type="text"
							className={styles[formData.emailId.className]}
							placeholder="Email id*"
							id="emailId"
							value={formData.emailId.value}
							onChange={updateFormData}
						/>
					</div>
					<div className={styles["input-field"]}>
						<label className={styles["label"]} htmlFor="password">
							Password*
						</label>
						<input
							type="password"
							className={styles[formData.password.className]}
							placeholder="Password*"
							id="password"
							value={formData.password.value}
							onChange={updateFormData}
						/>
					</div>
					<div className={styles["login-btn"]} onClick={loginHandler}>
					{isLoaded ? "Logging in..." : "Login"}
					</div>
					<div
						className={styles["guest-login-btn"]}
						onClick={guestLoginHandler}
					>
						{isGuestLoaded ? "Logging in..." : "Login as Guest"}
					</div>
					<div className="error">{error}</div>
					<div className="loading">
						Don't have an account goto{" "}
						<Link to="/signup">
							<span className={styles["link"]}>Signup</span>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
