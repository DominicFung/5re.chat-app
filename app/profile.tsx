"use client"

import { useUserContext } from "@/context/usercontext"
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useState } from "react"

export default function Profile() {
  const { user } = useUserContext()

  const [appIndex, setAppIndex] = useState(0)

  return (<div className="w-full p-4 flex justify-center pb-24 ">
    {user && <div className="container mx-w-2xl">
      <div className="py-6">
        <h1 className="text-7xl text-gray-700">Hi {user.username} 👋</h1>
        <p className=""></p>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300" />

      <div className="max-w-xl">
        <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900">Default Discord Guild to for your apps</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36">
            <defs><style>{".cls-1{fill:#fff;}"}</style></defs>
            <g id="图层_2" data-name="图层 2"><g id="Discord_Logos" data-name="Discord Logos"><g id="Discord_Logo_-_Large_-_White" data-name="Discord Logo - Large - White">
            <path className="cls-1" 
              d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></g></g></g></svg>
          </span>
          <input type="text" id="website-admin" className="rounded-none p-4 rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Discord Guild ID" />
          <button className="text-white relative right-3.5 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Test & Save</button>
        </div>

      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300" />

      { user.apps && <div>
        <h2 className="px-2 py-5 text-3xl text-gray-600">App</h2>
        <div className="mb-6">
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative max-w-xl">
            <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              value={`${user.apps[appIndex]?.appId}`}  placeholder="API Key" required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <DocumentDuplicateIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative max-w-xl">
            <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              value={`5rc_${user.apps[appIndex]?.apiKey}`}  placeholder="API Key" required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <DocumentDuplicateIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div> }
    
    </div>}
  </div>)
}