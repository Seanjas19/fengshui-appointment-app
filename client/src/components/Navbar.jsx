import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () =>{
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <nav className="bg-mystic-green sticky top-0 z-50 px-8 py-4 shadow-xl flex justify-between items-center">
            {/* Logo Section */}
            <Link to="/" className="text-2xl font-serif text-ghost-white tracking-widest hover:opacity-80 transition-opacity">
                LONGJET
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
                <Link to="/" className="nav-link">Home</Link>
                
                {isLoggedIn ? (
                    <>
                        <Link to="/appointments" className="nav-link">Appointments</Link>
                        <button onClick={handleLogout} className="btn-outline text-sm">
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="flex items-center space-x-6">
                        <Link to="/login" className="text-ghost-white hover:underline underline-offset-8 transition-all font-bold">
                            Log In
                        </Link>
                        <Link to="/sign-up" className="btn-primary">
                            Get Started
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;