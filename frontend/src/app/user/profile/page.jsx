"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProfileForm from "@/app/components/ProfileForm";

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
  
  if (!user) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-black to-gray-900 px-4 py-12 pt-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-white mb-8">My Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-gray-400">{user.email}</p>
                
                <div className="w-full border-t border-gray-700 mt-4 pt-4">
                  <nav className="space-y-2">
                    <a 
                      href="/"
                      className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      Home
                    </a>
                    <a 
                      href="/user/video-generator" 
                      className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      Create Video
                    </a>
                    <a 
                      href="/user/profile" 
                      className="block px-4 py-2 rounded-lg bg-indigo-600 text-white transition-colors"
                    >
                      Edit Profile
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Form */}
          <div className="md:col-span-2">
            <ProfileForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile; 