import { sample } from "midash"
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"

function createOpenAI() {
  const options = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: 'https://openai.devdoc.tech/v1'
  })
  const openai = new OpenAIApi(options)
  return openai
}

async function reply(messages: ChatCompletionRequestMessage[], model: string = 'gpt-3.5-turbo') {
  const ai = createOpenAI()

  const { data: { choices } } = await ai.createChatCompletion({
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

async function tag(text: string) {
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

export async function mock({
  category,
  labels,
  n
}: {
  category: string,
  labels: string,
  n: number
}) {
  const createPrompt = ({
    category,
    labels,
    n
  }: {
    category: string,
    labels: string,
    n: number
  }) => `你是一位大厂程序员面试官，非常资深的 "${category}面试官"，你的候选人具有 "${n}年编程经验"，精通以下技术栈："${labels}"，请为它整理十五道左右面试题，并以 markdown 列表形式输出，要求符合以下格式：

1. 根据候选人水平列出四道左右的 ${category} 方向的基础面试题
2. 根据候选人水平列出三道左右的算法题，并将算法题置于最后
3. 所有题目从易至难，并以列表形式展示`

  return reply([{
    role: 'user',
    content: createPrompt({
      category: '前端',
      n: 5,
      labels: 'vue,react,webpack,rollup,typescript,前端工程化'
    })
  }, {
    role: 'assistant',
    content: `
## 前端基础面试题

+ 解释什么是闭包，并提供一个使用闭包的例子。
+ 解释什么是事件冒泡和事件捕获，并说明它们之间的区别。
+ 请解释var、let和const之间的区别。
+ 请解释什么是事件委托，并提供一个使用事件委托的场景。

## 进阶前端面试题

+ 解释什么是虚拟 DOM，并描述它与真实 DOM 之间的关系。
+ 解释什么是单向数据流，并说明它在 React 中的应用。
+ 解释什么是组件生命周期，并描述 React 组件的生命周期方法。
+ 解释什么是高阶组件，并提供一个使用高阶组件的例子。
+ 解释什么是异步编程，并提供几种常见的异步编程方式。
+ 解释什么是跨域，以及如何解决跨域问题。

## 基础算法题

+ 编写一个函数，计算一个数组中所有元素的和。
+ 编写一个函数，将一个给定的字符串进行反转。
+ 编写一个函数，判断一个字符串是否是回文字符串。
+ 编写一个函数，判断一个字符串是否为有效的括号字符串（只包含 (、)、[、]、{ 和 }）。
`
  }, {
    role: 'user',
    content: createPrompt({ category, labels, n })
  }], 'gpt-3.5-turbo-16k')
}