import fs from 'node:fs'
import path from 'node:path'
import { fetch } from 'undici'
import { gql, GraphQLClient } from 'graphql-request'
import { retry, sleep } from '@shanyue/promise-utils'

import { getSdk } from '../github/query'

global.fetch = fetch as any

const query = gql`
  query issues ($after: String) {
    repository (name: "Daily-Question", owner: "shfshanyue") {
      id
      issues (first: 100, after: $after, states: OPEN) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          number
          title
          body
          comments (first: 30) {
            nodes {
              id
              body
              star: reactions (content: THUMBS_UP) {
                totalCount
              }
              author {
                login
                url
              }
            }
          }
          labels (first: 5) {
            nodes {
              id
              name
            }
          }
        }
      }
    }
  }
`

const endpoint = 'https://api.github.com/graphql'

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `bearer ${process.env.ACCESS_TOKEN}`
  }
})
const sdk = getSdk(client)

async function getIssues (after: string | undefined = undefined): Promise<any> {
  const data = await sdk.issues({
    after
  })
  const issues = data.repository?.issues
  let moreIssues = []
  if (issues?.pageInfo.endCursor) {
    moreIssues = await getIssues(issues?.pageInfo?.endCursor)
  }
  return ([...issues?.nodes || [], ...moreIssues]).filter(issue => issue.title.startsWith('【Q'))
}

retry(async (i: number) => {
  console.log('Retring ', i)
  await sleep(300)
  return getIssues()
}, { times: 100 }).then(data => {
  fs.writeFileSync(path.resolve(__dirname, '../data/issues.json'), JSON.stringify(data, null, 2))
}).catch((e) => {
  console.error(e)
  process.exit(1)
})