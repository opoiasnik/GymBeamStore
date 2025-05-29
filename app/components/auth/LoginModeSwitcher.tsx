import React from 'react';

interface LoginModeSwitcherProps {
    mode: 'login' | 'register' | 'verify';
    setMode: (mode: 'login' | 'register' | 'verify') => void;
    setLoginError: (error: string) => void;
    setLoginSuccess: (success: string) => void;
}

const LoginModeSwitcher: React.FC<LoginModeSwitcherProps> = ({
    mode,
    setMode,
    setLoginError,
    setLoginSuccess,
}) => {
    return (
        <div className="flex justify-center gap-4">
            <button
                type="button"
                className={`min-w-[120px] px-4 py-2 rounded-lg font-semibold transition-all duration-150 text-lg ${mode === 'login' ? 'bg-orange-500 text-white shadow' : 'bg-gray-800 text-gray-300 hover:bg-orange-500 hover:text-white'}`}
                onClick={() => {
                    setMode('login');
                    setLoginError('');
                    setLoginSuccess('');
                }}
                disabled={mode === 'verify'}
            >
                Login
            </button>
            <button
                type="button"
                className={`min-w-[120px] px-4 py-2 rounded-lg font-semibold transition-all duration-150 text-lg ${mode === 'register' ? 'bg-orange-500 text-white shadow' : 'bg-gray-800 text-gray-300 hover:bg-orange-500 hover:text-white'}`}
                onClick={() => {
                    setMode('register');
                    setLoginError('');
                    setLoginSuccess('');
                }}
                disabled={mode === 'verify'}
            >
                Register
            </button>
        </div>
    );
};

export default LoginModeSwitcher; 