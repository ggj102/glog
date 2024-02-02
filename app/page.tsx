import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allDevlogs, allPortfolios, allRetrospects, allSkills } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const mdxArr = [allDevlogs, allPortfolios, allRetrospects, allSkills]
  const allBlogs = mdxArr.reduce((acc, val) => {
    return acc.concat(val)
  }, [])

  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
