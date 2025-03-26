import React from 'react';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#FFF9CA] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold text-[#FF9494]">Settings</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#FF9494]">Account</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" 
                  className="mt-1 block bg-white w-full border-gray-300 rounded-md shadow-sm focus:ring-[#FF9494] focus:border-[#FF9494]" 
                  placeholder="your@email.com" 
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <button className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF9494] hover:bg-[#FFD1D1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9494]">
                  Change Password
                </button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#FF9494]">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                <button 
                  className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9494]" 
                  role="switch" aria-checked="true"
                >
                  <span className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Push Notifications</span>
                <button className="bg-[#FF9494] relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9494]" role="switch" aria-checked="true">
                  <span className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#FF9494]">Appearance</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme</label>
                <select id="theme" name="theme" className="mt-1 block bg-white border w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#FF9494] focus:border-[#FF9494] sm:text-sm rounded-md">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
              <div>
                <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">Font Size</label>
                <input type="range" id="fontSize" name="fontSize" min="12" max="24" className="mt-1 block w-full" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#FF9494]">Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Make Profile Public</span>
                <button className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9494]" role="switch" aria-checked="false">
                  <span className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
              <div>
                <button className="text-sm text-[#FF9494] hover:text-[#FFD1D1]">
                  Delete Account
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF9494] hover:bg-[#FFD1D1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9494]">
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}

