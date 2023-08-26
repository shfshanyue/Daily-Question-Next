import fs from "fs";
import path from "path";
import {
  createJsonTranslator,
  createOpenAILanguageModel,
} from "typechat";
import { MockInterview } from "./mock.schema"

const model = createOpenAILanguageModel(process.env.OPENAI_API_KEY!, 'gpt-3.5-turbo-16k', 'https://openai.devdoc.tech/v1/chat/completions')

// const interviewTagsSchema = fs.readFileSync(
//   path.join(__dirname, "mock.schema.ts"),
//   "utf8"
// );

const interviewTagsSchema = `
type QA = {
  question: string;
  answer: string;
}

export interface MockInterview {
  basic: QA[];
  advance: QA[];
  althorigm: QA[];
}

`

const interviewTagsTranslator = createJsonTranslator<MockInterview>(model, interviewTagsSchema, "MockInterview");

export async function mock({
  category,
  labels,
  n
}: {
  category?: string,
  labels?: string,
  n: number
}) {
  if (!labels) {
    labels = '前端工程化'
  }
  const createPrompt = ({
    labels = '',
    n
  }: {
    category?: string,
    labels?: string,
    n: number
  }) => `你是一位互联网大厂中非常资深的 "前端面试官"，你的候选人具有 "${n}年编程经验"，精通以下技术栈："${labels}"，请生成以下内容

1. 第一段，生成前端基础题目，根据候选人的${n}年前端编程经验，生成十道左右的前端基础题目，包含 CSS/JavaScript/DOM/HTTP 等
2. 第二段，生成前端进阶题目，根据候选人的技术栈 ${labels} 以及${n}年前端编程经验，要求如下
${
  labels?.split(',')?.map((label, i) => `  2.${i + 1} 对 ${ label }技术栈生成六道中等难度的面试题`).join('\n')
}
3. 第三段，生成适合前端的代码面试题，四道左右`

  const text = createPrompt({ category, labels, n })
  const article = await interviewTagsTranslator.translate(text)
  if (article.success) {
    return article.data
  }
}