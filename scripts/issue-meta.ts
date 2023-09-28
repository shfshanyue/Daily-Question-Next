import { retry, map } from 'midash'
import issues from '../data/issues.json'
import { meta } from '../lib/meta'
import { writeFileSync } from 'node:fs'

async function main() {
  const items: any[] = []
  await map(issues, async (issue) => {
    const answer = issue.comments.nodes.find(x => x.author?.login === 'shfshanyue')?.body
    const body = `${issue.body}\n\n${answer}`
    if (!answer) {
      return
    }
    const metaData = await retry(async (count) => {
      const metaData = await meta({ title: issue.title, body })
      if (metaData?.description.includes('请总结并提炼') || (metaData?.description.length || 0) > 160 || metaData?.description.startsWith('【')) {
        if (count === 3) {
          return
        }
        throw new Error('')
      }
      return metaData
    }, {
      times: 3
    })
    if (metaData) {
      const item = {
        number: issue.number,
        title: issue.title,
        ...metaData
      }
      items.push(item)
      console.log(item)
    }
  }, {
    concurrency: 30
  })
  writeFileSync('./issuse-meta.json', JSON.stringify(items, null, 2))
}

main().then(o => console.log('OK')).catch(e => {
  console.error(e)
  console.log('Exit')
})
