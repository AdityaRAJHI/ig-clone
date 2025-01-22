import React, { useEffect, useState } from 'react';
    import { supabase } from '../lib/supabase';
    import { Heart, MessageCircle, Send, Bookmark, User, Clock, Activity, Tag, List, Users, Facebook, Settings } from 'lucide-react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useAuthStore } from '../store/authStore';

    export default function Feed() {
      const [posts, setPosts] = useState([]);
      const user = useAuthStore((state) => state.user);
      const profile = useAuthStore((state) => state.profile);
      const [stories, setStories] = useState([
        {
          id: 1,
          username: 'Your Story',
          avatar_url:
            'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        },
        {
          id: 2,
          username: 'karennne',
          avatar_url:
            'https://images.unsplash.com/photo-1494790108377-be9c29b10057?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          isLive: true,
        },
        {
          id: 3,
          username: 'zackjohn',
          avatar_url:
            'https://images.unsplash.com/photo-1500648767791-00d5618e71a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60',
        },
        {
          id: 4,
          username: 'kieron_d',
          avatar_url:
            'https://images.unsplash.com/photo-1539571696350-5a941cf66fed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60',
        },
        {
          id: 5,
          username: 'craig_',
          avatar_url:
            'https://images.unsplash.com/photo-1531427186511-0f1c54671672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1hbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60',
        },
      ]);
      const [searchActive, setSearchActive] = useState(false);
      const [activityActive, setActivityActive] = useState(false);
      const [createActive, setCreateActive] = useState(false);
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const navigate = useNavigate();

      useEffect(() => {
        fetchPosts();
      }, []);

      const fetchPosts = async () => {
        try {
          const { data, error } = await supabase
            .from('posts')
            .select(`
              *,
              profiles:user_id (username, avatar_url),
              likes (user_id),
              comments (id)
            `)
            .order('created_at', { ascending: false });

          if (error) throw error;
          setPosts(data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      const handleLike = async (postId) => {
        if (!user) return;

        try {
          const { data: existingLike } = await supabase
            .from('likes')
            .select()
            .eq('post_id', postId)
            .eq('user_id', user.id)
            .single();

          if (existingLike) {
            await supabase
              .from('likes')
              .delete()
              .eq('post_id', postId)
              .eq('user_id', user.id);
          } else {
            await supabase
              .from('likes')
              .insert({ post_id: postId, user_id: user.id });
          }

          fetchPosts();
        } catch (error) {
          console.error('Error handling like:', error);
        }
      };

      const handleSearchClick = () => {
        setSearchActive(true);
      };

      const handleSearchClose = () => {
        setSearchActive(false);
      };

      const handleActivityClick = () => {
        setActivityActive(true);
      };

      const handleActivityClose = () => {
        setActivityActive(false);
      };

      const handleCreateClick = () => {
        setCreateActive(true);
      };

      const handleCreateClose = () => {
        setCreateActive(false);
      };

      const handleProfileClick = () => {
        if (profile?.username) {
          navigate(`/profile/${profile.username}`);
        }
      };

      const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

      return (
        <div className="mx-auto max-w-2xl relative">
          {searchActive ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:border-gray-400 focus:outline-none"
                  />
                  <button
                    onClick={handleSearchClose}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                    >
                      <line x1="18" x2="6" y1="6" y2="18" />
                      <line x1="6" x2="18" y1="6" y2="18" />
                    </svg>
                  </button>
                </div>
                <button className="text-gray-700">
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
                    className="lucide lucide-scan"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="12" x2="12" y1="8" y2="16" />
                    <line x1="8" x2="16" y1="12" y2="12" />
                  </svg>
                </button>
              </div>
              <div className="flex space-x-4 overflow-x-auto">
                <button className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                  IGTV
                </button>
                <button className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                  Shop
                </button>
                <button className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                  Style
                </button>
                <button className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                  Sports
                </button>
                <button className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                  Auto
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[...Array(12)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden bg-gray-200"
                  >
                    <img
                      src={`https://source.unsplash.com/random/300x300?sig=${index}`}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : activityActive ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Activity</h2>
                <button onClick={handleActivityClose} className="text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x"
                  >
                    <line x1="18" x2="6" y1="6" y2="18" />
                    <line x1="6" x2="18" y1="6" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-between border-b pb-2">
                <button className="text-gray-700 font-semibold">
                  Following
                </button>
                <button className="text-gray-700 font-semibold">You</button>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500">
                  Follow Requests
                </h3>
                <h3 className="text-sm font-semibold text-gray-500">New</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b10057?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      alt="karennne"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold">karennne</p>
                      <p className="text-sm text-gray-500">liked your photo. 1h</p>
                    </div>
                  </div>
                  <img
                    src="https://source.unsplash.com/random/50x50?sig=1"
                    alt=""
                    className="h-10 w-10 rounded-md object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-500">Today</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1539571696350-5a941cf66fed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60"
                        alt="kieron_d"
                        className="h-8 w-8 rounded-full"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00d5618e71a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60"
                        alt="zackjohn"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        kiero_d, zackjohn and 26 others
                      </p>
                      <p className="text-sm text-gray-500">liked your photo. 3h</p>
                    </div>
                  </div>
                  <img
                    src="https://source.unsplash.com/random/50x50?sig=2"
                    alt=""
                    className="h-10 w-10 rounded-md object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-500">
                  This Week
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1531427186511-0f1c54671672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1hbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60"
                      alt="craig_"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold">craig_love</p>
                      <p className="text-sm text-gray-500">
                        mentioned you in a comment: @jacob_w exactly..
                      </p>
                      <div className="flex items-center space-x-1 text-gray-500">
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
                          className="lucide lucide-message-square"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span className="text-xs">2d</span>
                      </div>
                    </div>
                  </div>
                  <img
                    src="https://source.unsplash.com/random/50x50?sig=3"
                    alt=""
                    className="h-10 w-10 rounded-md object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60"
                      alt="martini_rond"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold">martini_rond</p>
                      <p className="text-sm text-gray-500">started following you. 3d</p>
                    </div>
                  </div>
                  <button className="rounded-md border border-gray-300 px-3 py-1 text-sm font-semibold text-gray-700">
                    Message
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1531384441371-4927384f8ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbnxlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60"
                      alt="maxjacobson"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold">maxjacobson</p>
                      <p className="text-sm text-gray-500">started following you. 3d</p>
                    </div>
                  </div>
                  <button className="rounded-md border border-gray-300 px-3 py-1 text-sm font-semibold text-gray-700">
                    Message
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1531123872034-7754e960a794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                      alt="mis_potter"
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold">mis_potter</p>
                      <p className="text-sm text-gray-500">started following you. 3d</p>
                    </div>
                  </div>
                  <button className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-semibold text-white hover:bg-indigo-500">
                    Follow
                  </button>
                </div>
                <h3 className="text-sm font-semibold text-gray-500">
                  This Month
                </h3>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 overflow-x-auto">
                <ul className="flex space-x-4">
                  {stories.map((story) => (
                    <li key={story.id}>
                      <div className="relative">
                        <img
                          src={story.avatar_url}
                          alt={story.username}
                          className="h-16 w-16 rounded-full border-2 border-gray-300 object-cover"
                        />
                        {story.isLive && (
                          <span className="absolute bottom-0 left-0 rounded-full bg-red-500 px-1 text-[10px] text-white">
                            LIVE
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-center text-xs text-gray-700">
                        {story.username}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-8">
                {posts.map((post) => (
                  <div key={post.id} className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="flex items-center justify-between p-4">
                      <Link
                        to={`/profile/${post.profiles.username}`}
                        className="flex items-center space-x-2"
                      >
                        <img
                          src={
                            post.profiles.avatar_url ||
                            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                          }
                          alt={post.profiles.username}
                          className="h-10 w-10 rounded-full"
                        />
                        <span className="font-semibold">{post.profiles.username}</span>
                      </Link>
                      <button onClick={toggleSidebar} className="text-gray-500">
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
                          className="lucide lucide-more-horizontal"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </svg>
                      </button>
                    </div>

                    <img
                      src={post.image_url}
                      alt="Post"
                      className="aspect-square w-full object-cover"
                    />

                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center space-x-1 ${
                              post.likes.some((like) => like.user_id === user?.id)
                                ? 'text-red-500'
                                : 'text-gray-700'
                            }`}
                          >
                            <Heart className="h-6 w-6" />
                          </button>
                          <button className="flex items-center space-x-1 text-gray-700">
                            <MessageCircle className="h-6 w-6" />
                          </button>
                          <button className="flex items-center space-x-1 text-gray-700">
                            <Send className="h-6 w-6" />
                          </button>
                        </div>
                        <button className="text-gray-700">
                          <Bookmark className="h-6 w-6" />
                        </button>
                      </div>

                      <div className="mt-2">
                        <p className="text-sm">
                          Liked by{' '}
                          <span className="font-semibold">craig_love</span> and{' '}
                          <span className="font-semibold">
                            {post.likes.length} others
                          </span>
                        </p>
                        <p className="mt-1">
                          <Link
                            to={`/profile/${post.profiles.username}`}
                            className="font-semibold"
                          >
                            {post.profiles.username}
                          </Link>{' '}
                          {post.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="fixed bottom-0 left-0 right-0 border-t bg-white">
                <div className="container mx-auto flex justify-around p-3">
                  <button className="text-gray-700">
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
                      className="lucide lucide-home"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </button>
                  <button onClick={handleSearchClick} className="text-gray-700">
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
                      className="lucide lucide-search"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" x2="16.65" y1="21" y2="16.65" />
                    </svg>
                  </button>
                  <button onClick={handleCreateClick} className="text-gray-700">
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
                      className="lucide lucide-plus-square"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="12" x2="12" y1="8" y2="16" />
                      <line x1="8" x2="16" y1="12" y2="12" />
                    </svg>
                  </button>
                  <button onClick={handleActivityClick} className="text-gray-700">
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
                      className="lucide lucide-heart"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 1.26-3 3-1.76-1.74-3-3-3-3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
                    </svg>
                  </button>
                  <button onClick={handleProfileClick} className="text-gray-700">
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="profile"
                        className="h-6 w-6 rounded-full"
                      />
                    ) : (
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
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
          {sidebarOpen && (
            <div className="absolute top-0 right-0 z-10 h-full w-64 bg-white shadow-lg">
              <div className="p-4">
                <h2 className="text-xl font-semibold">Options</h2>
                <button onClick={toggleSidebar} className="text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x"
                  >
                    <line x1="18" x2="6" y1="6" y2="18" />
                    <line x1="6" x2="18" y1="6" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="border-t">
                <button className="flex items-center space-x-2 block w-full px-4 py-2 text-left hover:bg-gray-100">
                  <Clock className="h-4 w-4" />
                  <span>Archive</span>
                </button>
                <button className="flex items-center space-x-2 block w-full px-4 py-2 text-left hover:bg-gray-100">
                  <Activity className="h-4 w-4" />
                  <span>Your Activity</span>
                </button>
                <button className="flex items-center space-x-2 block w-full px-4 py-2 text-left hover:bg-gray-100">
                  <Tag className="h-4 w-4" />
                  <span>Nametag</span>
                </button>
                <button className="flex items-center space-x-2 block w-full px-4 py-2 text-left hover:bg-gray-100">
                  <Bookmark className="h-4 w-4" />
                  <span>Saved</span>
                </button>
                <button className="flex items-center space-x-2 block w-full px-4 py-2 text-left hover:bg-gray-100">
                  <List className="h-4 w-4" />
                  <span>Close Friends</span>
                </button>
                <button className="flex items-center space-x-2 block w-full px-4 py-2 text-left hover:bg-gray-100">
                  <Users className="h-4 w-4" />
                  <span>Discover People</span>
                </button>
                <button className="flex items-center space-x-2 block w-full px-4 py-2 text-left hover:bg-gray-100">
                  <Facebook className="h-4 w-4" />
                  <span>Open Facebook</span>
                </button>
              </div>
              <div className="absolute bottom-0 w-full border-t">
                <button className="flex items-center space-x-2 block w-full px-4 py-2 text-left hover:bg-gray-100">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
