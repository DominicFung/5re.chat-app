"use client"

import { useUserContext } from "@/context/usercontext"
import { _App } from "@/src/API"
import { Menu, Transition } from "@headlessui/react"
import { DocumentDuplicateIcon, PlusIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Fragment, useEffect, useState } from "react"

import AddApp from "./addapp"
import DeleteApp from "./deleteapp"

export default function Profile() {
  const { user } = useUserContext()

  const [appIndex, setAppIndex] = useState(0)
  const [guildId, setGuildId] = useState("")

  const [ openNewApp, setOpenNewApp] = useState(false)
  const [ openDeleteApp, setOpenDeleteApp ] = useState(false)

  const updateGuildId = async () => {
    if (guildId !== "") {
      const data = await (await fetch(`/api/protected/updateApp`, {
        method: "POST",
        body: JSON.stringify({
          appId: user!.apps[appIndex]!.appId!,
          discordGuildId: guildId
        })
      })).json() as _App
      console.log(data)
    }
  }

  useEffect(() => {
    if (user && user.userId && user.apps[appIndex]) {
      setGuildId(user.apps[appIndex]?.discordGuildId as string)
    }
  }, [user, appIndex])

  return (<div className="container mx-auto max-w-2xl mb-20">
    {user && <div className="mb-40">
      <div className="py-6">
        <h1 className="text-6xl text-gray-700 dark:text-gray-50">Hi {user.username} 👋</h1>
        <p className=""></p>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300 mb-8 md:mb-16" />

      { user.apps && <div>
        <div className="sm:hidden flex flex-row align-middle">
          <h2 className="text-2xl text-gray-600 dark:text-gray-100 p-2 pr-5">Application</h2>
          <div className="flex-1" />
          <button type="submit" onClick={() => { setOpenNewApp(true) }}
            className="ali text-white h-10 mx-1 mt-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
          <button type="submit" onClick={() => { setOpenDeleteApp(true) }}
            className="text-white h-10 mx-1 mt-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-row">
          <h2 className="hidden sm:inline text-3xl text-gray-600 dark:text-gray-100 p-2 pr-5">App:</h2>
          <div className="w-full">
            <Menu as="div" className="mb-6" onChange={(e: { currentTarget: any }) => { console.log(e) }}>
              <div className="flex">
                <Menu.Button id="dropdown-button" data-dropdown-toggle="dropdown" type="button"
                  className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                  {user.apps[appIndex]?.appName}
                  <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </Menu.Button>
                <div className="relative w-full">
                  <input type="search" id="search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-r-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    value={`${user.apps[appIndex]?.appId}`}  placeholder="API Key" required disabled onChange={() => {}}/>
                  <button type="submit" onClick={() => { setOpenNewApp(true) }}
                    className="hidden sm:block text-white absolute right-16 mr-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <PlusIcon className="w-6 h-6" />
                  </button>
                  <button type="submit" onClick={() => { setOpenDeleteApp(true) }}
                    className="hidden sm:block text-white absolute right-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="z-20 absolute left-0 top-1 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-600 focus:outline-none">
                    <div className="p-0">
                      { user.apps.map((app, i) => {
                        let roundedness = ""
                        if (i === 0) roundedness = "rounded-t-lg"
                        if (i === user.apps.length-1) roundedness = roundedness + " rounded-b-lg"
                        return <Menu.Item key={i}>
                          <button onClick={() => { setAppIndex(i) }}
                            className={`w-full block ${roundedness} px-6 py-2 ${i===appIndex?"dark:bg-blue-800 bg-blue-200":""} hover:bg-gray-100 dark:hover:bg-gray-500 dark:text-gray-300 dark:hover:text-white`}>
                            { app?.appName }
                          </button>
                        </Menu.Item>
                    })}
                    </div>
                  </Menu.Items>
                </Transition>
              </div>
            </Menu>
          </div>
        </div>
        
        
        <div className="mb-6">
          <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
            <span className="flex flex-row"> 
            Discord Guild to message you via 
            <QuestionMarkCircleIcon className="h-3.5 w-3.5 my-0.5 mx-2" />
          </span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36">
                <defs><style>{".cls-1{fill:#fff;}"}</style></defs>
                <g id="图层_2" data-name="图层 2"><g id="Discord_Logos" data-name="Discord Logos"><g id="Discord_Logo_-_Large_-_White" data-name="Discord Logo - Large - White">
                <path className="cls-1" 
                  d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></g></g></g>
                </svg>
            </span>
            <div className="relative w-full">
              <input type="text" id="website-admin" className="rounded-r-lg p-4 pl-6 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Discord Guild ID" value={guildId} onChange={(e) => { setGuildId(e.currentTarget.value) }}/>
              <button onClick={updateGuildId}
                className="text-white absolute right-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="flex flex-row">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <LockClosedIcon className="w-6 h-6 text-white" />
            </span>
            <div className="relative w-full">
              <input type="search" id="search" className="block w-full p-4 pl-6 text-sm text-gray-900 border border-gray-300 rounded-r-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                value={`5rc_${user.apps[appIndex]?.apiKey}`}  placeholder="API Key" required onChange={() => {}}/>
              <button type="submit" className="text-white absolute right-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <DocumentDuplicateIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="ml-3 flex justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" disabled className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
            </div>
            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
          </div>
        </div>
      </div> }
    
    <hr className="mt-20 h-px my-8 bg-gray-200 border-0 dark:bg-gray-300" />
    <AddApp open={openNewApp} setOpen={setOpenNewApp} />
    <DeleteApp app={user?.apps[appIndex]} open={openDeleteApp} setOpen={setOpenDeleteApp} 
      setDelete={() => { setAppIndex(appIndex-1); setOpenDeleteApp(false) }} 
    />
    </div>}
  </div>)
}