"use client"

import { useUserContext } from "@/context/usercontext"
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'

export default function Profile() {
  const { user } = useUserContext()

  return (<div className="">
    {user && <div className="hidden container">
      <button onClick={() => {}}>Logout</button>
      <div>
        <div className="content">
          <img src={user.avatarUrl} alt="Avatar"/>
          <span>{user.username}</span>
        </div>
      </div>
    </div>}
    {user && <div>
      <div className="mb-6">
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative max-w-xl">
          <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            value={`5rc_${user.apiKey}`}  placeholder="API Key" required />
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <DocumentDuplicateIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>}
  </div>)
}