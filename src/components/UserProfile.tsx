import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

export const UserProfile = () => {
    const { user } = useAuthStore();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">User Profile</h1>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nickname</label>
                            <p className="mt-1 text-lg text-gray-900">{user.displayName}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Member since</label>
                            <p className="mt-1 text-lg text-gray-900">
                                {user.createdAt.toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex space-x-4">
                        <Link
                            to="/todos"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Go to Todos
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};