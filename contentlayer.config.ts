import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer/source-files'
// import { pathToFileURL } from 'node:url'
// import { writeFileSync } from 'fs'
import readingTime from 'reading-time'
import { slug } from 'github-slugger'
import path from 'path'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import siteMetadata from './data/siteMetadata'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

// function createSearchIndex(allBlogs) {
//   if (
//     siteMetadata?.search?.provider === 'kbar' &&
//     siteMetadata.search.kbarConfig.searchDocumentsPath
//   ) {
//     writeFileSync(
//       // `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
//       'public/search.json',
//       JSON.stringify(allCoreContent(sortPosts(allBlogs)))
//     )
//     console.log('Local search index generated...')
//   }
// }

const blogObj = (name) => {
  const path = name.charAt(0).toLowerCase() + name.slice(1)

  return defineDocumentType(() => ({
    name,
    filePathPattern: `${path}/**/*.mdx`,
    contentType: 'mdx',
    fields: {
      title: { type: 'string', required: true },
      date: { type: 'date', required: true },
      tags: { type: 'list', of: { type: 'string' }, default: [] },
      category: { type: 'string', required: true },
      lastmod: { type: 'date' },
      draft: { type: 'boolean' },
      summary: { type: 'string' },
      images: { type: 'json' },
      authors: { type: 'list', of: { type: 'string' } },
      layout: { type: 'string' },
      bibliography: { type: 'string' },
      canonicalUrl: { type: 'string' },
    },
    computedFields: {
      ...computedFields,
      structuredData: {
        type: 'json',
        resolve: (doc) => ({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: doc.title,
          datePublished: doc.date,
          dateModified: doc.lastmod || doc.date,
          description: doc.summary,
          image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
          url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
        }),
      },
    },
  }))
}

export const Blog = blogObj('Blog')

export const Devlog = blogObj('Devlog')
export const Portfolio = blogObj('Portfolio')
export const Retrospect = blogObj('Retrospect')
export const Skills = blogObj('Skills')

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors, Devlog, Portfolio, Retrospect, Skills],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },

  onSuccess: async (importData) => {
    // const test = await (isProduction
    //   ? importData()
    //   : import(`${pathToFileURL(process.cwd()).href}/.contentlayer/generated/index.mjs`))
    // const arr = [...allDevlogs, ...allPortfolios, ...allRetrospects, ...allSkills]
    // createSearchIndex(arr)
  },
})
