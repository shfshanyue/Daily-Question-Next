import type { NextApiRequest, NextApiResponse } from 'next'

import { mock } from '../../lib/mock'
import { MockInterview } from '../../lib/mock.schema'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MockInterview | undefined>
) {
  const { n, labels } = req.query
  const data = await mock({
    n: Number(n),
    labels: String(labels)
  })
  res.status(200).json(data)
}