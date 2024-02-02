// import ListLayout from '@/layouts/ListLayoutWithTags'
// import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
// import { allDevlogs, allPortfolios, allRetrospects, allSkills } from 'contentlayer/generated'
// import { genPageMetadata } from 'app/seo'

// const POSTS_PER_PAGE = 5

// export const metadata = genPageMetadata({ title: 'Blog' })

// export default function BlogPage() {
//   const arr = [allDevlogs, allPortfolios, allRetrospects, allSkills]

//   const reduce = arr.reduce((acc, val) => {
//     return acc.concat(val)
//   }, [])

//   const posts = allCoreContent(sortPosts(reduce))
//   const pageNumber = 1
//   const initialDisplayPosts = posts.slice(
//     POSTS_PER_PAGE * (pageNumber - 1),
//     POSTS_PER_PAGE * pageNumber
//   )
//   const pagination = {
//     currentPage: pageNumber,
//     totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
//   }

//   return (
//     <ListLayout
//       posts={posts}
//       initialDisplayPosts={initialDisplayPosts}
//       pagination={pagination}
//       title="All Posts"
//     />
//   )
// }
