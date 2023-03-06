// https://nextjs.org/blog/markdown
// https://beta.nextjs.org/docs/guides/mdx

import Docs from '@/content/other/docs.mdx'

export default function Documentation() {
  return <main className="p-5">
    <div className='article container mx-auto max-w-4xl mt-10 mb-20'>
      <article className='prose dark:prose-invert max-w-none prose-xl'>
        <Docs />
      </article>
    </div>
  </main>
}