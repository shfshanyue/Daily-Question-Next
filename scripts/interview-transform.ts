import fs from 'fs'
import PQueue from 'p-queue';

import interviews from '../data/interview-raw.json'
import { isInterviewExperience } from '../lib/tag'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function getInterviews() {
  const queue = new PQueue({ concurrency: 20 });

  const result: typeof interviews[0][] = []
  for (const interview of interviews) {
    const text = `${interview.title} ${interview.description}`

    const isIE = await queue.add(() => isInterviewExperience(text))
    if (isIE) {
      result.push(interview)
      console.log('✅', interview.title)
    } else {
      console.log('❎', interview.title)
    }
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