import React, { useState } from "react";
import authService from "../services/authService";

const Login = () => {
    const [formData, setFormData] = useState({
        user_email: "",
        user_password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error

        try {
            await authService.login(formData.user_email, formData.user_password);
            setSuccess(true);

            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        }
        catch (err) {
            setError(err.response?.data?.message || "Invalid username or password");
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-2xl p-10 rounded-3xl w-full max-w-md flex flex-col items-center space-y-8 border border-sage-light">
                <h1 className="text-4xl font-serif text-mystic-green font-bold">Login</h1>
                
                <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">
                    {error && (
                        <p className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold text-center border border-red-100">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="bg-green-50 text-green-600 p-3 rounded-lg text-sm font-bold text-center border border-green-100">
                            Login successful!
                        </p>
                    )}
                    
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-bold text-slate-dark ml-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-mystic-green focus:ring-2 focus:ring-mystic-green/20 outline-none transition-all transition-all font-sans"
                            onChange={(e) => setFormData({...formData, user_email: e.target.value})}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-bold text-slate-dark ml-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-mystic-green focus:ring-2 focus:ring-mystic-green/20 outline-none transition-all transition-all font-sans"
                            onChange={(e) => setFormData({...formData, user_password: e.target.value})}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-mystic-green text-ghost-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-dark hover:scale-[1.02] active:scale-95 transition-all duration-300">
                        Sign In
                    </button>
                    
                    <p className="text-center text-sm text-gray-500">
                        Don't have an account? <a href="/sign-up" className="text-mystic-green font-bold hover:underline">Register here</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;