import React from 'react';
    import { Clock, Activity, Tag, List, Users, Facebook, Settings } from 'lucide-react';

    interface SidebarProps {
      isOpen: boolean;
      onClose: () => void;
    }

    const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
      if (!isOpen) return null;

      return (
        <div className="absolute top-0 right-0 z-10 h-full w-64 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-semibold">Options</h2>
            <button onClick={onClose} className="text-gray-500">
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
      );
    };

    export default Sidebar;
