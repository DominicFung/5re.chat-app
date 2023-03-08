'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useUserContext } from '@/context/usercontext'
import { _UserCookie } from '@/types'
import { _App } from '@/src/API'

export default function DeleteApp(props: { 
  app: _App|null|undefined, open: boolean, 
  setOpen: (b: boolean) => void, setDelete: () => void
}) {
  const cancelButtonRef = useRef(null)
  const { setUser } = useUserContext()

  const removeApp = async () => {
    if (props.app && props.app.appId !== "") {
      const data = await (await fetch(`/api/protected/removeApp`, {
        method: "DELETE",
        body: JSON.stringify({ appId: props.app.appId })
      })).json() as _UserCookie
      console.log(data)

      if (data) {
        props.setDelete()
        setUser(data)
      }
    }
  }

  useEffect(() => {
    console.log(props.app)
  }, [props.app])

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
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Delete "{props.app?.appName}"</h3>
                  <div className="space-y-2">
                    <div className='text-white pt-3 pb-6'>
                      Are you sure you want to delete app: "{props.app?.appName}"? You will not be able to recover this app.
                    </div>
                    <button type="submit" onClick={removeApp}
                      className="w-full text-white disabled:bg-gray-500 disabled:hover:bg-gray-500 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Delete
                    </button>
                    <button type="submit" onClick={() => { props.setOpen(false) }}
                      className="w-full text-white disabled:bg-gray-500 disabled:hover:bg-gray-500 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Dismiss
                    </button>
                  </div>
              </div>
            </div>
          </Transition.Child>
        </div>
            
      </Dialog>
    </Transition.Root>
  )
}