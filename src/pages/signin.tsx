import { useState, FormEvent } from "react";
import Button from "../components/Button";
import { signInSchema } from "../lib/schemas";
import { useLocation, useNavigate } from "react-router-dom";
import {  Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { SignInAccount } from "../db/actions/auth.ts";
import { ZodError } from "zod";
import {LOGO} from "../assets/images/index.ts";


const SignIn = () => {

  const { login } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation(); 
  const previousRoute = location.state?.from || "/";

  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});

  const validateFields = ():SignIn|null  => {
      const form = document.getElementById("form_user_login") as HTMLFormElement;
      const email = (form.querySelector('input[name="email"]') as HTMLInputElement).value;
      const password = (form.querySelector('input[name="password"]') as HTMLInputElement).value;

      setErrorMessages({});

      try {

        signInSchema.parse({  email, password });

        return {
            email,
            password,
        };

      } catch (error) {
        if (error instanceof ZodError) {
          const newErrorMessages: Record<string, string> = {};
          const all_p_tags_err_msgs = form.querySelectorAll('[id^="error-message-"]');

          all_p_tags_err_msgs.forEach(p => {
            p.classList.remove('slide-in-up');
          });

          error.errors.forEach(err => {

            const fieldName = err.path[0] as string;
            newErrorMessages[fieldName] = err.message;

            const p_tag = document.getElementById(`error-message-${fieldName}`) as HTMLElement;
            if(p_tag){
              p_tag.classList.add('slide-in-up');
            }

          });
          setErrorMessages(newErrorMessages);
        }
        return null;
      }
  };

  const onSubmitCreation = async (e:FormEvent ) => {
      e.preventDefault();
      setLoadingForm(true);
      const fieldsValidated = validateFields();
      if(fieldsValidated != null){
        const userDB = await SignInAccount(fieldsValidated,i18n.language);
        if(userDB === null){
            setLoadingForm(false);
            return;
        }
        login(userDB)
        goToRoute(previousRoute);
      }
      setLoadingForm(false);
  };

  const goToRoute = (route:string) => {
    navigate(route);
  };

  return (
    <div className="w-full h-screen bg-cover bg-secondary">
      <div className="w-full h-full flex flex-col justify-center items-center gap-y-6">
        <div className="w-auto px-12 py-2 bg-primary flex justify-center items-center rounded-md">
          <img onClick={()=>goToRoute("/")} src={LOGO} alt="logo" className="w-auto h-8 cursor-pointer hover:scale-105"/>
        </div>
        <form id="form_user_login" className="w-[90%] sm:w-[400px] h-auto flex flex-col justify-center items-center rounded-3xl shadow-3xl p-6" style={{background: "rgba(255,255,255,0.80)"}} onSubmit={(e)=>onSubmitCreation(e)}>
          <p className="text-body text-xl my-2 font-bold">{t("auth.signin.header")}</p>
          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
            <label htmlFor="email" className="text-body h-3 sm:h-6">{t("auth.signin.email")}</label>
            <input name="email" className="w-full h-8 sm:h-10 font-tertiary px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("auth.signin.email")}/>
            <div  className="w-full h-6">
              <p id="error-message-email" className="h-6 text-[10px] sm:text-xs text-secondary-dark animation-element">
                {t(errorMessages.email)}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full h-auto overflow-hidden my-1 gap-y-2 sm:gap-y-1">
            <label htmlFor="password" className="text-body h-3 sm:h-6">{t("auth.signin.password")}</label>
            <div className="h-auto w-full relative">
              <input name="password" type={showPassword ? "text" : "password"} className="relative w-full h-8 sm:h-10 px-2 border-b-2 border-secondary focus:outline-none focus:border-b-2 focus:border-b-primary" placeholder={t("auth.signin.password")}/>
              <div onClick={()=>setShowPassword(!showPassword)} className="absolute top-0 right-2 h-full w-8 flex justify-center items-center cursor-pointer z-50 text-body">{ showPassword ? <EyeOff/> : <Eye />} </div>
            </div>
            <div className="w-full h-6">
              <p id="error-message-password" className="h-6 text-[10px] sm:text-xs text-secondary-dark animation-element">
                {t(errorMessages.password)}
              </p>
            </div>
          </div>
          <Button isLoading={loadingForm}>{t("auth.signin.log_in")}</Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
