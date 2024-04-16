import { UserAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom/dist";

export default function Login() {
  const { login } = UserAuth();
  const navigate = useNavigate();
  const [t] = useTranslation("global");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await login(email, password).then((userCredential) => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{t("pages.login.title")}</h1>
      <h2>
        {t("pages.login.subtitle")}
        <a href="/register">{t("pages.login.register_link")}</a>
      </h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder={t("pages.login.email")} />
        <input type="password" placeholder={t("pages.login.password")} />
        <button type="submit">{t("pages.login.submit")}</button>
      </form>
    </div>
  );
}
