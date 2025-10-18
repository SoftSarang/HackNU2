import React, { useState } from "react";
import { motion } from "framer-motion";
// Note: Icons (like Mail/Lock) are removed from the inputs to exactly match the provided screenshot design.

// --- Configuration ---

// Color Palette
const ACCENT_COLOR = "rgb(202, 253, 81)"; // Lime
const BG_COLOR = "rgb(0, 0, 0)"; // Deep Black
const TEXT_COLOR = "rgb(254, 254, 254)"; // White

// Framer Motion Variants for smooth transitions
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

const inputVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

// --- Component ---

export default function AuthPage({ mode = "signin" }) {
  const [isSignUp, setIsSignUp] = useState(mode === "signup");

  // The Card Header matches the screenshot: large title, smaller subtitle.
  const CardHeader = () => (
    <div className="flex flex-col items-center mb-10 text-center">
      <h2
        className="text-4xl font-extrabold tracking-tight"
        style={{ color: TEXT_COLOR, fontFamily: "Inter, sans-serif" }}
      >
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>
      <p className="text-base mt-2 opacity-70" style={{ color: TEXT_COLOR }}>
        {isSignUp ? "Create your futuristic account" : "Welcome back to the future"}
      </p>
    </div>
  );

  // FormInput is simplified to remove the internal icon and adjust padding to match the screenshot.
  const FormInput = ({ placeholder, type = "text", name, isAnimated = true }) => (
    <motion.div
      className="relative"
      variants={isAnimated ? inputVariants : null}
      initial={isAnimated ? "initial" : null}
      animate={isAnimated ? "animate" : null}
    >
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        className={`w-full py-3 px-4 text-base rounded-lg border focus:ring-2 focus:ring-opacity-80 transition-all duration-300
                    bg-white bg-opacity-5 backdrop-blur-sm placeholder-white placeholder-opacity-50`}
        style={{
          color: TEXT_COLOR,
          borderColor: `rgba(254, 254, 254, 0.15)`, // Lighter border for clean look
          fontFamily: "Inter, sans-serif",
        }}
        // Glowing Focus Effect
        onFocus={(e) => {
          e.target.style.borderColor = ACCENT_COLOR;
          e.target.style.boxShadow = `0 0 10px ${ACCENT_COLOR}`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = `rgba(254, 254, 254, 0.15)`;
          e.target.style.boxShadow = `none`;
        }}
      />
    </motion.div>
  );

  // AuthButton with neon glow and inverted hover effect
  const AuthButton = () => (
    <motion.button
      type="submit"
      className={`w-full py-3 mt-8 rounded-lg font-bold text-lg transition-all duration-300 transform active:scale-[0.98]
                  shadow-xl`}
      style={{
        backgroundColor: ACCENT_COLOR,
        color: BG_COLOR,
        fontFamily: "Inter, sans-serif",
        // The main button glow uses the accent color
        boxShadow: `0 0 15px ${ACCENT_COLOR}`,
      }}
      whileHover={{
        backgroundColor: BG_COLOR,
        color: ACCENT_COLOR,
        boxShadow: `0 0 25px ${ACCENT_COLOR}`,
        scale: 1.01,
      }}
    >
      {isSignUp ? "Sign Up" : "Sign In"}
    </motion.button>
  );

  // Helper for input labels
  const InputLabel = ({ children }) => (
    <label className="block text-sm font-medium mb-2" style={{ color: TEXT_COLOR, opacity: 0.9 }}>
      {children}
    </label>
  );


  return (
    <div
      // Changed min-h-screen to h-screen to ensure the container spans the full, exact viewport height.
      // The flex, items-center, and justify-center classes ensure perfect centering.
      className="w-full h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: BG_COLOR, fontFamily: "Inter, sans-serif" }}
    >
      <motion.div
        key={isSignUp ? "signup" : "signin"}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className={`w-full max-w-sm p-8 rounded-[24px] border border-opacity-30`}
        style={{
          backgroundColor: `rgba(0, 0, 0, 0.9)`, // Deep black card
          borderColor: ACCENT_COLOR,
          boxShadow: `0 0 40px ${ACCENT_COLOR}99`, // Soft neon outline
        }}
      >
        <CardHeader />

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          
          <div className="mb-6">
            <InputLabel>Email</InputLabel>
            <FormInput placeholder="your@email.com" type="email" name="email" />
          </div>

          <div className="mb-6">
            <InputLabel>Password</InputLabel>
            <FormInput placeholder="••••••••" type="password" name="password" />
            
            {/* Forgot Password link - only for Sign In mode */}
            {!isSignUp && (
                <div className="text-right text-sm mt-2">
                    <a
                        href="#"
                        className="hover:underline font-medium"
                        style={{ color: ACCENT_COLOR, opacity: 0.8 }}
                    >
                        Forgot password?
                    </a>
                </div>
            )}
          </div>
          

          {isSignUp && (
             <div className="mb-6">
                <InputLabel>Confirm Password</InputLabel>
                <FormInput 
                    placeholder="••••••••" 
                    type="password" 
                    name="confirmPassword" 
                    isAnimated={false} 
                />
             </div>
          )}

          <AuthButton />
        </form>

        <div className="mt-8 text-center text-sm" style={{ color: TEXT_COLOR, opacity: 0.8 }}>
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-bold hover:underline transition-colors duration-200"
            style={{ color: ACCENT_COLOR }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
