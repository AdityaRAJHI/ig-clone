import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useAuthStore } from '../store/authStore';
    import { Instagram, PlusSquare, User, LogOut, MessageSquare } from 'lucide-react';

    export default function Navbar() {
      const { user, profile, signOut } = useAuthStore();
      const navigate = useNavigate();
      const [sidebarOpen, setSidebarOpen] = React.useState(false);

      const handleSignOut = async () => {
        await signOut();
        navigate('/auth');
      };

      const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

      return (
        <nav className="border-b bg-white">
          <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <Link to="/" className="flex items-center space-x-2">
              <Instagram className="h-8 w-8" />
              <span className="text-xl font-semibold">Instagram Clone</span>
            </Link>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to="/create"
                    className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                  >
                    <PlusSquare className="h-6 w-6" />
                    <span>Create</span>
                  </Link>
                  {profile?.username && (
                    <Link
                      to={`/profile/${profile.username}`}
                      className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                    >
                      <User className="h-6 w-6" />
                      <span>{profile.username}</span>
                    </Link>
                  )}
                  <Link
                    to="/chat"
                    className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                  >
                    <MessageSquare className="h-6 w-6" />
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                  >
                    <LogOut className="h-6 w-6" />
                    <span>Sign Out</span>
                  </button>
                  <button onClick={toggleSidebar} className="text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-menu"
                    >
                      <line x1="4" x2="20" y1="12" y2="12" />
                      <line x1="4" x2="20" y1="6" y2="6" />
                      <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </nav>
      );
    }
