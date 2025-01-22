import React, { useEffect, useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { supabase } from '../lib/supabase';
    import { Grid, User } from 'lucide-react';

    export default function Profile() {
      const { username } = useParams();
      const navigate = useNavigate();
      const [profile, setProfile] = useState(null);
      const [posts, setPosts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const [stories, setStories] = useState([
        {
          id: 1,
          title: 'New',
          image_url:
            'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        },
        {
          id: 2,
          title: 'Friends',
          image_url:
            'https://images.unsplash.com/photo-1494790108377-be9c29b10057?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
          id: 3,
          title: 'Sport',
          image_url:
            'https://images.unsplash.com/photo-1500648767791-00d5618e71a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60',
        },
        {
          id: 4,
          title: 'Design',
          image_url:
            'https://images.unsplash.com/photo-1539571696350-5a941cf66fed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60',
        },
      ]);

      useEffect(() => {
        if (!username) {
          navigate('/');
          return;
        }
        fetchProfile();
        fetchPosts();
      }, [username]);

      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .single();

          if (error) {
            if (error.code === 'PGRST116') {
              throw new Error('Profile not found');
            }
            throw error;
          }

          setProfile(data);
        } catch (error) {
          console.error('Error fetching profile:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      const fetchPosts = async () => {
        if (!username) return;

        try {
          const { data, error } = await supabase
            .from('posts')
            .select(`
              *,
              profiles:user_id (username),
              likes (id),
              comments (id)
            `)
            .eq('profiles.username', username)
            .order('created_at', { ascending: false });

          if (error) throw error;
          setPosts(data || []);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      if (loading) {
        return (
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-lg">Loading profile...</div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="mx-auto max-w-4xl py-8">
            <div className="rounded-lg bg-red-50 p-4">
              <div className="text-center text-red-700">{error}</div>
            </div>
          </div>
        );
      }

      if (!profile) {
        return (
          <div className="mx-auto max-w-4xl py-8">
            <div className="rounded-lg bg-yellow-50 p-4">
              <div className="text-center text-yellow-700">Profile not found</div>
            </div>
          </div>
        );
      }

      return (
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <img
                  src={
                    profile.avatar_url ||
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  }
                  alt={profile.username}
                  className="h-32 w-32 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <h1 className="text-2xl font-bold">{profile.username}</h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-lock"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <p className="text-gray-600">{profile.full_name}</p>
                  <p className="text-gray-600">
                    <a
                      href="https://pixsellz.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      @pixsellz
                    </a>
                  </p>
                  <p className="text-gray-600">Everything is designed.</p>
                  <div className="mt-4 flex space-x-8">
                    <div>
                      <span className="font-bold">{posts.length}</span> posts
                    </div>
                    <div>
                      <span className="font-bold">0</span> followers
                    </div>
                    <div>
                      <span className="font-bold">0</span> following
                    </div>
                  </div>
                </div>
              </div>
              <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700">
                Edit Profile
              </button>
            </div>
            <div className="mb-6 overflow-x-auto">
              <ul className="flex space-x-4">
                {stories.map((story) => (
                  <li key={story.id}>
                    <div className="relative">
                      <img
                        src={story.image_url}
                        alt={story.title}
                        className="h-16 w-16 rounded-full border-2 border-gray-300 object-cover"
                      />
                    </div>
                    <p className="mt-1 text-center text-xs text-gray-700">
                      {story.title}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center border-b">
              <button className="border-b-2 border-gray-900 px-4 py-2 text-gray-700">
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
                  className="lucide lucide-grid"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button className="px-4 py-2 text-gray-500">
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
                  className="lucide lucide-user"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200"
                >
                  <img
                    src={post.image_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 opacity-0 transition-all group-hover:bg-opacity-50 group-hover:opacity-100">
                    <div className="flex space-x-4 text-white">
                      <span className="flex items-center">
                        <Grid className="mr-2 h-6 w-6" />
                        {post.likes.length}
                      </span>
                      <span className="flex items-center">
                        <Grid className="mr-2 h-6 w-6" />
                        {post.comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
