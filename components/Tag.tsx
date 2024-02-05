import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/blog/category/${slug(text)}/1`}
      className="mr-3 text-sm font-medium uppercase text-[#5CE1E6] hover:text-[#49b7bb] dark:hover:text-[#b6fdff]"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
