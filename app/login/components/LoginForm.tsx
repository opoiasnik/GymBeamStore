import React from 'react';

interface LoginFormProps {
    mode: 'login' | 'register' | 'verify';
    username: string;
    setUsername: (username: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    verificationCode: string;
    setVerificationCode: (code: string) => void;
    sentCode: string;
    error: string;
    success: string;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({
    mode,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    verificationCode,
    setVerificationCode,
    sentCode,
    error,
    success,
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {(mode === 'register' || mode === 'login') && (
                <>
                    {mode === 'register' && (
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-white mb-1">
                                Email <span className="text-orange-400">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full border-b-2 border-gray-700 focus:border-orange-500 bg-black/60 text-white pb-2 text-lg font-light placeholder-gray-400 rounded-none transition"
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-white mb-1">
                            Username <span className="text-orange-400">*</span>
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="username"
                            className="w-full border-b-2 border-gray-700 focus:border-orange-500 bg-black/60 text-white pb-2 text-lg font-light placeholder-gray-400 rounded-none transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-white mb-1">
                            Password <span className="text-orange-400">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full border-b-2 border-gray-700 focus:border-orange-500 bg-black/60 text-white pb-2 text-lg font-light placeholder-gray-400 rounded-none transition"
                        />
                    </div>
                </>
            )}
            {mode === 'login' && (
                <div className="text-xs text-gray-500 space-y-1">
                    <div>
                        <span className="font-semibold">Demo Username:</span>{' '}
                        <span className="font-mono">kevinryan</span>
                    </div>
                    <div>
                        <span className="font-semibold">Demo Password:</span>{' '}
                        <span className="font-mono">kev02937@</span>
                    </div>
                </div>
            )}
            {mode === 'verify' && (
                <>
                    <div>
                        <label htmlFor="code" className="block text-sm font-semibold text-white mb-1">
                            Verification code <span className="text-orange-400">*</span>
                        </label>
                        <input
                            id="code"
                            type="text"
                            required
                            value={verificationCode}
                            onChange={e => setVerificationCode(e.target.value)}
                            placeholder="Enter the code from email"
                            className="w-full border-b-2 border-gray-700 focus:border-orange-500 bg-black/60 text-white pb-2 text-lg font-light placeholder-gray-400 rounded-none transition"
                        />
                    </div>
                    <div className="text-xs text-gray-500">
                        (For testing: <span className="font-mono">{sentCode}</span>)
                    </div>
                </>
            )}
            {error && <div className="text-orange-400 text-sm font-semibold">{error}</div>}
            {success && <div className="text-green-400 text-sm font-semibold">{success}</div>}
            <button
                type="submit"
                className="mt-8 w-full py-3 bg-orange-500 text-white uppercase text-lg font-bold rounded-lg shadow hover:bg-orange-600 transition"
            >
                {mode === 'login' ? 'Sign in' : mode === 'register' ? 'Register' : 'Verify'}
            </button>
        </form>
    );
};

export default LoginForm; 