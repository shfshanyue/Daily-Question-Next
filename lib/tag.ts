import OpenAI from "openai"
import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'


// Define the schema using Zod instead of TypeScript interface
const InterviewArticleSchema = z.object({
  company: z.string().optional(),
  position: z.string().optional(),
  type: z.enum(['实习', '校招', '社招']).optional()
})

function createOpenAI() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: `https://${process.env.OPENAI_API_BASEURL}/v1`
  })
  return openai
}

async function reply(messages: any[], model: string = 'gpt-3.5-turbo') {
  const ai = createOpenAI()

  const { choices } = await ai.chat.completions.create({
    model: model || 'gpt-3.5-turbo',
    messages
  })

  const content = choices[0].message
  return content!
}

export async function isInterviewExperience(text: string) {
  const createPrompt = (text: string) => `有一篇关于程序员的技术文章标题及简介："""${text}"""

  请判断该问题是否为分享个人面试经验、春招或者秋招的文章，如果是，则直接返回 “true”，如果不是或者无法确认，则直接返回 ”false“。无需返回多余内容。
`
  const { content } = await reply([{
    role: 'user',
    content: createPrompt('近期找工作+实习+字节前端提前批面试的心得分享')
  }, {
    role: 'assistant',
    content: 'true'
  }, {
    role: 'user',
    content: createPrompt(text)
  }]).catch(() => {
    console.log('😓')
    return { content: 'false' }
  })

  return content?.includes('true') || false
}

export async function tag(text: string) {
  const createPrompt = (text: string) => `有一篇关于程序员的技术文章标题及简介："""${text}"""

请分析这篇文章是否为面试经验分享文章。如果是，请提取以下信息：
- company: 面试的公司名称
- position: 面试的岗位
- type: 文章类型，只能是以下选项之一：实习、校招、社招

如果不是面试经验分享文章，请返回空对象 {}`

  try {
    const { object } = await generateObject({
      model: openai('gpt-3.5-turbo'),
      schema: InterviewArticleSchema,
      prompt: createPrompt(text)
    })
    return object
  } catch (error) {
    console.error('Failed to generate object:', error)
    return undefined
  }
}
