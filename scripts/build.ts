import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'path'
import prettier from 'prettier'
import { keyBy } from 'midash'

import LABELS from '../data/labels.json'
import issues from '../data/issues.json'
import meta from '../data/meta.json'

const GROUP_MAP: Record<string, string> = {
  fe: '前端',
  server: '后端',
  open: '开放式问题',
  base: '计算机基础'
}
const labels = keyBy(LABELS, x => x.name)

type Issue = typeof issues[0]


// 根据 Issue 生成 Markdown
function generateIssueMd (issue: Issue) {
  const description = (meta as any)?.[issue.number] || ''
  const frontmatter = `
---
title: "${issue.title} | ${issue.labels.nodes.map(x => x.name).join(',')}高频面试题"
description: "${description ? description.description + ' ' + (description.keyword || '') : issue.title} 字节跳动面试题、阿里腾讯面试题、美团小米面试题。"
---
  `
  const title = `# ${issue.title.slice(6)}`
  const body = issue.body && `> 更多描述 \r\n ${issue.body} \r\n`
  const more = `> Issue \r\n 欢迎在 Gtihub Issue 中回答此问题: [Issue ${issue.number}](https://github.com/shfshanyue/Daily-Question/issues/${issue.number}) \r\n`
  const comments = (issue.comments.nodes || []).map(comment => {
    const author = comment && comment.author ? `> Author \r\n回答者: [${comment.author.login}](${comment.author.url}) \r\n` : ''
    const body = comment.body
    return `${author}\n\n${body}`
  })
  const md = [frontmatter, title, body, more, ...comments].join('\n\n')
  return md
}

// function generateEngineeringIssueMd (issue: Issue) {
//   const frontmatter = `---
// title: "${issue.title.slice(6)} | 前端工程化三十八讲"
// ---
//   `
//   const title = `# ${issue.title.slice(6)}`
//   const body = issue.body && `::: tip 更多描述 \r\n ${issue.body} \r\n::: `
//   const more = `::: tip Issue \r\n 欢迎在 Gtihub Issue 中回答或反馈问题: [Issue ${issue.number}](https://github.com/shfshanyue/Daily-Question/issues/${issue.number}) \r\n:::`
//   const comment = _.maxBy(_.get(issue, 'comments.nodes', []).filter(comment => {
//     return _.get(comment, 'author.login') === 'shfshanyue'
//   }), x => x.star.totalCount)
//   const bilibili = issue.b ? `::: tip 视频讲解\r\n<iframe src="//player.bilibili.com/player.html?bvid=${issue.b}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="allowfullscreen" style="width: 100%;aspect-ratio: 4 / 3;margin: 1rem 0;"></iframe>\r\n:::` : ''
//   const code = issue.code ? `::: tip Code\r\n可点击此处查看[示例或实践代码](${issue.code})\r\n:::` : ''
//   const md = [frontmatter, title, body, more, code, bilibili, comment?.body || ''].join('\n\n')
//   return md
// }

function generateCatagoryReadme (group: string, issues: Issue[]) {
  const title = `# ${GROUP_MAP[group]}常见面试题总结\n`
  const labelsByName = keyBy(LABELS, x => x.name)
  const currentIssues = issues.filter(issue => {
    return issue.labels.nodes.find(label => labelsByName[label.name].group === group)
  })
  const content = currentIssues.map(issue => {
    return `+ [${issue.title}](/${group}/${issue.labels.nodes[0].name}/${issue.number})`
  }).join('\n')
    
  const md = title + content
  fs.writeFileSync(path.resolve('pages', group, 'index.md'), md)

  const labels = LABELS.filter(x => x.group === group)
  const meta = {
    index: '汇总',
    ...Object.fromEntries(labels.map(label => [label.name === '前端工程化' ? 'engineering' : label.name, label.alias || label.name]))
  }
  fs.writeFileSync(path.resolve('pages', group, '_meta.json'), JSON.stringify(meta, null, 2))
}

function generateLabelReademe (label: any, issues: Issue[]) {
  const title = `# ${label.name}常见面试题总结\n`
  const currentIssues = issues.filter(x => {
    return x.labels.nodes.some(l => label.name === l.name)
  })
  const name = label.name === '前端工程化' ? 'engineering' : label.name
  const content = currentIssues.map(issue => {
    return `+ [${issue.title}](${name}/${issue.number})`
  }).join('\n')
  const md = title + content

  fs.writeFileSync(path.resolve('pages', label.group, name, 'index.md'), md)

  const meta = {
    index: '汇总',
    ...Object.fromEntries(currentIssues.map(issue => [issue.number, issue.title]))
  }
  fs.writeFileSync(path.resolve('pages', label.group, name, '_meta.json'), JSON.stringify(meta, null, 2))
}

function generateDir () {
  const dir = path.resolve(__dirname, '..')

  for (const group of Object.keys(GROUP_MAP)) {
    fs.rmSync(path.resolve(dir, 'pages', group), {
      recursive: true,
      force: true
    })
  }

  // 创建目录
  for (const label of LABELS) {
    // 示例：pages/fe/ts
    const d = path.resolve(dir, 'pages', label.group, label.name === '前端工程化' ? 'engineering' : label.name)
    if (!fs.existsSync(d)) {
      fs.mkdirSync(d, {
        recursive: true
      })
    }
  }
}

// 生成所有的 Markdown
async function generateMd () {
  const dir = path.resolve(__dirname, '..')
  // 最终要生成的文件，其值为 [path, markdown]
  const files: any[] = []

  generateDir()

  for (const group of Object.keys(GROUP_MAP)) {
    generateCatagoryReadme(group, issues)
  }
  for (const label of LABELS) {
    generateLabelReademe(label, issues)
  }

  // const engineeringItems = getItems().map(x => x.number)
  // const engineeringItemsById = _.keyBy(getItems(), x => x.number)

  for (const issue of issues) {
    const md = generateIssueMd(issue)
    for (const label of issue.labels.nodes) {
      const name = label.name === '前端工程化' ? 'engineering' : label.name
      const group = labels[label.name].group
      files.push([path.resolve(dir, 'pages', group, name, `${issue.number}.md`), md])
    }
    // if (engineeringItems.includes(issue.number)) {
    //   issue.b = engineeringItemsById[issue.number].b
    //   issue.code = engineeringItemsById[issue.number].code
    //   const md = generateEngineeringIssueMd(issue)
    //   files.push([path.resolve(dir, 'engineering', `${issue.number}.md`), md])
    // }
  }

  const format = (content: string) => prettier.format(content, { parser: 'markdown' })

  for (const [filePath, markdown] of files) {
    // 138 先不用做格式化
    console.log(`Generate ${filePath}`)
    fs.writeFileSync(filePath, filePath.includes('138') ? markdown : await format(markdown))
  }
}

generateMd()
