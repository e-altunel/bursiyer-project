import { UserAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom/dist";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const { login } = UserAuth();
  const [t] = useTranslation("global");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await login(email, password).then((_) => {
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
