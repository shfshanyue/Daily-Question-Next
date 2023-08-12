import fs from 'fs'
import PQueue from 'p-queue';

import interviews from '../data/interview.json'
import { tag } from '../lib/tag'

function write (interviews: any) {
  fs.writeFileSync('./data/interview.json', JSON.stringify(interviews, null, 2))
}

async function getInterviewTags() {
  const queue = new PQueue({ concurrency: 20 });

  const result: typeof interviews[0][] = []
  let count = 0

  
  for (const interview of interviews.filter((x: any) => !x.tags?.length || !x.company?.length)) {
    count++;
    const text = `${interview.title} ${interview.description}`

    const tags = await queue.add(() => tag(text))
    if (tags) {
      Object.assign(interview, tags)
      console.log('✅', interview.title, tags)
    } else {
      console.log('❎', interview.title)
    }
    if (count % 10 === 0) {
      write(interviews)
    }
  }
  return result
}

async function main () {
  const interviews = await getInterviewTags()
  write(interviews)
}

main().then(o => console.log('OK')).catch(e => {
  console.error(e)
  console.log('Exit')
})