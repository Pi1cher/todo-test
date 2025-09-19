import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { updateUserDisplayName } from '../services/userService';

export const SetNickname = () => {
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !displayName.trim()) return;

        setLoading(true);

        try {
            await updateUserDisplayName(user.uid, displayName.trim());
            setUser({ ...user, displayName: displayName.trim() });
            navigate('/todos');
        } catch (error) {
            console.error('Error updating display name:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Set your nickname
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please choose a display name for your account
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                            Nickname
                        </label>
                        <input
                            id="displayName"
                            name="displayName"
                            type="text"
                            required
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your nickname"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !displayName.trim()}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Continue'}
                    </button>
                </form>
            </div>
        </div>
    );
};