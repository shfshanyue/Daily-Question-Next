import fs from 'node:fs'
import path from 'node:path'
import { gql, GraphQLClient } from 'graphql-request'
import { retry, sleep } from 'midash'

import { getSdk } from '../github/query'

const endpoint = 'https://api.github.com/graphql'

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `bearer ${process.env.ACCESS_TOKEN}`
  }
})
const sdk = getSdk(client)

async function getIssues(after: string | undefined = undefined): Promise<any> {
  const data = await sdk.issues({
    after
  })
  const issues = data.repository?.issues
  let moreIssues = []
  if (issues?.pageInfo.endCursor) {
    moreIssues = await getIssues(issues?.pageInfo?.endCursor)
  }
  return ([...issues?.nodes || [], ...moreIssues]).filter((issue: any) => issue.title.startsWith('【Q'))
}

retry(async (i: number) => {
  console.log('Retring ', i)
  await sleep(300)
  return getIssues()
}, { times: 10 }).then(data => {
  fs.writeFileSync(path.resolve(__dirname, '../data/issues.json'), JSON.stringify(data, null, 2))
}).catch((e) => {
  console.error(e)
  process.exit(1)
})