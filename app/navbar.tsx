"use client"

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ArrowRightOnRectangleIcon, Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useUserContext } from '@/context/usercontext'

import fireChatIcon from '@/assets/icons8-fire-96.png'
import Image from 'next/image'

import jscookie from 'js-cookie'
import { usePathname } from 'next/navigation'

import secret from "@/frontend.secret.json"
const _ENV = process.env.NODE_ENV as "development" | "production"

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Nav { name: string, href: string, current: boolean }

export default function Navbar() {
  const pathname = usePathname()
  const { user, setUser } = useUserContext()
  const [navigation, setNavigation ] = useState<Nav[]>([
    { name: '5re Chat', href: '/', current: false },
    { name: 'Getting Started', href: '/getting-started', current: false },
    { name: 'Docs', href: '/docs', current: false },
    { name: 'Support Me!', href: '/support', current: false },
  ])

  const logout = () => { jscookie.remove("token"); setUser(null) }

  const manipulateNavigation = (setCurrent: string) => {
    for (const n in navigation) {
      if (navigation[n].href.toLowerCase() === setCurrent) { navigation[n].current = true }
      else { navigation[n].current = false }
    }
    console.log(`Here: ${JSON.stringify(navigation)}`)
    setNavigation([...navigation])
  }

  useEffect(() => {
    if (pathname) {
      console.log(pathname)
      if (pathname.toLowerCase().startsWith("/docs")) { manipulateNavigation("/docs") }
      else if (pathname.toLowerCase().startsWith("/getting-started")) { manipulateNavigation("/getting-started") }
      else if (pathname.toLowerCase().startsWith("/support")) { manipulateNavigation("/support") }
      else if (pathname.toLowerCase().startsWith("/")) { manipulateNavigation("/") }
    }
  }, [pathname])

  return (
    <Disclosure as="nav" className="bg-gray-800">
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Image
                  className="block h-8 w-auto lg:hidden"
                  src={fireChatIcon}
                  alt="Your Company"
                />
                <Image
                  className="hidden h-8 w-auto lg:block"
                  src={fireChatIcon}
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            { !user && <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <a className='text-gray-400 hover:text-white' href={`https://github.com/login/oauth/authorize?scope=user&client_id=${secret.github[_ENV].clientId}&redirect_uri=${secret.github[_ENV].redirectUri}`}>
                {/* <span className='align-top relative top-1'>Login</span>
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
                <button 
                  className="focus:outline-none dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 transition-colors border-2 dark:border-gray-800 dark:hover:border-gray-700">
                  <span className='flex flex-row'>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 dark:fill-white fill-slate-900">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z">
                      </path>
                    </svg>
                    <span className='px-3 py-0.5 dark:text-white text-gray-800'>Login with GitHub</span>
                  </span>
                </button>
              </a>
            </div>}
            { user && <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatarUrl}
                      alt="profile"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/#profile"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <span onClick={logout}
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Sign out
                        </span>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>}
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block px-3 py-2 rounded-md text-base font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>)
}
