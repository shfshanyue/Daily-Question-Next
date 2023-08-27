import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

import { mock } from '../../lib/mock'
import { MockInterview } from '../../lib/mock.schema'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MockInterview | undefined>
) {
  await runMiddleware(req, res, cors)

  const { n, labels } = req.query
  const data = await mock({
    n: Number(n),
    labels: String(labels)
  })
  if (data) {
    res.status(200).json(data)
  } else {
    res.status(400).json(undefined)
  }
}