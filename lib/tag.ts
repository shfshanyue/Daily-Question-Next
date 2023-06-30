import { sample } from "midash"
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"
import { retry as pRetry } from '@shanyue/promise-utils'

function createOpenAI() {
  const options = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: 'https://openai.devdoc.tech/v1'
  })
  const openai = new OpenAIApi(options)
  return openai
}

async function reply (messages: ChatCompletionRequestMessage[]) {
  const ai = createOpenAI()

  const { data: { choices } } = await ai.createChatCompletion({
    model: 'gpt-3.5-turbo',
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

async function tag (text: string) {
  const createPrompt = (text: string) => `有一篇关于程序员的技术文章标题及简介："""${text}"""

请问，面试的是哪家公司，请直接回答公司名称。
`
  return reply([{
    role: 'user',
    content: createPrompt('近期找工作+实习+字节前端提前批面试的心得分享')
  }, {
    role: 'assistant',
    content: '字节跳动'
  }, {
    role: 'user',
    content: createPrompt(text)
  }])
}
