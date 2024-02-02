import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import {
  Devlog,
  Portfolio,
  Retrospect,
  Skills,
  allDevlogs,
  allPortfolios,
  allRetrospects,
  allSkills,
} from 'contentlayer/generated'

const POSTS_PER_PAGE = 5

type CategoryDataType = {
  devlog: Devlog[]
  portfolio: Portfolio[]
  retrospect: Retrospect[]
  skills: Skills[]
}

const categoryData: CategoryDataType = {
  devlog: allDevlogs,
  portfolio: allPortfolios,
  retrospect: allRetrospects,
  skills: allSkills,
}

export const generateStaticParams = async () => {
  const keys = Object.keys(categoryData)
  keys.unshift('allposts')

  const path = keys.reduce(
    (
      acc: {
        slug: string[]
      }[],
      val: string
    ) => {
      let length = 0
      if (val === 'allposts') {
        for (let i = 1; i < keys.length; i++) {
          length += categoryData[keys[i]].length
        }
      } else length = categoryData[val].length

      const totalPages = Math.ceil(length / POSTS_PER_PAGE)

      for (let i = 1; i <= totalPages; i++) {
        acc.push({ slug: [val, `${i}`] })
      }
      return acc
    },
    []
  )

  return path
}

export default function Page({ params }: { params: { slug: string[] } }) {
  const [category, page] = params.slug
  let mdxData

  if (category === 'allposts') {
    const keys = Object.keys(categoryData)
    mdxData = keys.reduce((acc, val) => {
      return acc.concat(categoryData[val])
    }, [])
  } else mdxData = categoryData[category]

  const posts = allCoreContent(sortPosts(mdxData))
  const pageNumber = parseInt(page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
