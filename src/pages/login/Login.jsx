import { useState } from "react";
import styles from "./login.module.css";
import { useAuth } from "../../authProvider/AuthProvider";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useLoader } from "../../customHooks/useLoader";
import { useData } from "../../dataProvider/DataProvider";

export function Login() {
	const [formData, setFormData] = useState({
		emailId: "",
		password: ""
	});
	const { isLoaded, setIsLoaded, error, setError } = useLoader();
	const { dispatch } = useData();
	const { loginWithCredintials } = useAuth();
	const { state } = useLocation();
	const navigate = useNavigate();

	function updateFormData(event) {
		const { id, value } = event.target;
		setFormData({ ...formData, [id]: value });
	}

	async function loginHandler() {
		setIsLoaded(true);
		const data = await loginWithCredintials(
			formData.emailId,
			formData.password
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
					<div className={styles["login-btn"]} onClick={loginHandler}>
						Login
					</div>
					<div className="loading">{isLoaded && "Loging in..."}</div>
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
