import fs from 'fs'
import interviews from '../data/interview-raw.json'
import { isInterviewExperience } from '../lib/tag'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function getInterviews() {
  const result: typeof interviews[0][] = []
  for (const interview of interviews) {
    const text = `${interview.title} ${interview.description}`

    const isIE = await isInterviewExperience(text)
    if (isIE) {
      result.push(interview)
      console.log('✅', interview.title)
    } else {
      console.log('❎', interview.title)
    }
    await sleep(5000)
  }
  return result
}

async function main () {
  const interviews = await getInterviews()
  fs.writeFileSync('./data/interview.json', JSON.stringify(interviews, null, 2))
}

main().then(o => console.log('OK')).catch(e => {
  console.error(e)
  console.log('Exit')
})