import { useMemo, useState } from 'react'
import { clsx } from 'clsx'
import Post from '../components/Post'
import interviews from '../data/interview.json'

const sortedInterviews = interviews.sort((x, y) => y.star - x.star)

export default function Posts () {
  const [currentTag, setCurrentTag] = useState('前端')
  const [currentYear, setCurrentYear] = useState(-1)

  const computeInterviews = useMemo(() => {
    return sortedInterviews
      .filter(i => {
        return i.star > 30 &&
          (currentTag === '未知' ? i.tags.length === 0 : i.tags.includes(currentTag)) &&
          (currentYear === -1 ? true : i.createdAt.startsWith(currentYear.toString()))
      })
  }, [interviews, currentTag, currentYear])

  return (
    <div className="content-container py-8 border-b">
      <div className="flex mb-2 py-2 gap-4">
        {
          ['前端', '后端', '移动端', '未知'].map(tag => (
            <div key={tag} className={clsx({ 'text-orange-500 font-bold border-orange-500': currentTag === tag }, 'hover:cursor-pointer')} onClick={() => {
              setCurrentTag(tag)
              setCurrentYear(-1)
            }}>{tag}</div>
          ))
        }
      </div>
      <div className="flex border-b mb-4 py-2 gap-4">
        {
          [2017, 2018, 2019, 2020, 2021, 2022, 2023].map(year => (
           <div key={year} className={clsx({ 'text-orange-500 font-bold border-orange-500': currentYear === year }, 'hover:cursor-pointer font-mono')} onClick={() => {
              setCurrentYear(year)
            }}>{year}</div>
          ))
        }
        <div className="ml-auto">
          共计 <span className="font-mono font-bold text-orange-500">{computeInterviews.length}</span> 篇面经
        </div>
      </div>
      <div>
        {
          computeInterviews.map(interview => (
              <Post key={interview.id} {...interview} />
            ))
        }
      </div>
    </div>
  )
}