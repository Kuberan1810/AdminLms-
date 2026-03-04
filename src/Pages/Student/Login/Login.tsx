import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/axios";
// import CoireiLogo from "../../../assets/Images/home/coirei-logo-orange.png"
// import skillpointLogo from "../../../assets/Images/home/skillpointLogo.svg"
// import ColabLogo from "../../../assets/Images/home/ColabLogo.svg"
import ColabrationLogo from "../../../assets/Images/home/ColabrationLogo.svg"
import LoginBanner from "../../../assets/Images/login/loginBanner.png"







const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      // 🔥 BASE URL automatically applied
      const res = await api.post("/auth/login", null, {
        params: { email, password },
      });

      const data = res.data;

      // 🔐 store auth
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      // 🔁 ROLE BASED REDIRECT
      if (data.user.role === "student") {
        navigate("/student/dashboard");
      } else if (data.user.role === "instructor") {
        navigate("/instructor/dashboard");
      } else {
        setError("Invalid user role");
      }

    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6FAFF] flex items-center justify-center px-6">

      <div className="flex  gap-3 absolute top-6 left-6">
        {/* <img src={CoireiLogo} alt="CoireiLogo" className="md:w-20  w-15 md:h-1 h-10" />
        <img src={skillpointLogo} alt="skillpointLogo" className="md:w-20  w-15 md:h-11 h-10" /> */}
        {/* <img src={ColabLogo} alt="ColabLogo" className="w-40" /> */}
        
        <img src={ColabrationLogo} alt="ColabrationLogo" className="w-40" />

      </div> 

      <div className="w-full max-w-6xl bg-white rounded-2xl 
        shadow-[0_8px_24px_rgba(0,0,0,0.06)] 
        flex overflow-hidden">

        {/* LEFT */}
        <div className="hidden md:flex w-1/2 items-center justify-center 
                  bg-white border-r border-gray-200">
          <img
            src={LoginBanner}
            alt="Login"
            className="max-w-md"
          />
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 px-12 py-14">
          <h2 className="text-2xl font-semibold text-[#333333] mb-8 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <div className="relative mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your mail"
                  className={`
                    w-full rounded-xl px-4 py-3 text-sm
                    border ${error ? "border-red-400" : "border-[#DCE6F2]"}
                    focus:outline-none focus:border-blue-500
                  `}
                />
                <Mail className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`
                    w-full rounded-xl px-4 py-3 text-sm
                    border ${error ? "border-red-400" : "border-[#DCE6F2]"}
                    focus:outline-none focus:border-blue-500
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="
                  px-14 py-3 rounded-full cursor-pointer
                  bg-blue-600 text-white font-medium
                  hover:bg-blue-700 transition
                  disabled:opacity-60
                "
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
