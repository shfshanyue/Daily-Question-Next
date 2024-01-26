import fs from 'node:fs'
import path from 'node:path'

import {
  createJsonTranslator,
  createOpenAILanguageModel,
} from "typechat";
import { retry } from 'midash'
import { Meta } from "./meta.schema";

const model = createOpenAILanguageModel(process.env.OPENAI_API_KEY!, 'gpt-3.5-turbo', `https://${process.env.OPENAI_API_BASEURL}/v1/chat/completions`)

// const metaSchema = `
// type Meta = {
//   keywords: string[];
//   description: string;
// }
// `

const metaSchema = fs.readFileSync(
  path.join(__dirname, "meta.schema.ts"),
  "utf8"
);

const interviewTagsTranslator = createJsonTranslator<Meta>(model, metaSchema, "Meta");

export async function meta({
  title,
  body
}: {
  title: string,
  body: string,
}) {
  const text = `请总结并提炼文本内容，总结字数为 120 字左右，使用纯文本输出，移除 [\`] 等特殊字符，总结提炼内容将作为 description 字段，并列出五个左右的关键词，作为 keywords 字段。文本内容如下：

"""""
${title}
${body}
"""""
`
  const article = await interviewTagsTranslator.translate(text)
  if (article.success) {
    return article.data
  } else {
    console.log(article.message)
  }
}