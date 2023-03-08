'use client'

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useUserContext } from '@/context/usercontext'
import { _UserCookie } from '@/types'

export default function AddApp(props:{ open: boolean, setOpen: (b: boolean) => void }) {
  const cancelButtonRef = useRef(null)
  const [ appName, setAppName ] = useState("")

  const { setUser } = useUserContext()

  const addApp = async () => {
    if (appName !== "") {
      const data = await (await fetch(`/api/protected/addApp`, {
        method: "POST",
        body: JSON.stringify({ appName })
      })).json() as _UserCookie
      console.log(data)

      if (data) {
        setUser(data)
        props.setOpen(false)
      }
    }
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div" style={{zIndex: 100}}
        auto-reopen="true"
        className="fixed inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        {/* <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"> */}

        <div className="mx-5 flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg shadow dark:bg-gray-700 text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-md">
              <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">New 🔥 Chat App</h3>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="appname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Application Name</label>
                      <input name="App Name" id="appname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        value={appName} onChange={(e) => {setAppName(e.currentTarget.value)}} placeholder="default" required />
                    </div>
                    <button type="submit" disabled={appName === ""} onClick={addApp}
                      className="w-full text-white disabled:bg-gray-500 disabled:hover:bg-gray-500 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                  </div>
              </div>
            </div>
          </Transition.Child>
        </div>
            
      </Dialog>
    </Transition.Root>
    )
}