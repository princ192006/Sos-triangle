import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  ArrowRight,
  Loader2,
} from "lucide-react";
import "../styles/Login.css";

// ── Mock users (replace with real API later) ──────────
const MOCK_USERS = new Map([
  ["admin",              "admin123"],
  ["analyst@cognix.io",  "analyst123"],
]);

function Login() {
  const navigate = useNavigate();

  // ── state ──────────────────────────────────────────────
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  // 2-step verification state
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);

  // ── validation ─────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email or username is required";
    } else if (email.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── handlers ───────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setLoginError("");

    // TODO: Replace with actual API call later
    // For now, validate against MOCK_USERS map
    setTimeout(() => {
      const storedPassword = MOCK_USERS.get(email.toLowerCase());

      if (!storedPassword || storedPassword !== password) {
        setIsLoading(false);
        setLoginError("Invalid username/email or password");
        return;
      }

      // Credentials matched → proceed to 2FA
      setIsLoading(false);
      setShowVerification(true);
    }, 1000);
  };

  const MOCK_OTP = "000000";

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = verificationCode.join("");
    if (code.length < 6) return;

    setIsLoading(true);

    // TODO: Replace with actual 2FA verification API call
    setTimeout(() => {
      if (code !== MOCK_OTP) {
        setIsLoading(false);
        setLoginError("Invalid verification code. Hint: use 000000");
        return;
      }

      setIsLoading(false);
      setLoginError("");
      navigate("/");
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    // TODO: Replace with actual Google OAuth flow
    // Example:
    // window.location.href = "/api/auth/google";
    console.log("Google Sign-In triggered");
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password page or open modal
    // Example:
    // navigate("/forgot-password");
    console.log("Forgot password triggered");
  };

  const handleSignUp = () => {
    // TODO: Navigate to sign up page
    // Example:
    // navigate("/signup");
    console.log("Sign up triggered");
  };

  // ── OTP input handler ─────────────────────────────────
  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // ── floating particles data ────────────────────────────
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="login-page">
      {/* ── Animated background ─────────────────────────── */}
      <div className="login-bg">
        <div className="login-bg-gradient" />
        <div className="login-bg-grid" />
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="login-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Login card ──────────────────────────────────── */}
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* ── Logo / Brand ─────────────────────────────── */}
        <div className="login-brand">
          <motion.div
            className="login-logo"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Shield size={28} />
          </motion.div>
          <h1 className="login-title">COGNIX AI</h1>
          <p className="login-subtitle">SOC Triage Security Platform</p>
        </div>

        <AnimatePresence mode="wait">
          {!showVerification ? (
            /* ── Login Form ─────────────────────────────── */
            <motion.form
              key="login-form"
              onSubmit={handleLogin}
              className="login-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="login-form-title">Welcome back</h2>
              <p className="login-form-desc">
                Sign in to access your security dashboard
              </p>

              {/* Login error banner */}
              {loginError && (
                <motion.div
                  className="login-error-banner"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {loginError}
                </motion.div>
              )}

              {/* Email / Username */}
              <div className="login-field">
                <label htmlFor="login-email" className="login-label">
                  Email or Username
                </label>
                <div className={`login-input-wrap ${errors.email ? "login-input-error" : ""}`}>
                  <Mail size={18} className="login-input-icon" />
                  <input
                    id="login-email"
                    type="text"
                    placeholder="analyst@cognix.io"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    className="login-input"
                    autoComplete="username"
                  />
                </div>
                {errors.email && (
                  <motion.span
                    className="login-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email}
                  </motion.span>
                )}
              </div>

              {/* Password */}
              <div className="login-field">
                <div className="login-label-row">
                  <label htmlFor="login-password" className="login-label">
                    Password
                  </label>
                  <button
                    type="button"
                    className="login-forgot-btn"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className={`login-input-wrap ${errors.password ? "login-input-error" : ""}`}>
                  <Lock size={18} className="login-input-icon" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    className="login-input"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="login-toggle-pw"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <motion.span
                    className="login-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.password}
                  </motion.span>
                )}
              </div>

              {/* Remember me */}
              <label className="login-remember" htmlFor="login-remember-check">
                <input
                  id="login-remember-check"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="login-checkbox"
                />
                <span>Remember me for 30 days</span>
              </label>

              {/* Submit */}
              <motion.button
                type="submit"
                className="login-submit-btn"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <Loader2 size={20} className="login-spinner" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="login-divider">
                <span>or continue with</span>
              </div>

              {/* Google */}
              <motion.button
                type="button"
                className="login-google-btn"
                onClick={handleGoogleSignIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </motion.button>

              {/* Sign up link */}
              <p className="login-signup-text">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="login-signup-link"
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
              </p>
            </motion.form>
          ) : (
            /* ── 2-Step Verification ────────────────────── */
            <motion.form
              key="verify-form"
              onSubmit={handleVerify}
              className="login-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="login-verify-icon">
                <Shield size={32} />
              </div>
              <h2 className="login-form-title">Two-Step Verification</h2>
              <p className="login-form-desc">
                We sent a 6-digit code to{" "}
                <span className="login-email-highlight">{email}</span>
              </p>

              {/* Error banner */}
              {loginError && (
                <motion.div
                  className="login-error-banner"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {loginError}
                </motion.div>
              )}

              {/* OTP Inputs */}
              <div className="login-otp-row">
                {verificationCode.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                    className="login-otp-input"
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              {/* Verify button */}
              <motion.button
                type="submit"
                className="login-submit-btn"
                disabled={isLoading || verificationCode.join("").length < 6}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <Loader2 size={20} className="login-spinner" />
                ) : (
                  <>
                    Verify & Continue
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>

              {/* Resend */}
              <p className="login-resend-text">
                Didn't receive a code?{" "}
                <button
                  type="button"
                  className="login-signup-link"
                  onClick={() => {
                    // TODO: call resend API
                    console.log("Resend code triggered");
                  }}
                >
                  Resend
                </button>
              </p>

              {/* Back */}
              <button
                type="button"
                className="login-back-btn"
                onClick={() => {
                  setShowVerification(false);
                  setVerificationCode(["", "", "", "", "", ""]);
                }}
              >
                ← Back to login
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Login;
