// https://nextjs.org/blog/markdown
// https://beta.nextjs.org/docs/guides/mdx

import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

import path from 'path'
import { promises as fs } from 'fs'
import { Suspense } from 'react'

export default async function Topic({ params }: {params: { article: string } }) {

  const docsDir = path.join(process.cwd(), 'content', 'docs')
  const filenames = (await fs.readdir(docsDir)).filter(f => /\.(mdx|md)$/.test(f))
  const routes = filenames.map(f => f.replace(/\.[^/.]+$/, '') )

  console.log(filenames)
  console.log(params)

  let [p, f] = ["", ""]
  for (const i in routes) { if (params.article.toLowerCase() === routes[i].toLowerCase()) { 
    p = routes[i]; f = filenames[i]; break } 
  }
  if (!p && !f) return <>{JSON.stringify(filenames)}</>

  const content = (await fs.readFile(path.join(process.cwd(), 'content', 'docs', f))).toString()
  console.log(content)
  const gm = matter(content)

  return (
    <div className='article container mx-auto max-w-4xl mt-10 mb-20'>
      <Suspense fallback={<>Loading...</>}>
        <article className='prose dark:prose-invert max-w-none'>
          {/* @ts-expect-error Server Component */}
          <MDXRemote source={gm.content} compiledSource={''} />
        </article>
      </Suspense>
    </div>
  )
}