interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const portfolioData: Project[] = [
  {
    title: 'TVie',
    description:
      '영화 · TV · 인물 정보 제공 사이트. 필터와 검색 기능을 제공하며 로그인 시 즐겨찾기 제공',
    imgSrc: '/static/images/tvieImg.PNG',
    href: '/blog/portfolio/tvie',
  },
]

export default portfolioData
