import guitar from "../assets/guitar.png";
import google from "../assets/google.png";
import phone from "../assets/phone.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/setup";

type PopupProp = {
  setLoginPop: (value: boolean) => void;
};

const Login = ({ setLoginPop }: PopupProp) => {
  const googleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log(auth,provider)
      setLoginPop(false); 
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-zinc-950/80 transition-opacity" aria-hidden="true"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-96 sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h1 onClick={() => setLoginPop(false)} className="font-semibold text-3xl cursor-pointer">
                  X
                </h1>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="mt-2">
                      <img src={guitar} className="w-20 h-20 mx-auto" />
                      <p className="text-base font-medium mt-5 text-center">
                        Help us become one of the safest places to buy and sell
                      </p>

                      <div className="flex border-3 border-black p-2 rounded-md mt-12">
                        <img src={phone} className="w-6 h-6" />
                        <h1 className="font-semibold ml-4">Continue with Phone</h1>
                      </div>

                      <div
                        className="flex border-1 border-gray-400 p-2 rounded-md mt-4 cursor-pointer"
                        onClick={googleSignin}
                      >
                        <img src={google} className="w-6 h-6" />
                        <h1 className="font-semibold ml-4">Continue with Google</h1>
                      </div>

                      <h1 className="text-center mt-4">OR</h1>
                      <h1 className="text-center mt-4 underline cursor-pointer font-bold">Login with Email</h1>
                      <h1 className="text-center text-xs mt-5">All your personal details are safe with us.</h1>
                      <h1 className="text-center mt-4 text-xs">
                        If you continue, you are accepting{" "}
                        <span className="text-blue-700">
                          OLX Terms and Conditions and Privacy Policy
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
