import { UserAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom/dist";
import { useEffect } from "react";

export default function Register() {
  const { register } = UserAuth();
  const navigate = useNavigate();
  const [t] = useTranslation("global");
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await register(email, password).then((userCredential) => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{t("pages.register.title")}</h1>
      <h2>
        {t("pages.register.subtitle")}
        <a href="/login">{t("pages.register.login_link")}</a>
      </h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder={t("pages.register.email")} />
        <input type="password" placeholder={t("pages.register.password")} />
        <button type="submit">{t("pages.register.submit")}</button>
      </form>
    </div>
  );
}
