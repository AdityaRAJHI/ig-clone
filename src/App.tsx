import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Navbar from './components/Navbar';
    import Feed from './components/Feed';
    import Auth from './components/Auth';
    import Profile from './components/Profile';
    import CreatePost from './components/CreatePost';
    import Chat from './components/Chat';

    function App() {
      return (
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </main>
          </div>
        </Router>
      );
    }

    export default App;
