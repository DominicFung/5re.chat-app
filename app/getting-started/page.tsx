"use client"

import GS_Step1 from '@/content/other/getting-started-step1.mdx'
import GS_Step2 from '@/content/other/getting-started-step2.mdx'
import GS_Step3 from '@/content/other/getting-started-step3.mdx'

import { useUserContext } from '@/context/usercontext'

export default function GettingStarted() {
  const { user } = useUserContext()

  return <main className="p-5">
    <div className='article container mx-auto max-w-4xl mt-10 mb-20'>
      <article className='prose dark:prose-invert max-w-none prose-xl'>
        { !user && <GS_Step1 /> }
        { user && !user.apps[0]?.discordGuildId && <GS_Step2 /> }
        { user && user.apps[0]?.discordGuildId && <GS_Step3 /> }
      </article>
      </div>
  </main>
}