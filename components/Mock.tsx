import clsx from "clsx"
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from "react"

import { MockInterview } from "../lib/mock.schema"

const ALL_LABELS = [
  'typescript',
  'react',
  'redux',
  'vue',
  'sass/less',
  'postcss',
  'eslint',
  'npm',
  'pnpm',
  'webpack',
  'vite',
  'rollup',
  'graphql',
  'node.js',
  'canvas',
  'svg',
  'docker',
  'react-native',
  'flutter',
  '3D',
  'three-js',
  'webrtc',
  '微信小程序',
  '单元测试',
  '自动化测试',
  '正则',
  '性能优化',
  '前端工程化',
]

const INIT_DATA = {
  "basic": [
    {
      "question": "请解释什么是CSS盒模型？",
      "answer": ""
    },
    {
      "question": "请解释什么是JavaScript闭包？",
      "answer": ""
    },
    {
      "question": "请解释什么是DOM事件冒泡？",
      "answer": ""
    },
    {
      "question": "请解释什么是HTTP状态码？",
      "answer": ""
    }
  ],
  "advance": [
    {
      "question": "请解释什么是前端工程化？",
      "answer": ""
    },
    {
      "question": "请解释什么是构建工具？",
      "answer": ""
    },
    {
      "question": "请解释什么是模块化开发？",
      "answer": ""
    },
    {
      "question": "请解释什么是代码分割？",
      "answer": ""
    },
    {
      "question": "请解释什么是性能优化？",
      "answer": ""
    },
    {
      "question": "请解释什么是前端自动化测试？",
      "answer": ""
    }
  ],
  "althorigm": [
    {
      "question": "请编写一个函数，判断一个字符串是否是回文字符串。",
      "answer": ""
    },
    {
      "question": "请编写一个函数，实现数组去重。",
      "answer": ""
    },
    {
      "question": "请编写一个函数，实现数组扁平化。",
      "answer": ""
    },
    {
      "question": "请编写一个函数，实现数组的排序。",
      "answer": ""
    }
  ]
}

export default function Mock() {
  const [currentYear, setCurrentYear] = useState(0)
  const [labels, setLabels] = useState<string[]>([])
  const [data, setData] = useState<MockInterview>(INIT_DATA)
  const { isLoading, error, data: fetchData, mutate } = useMutation<MockInterview, unknown, {
    currentYear: number;
    labels: string[];
  }, unknown>({
    async mutationFn({ currentYear, labels }: {
      currentYear: number;
      labels: string[]
    }) {
      const res = await fetch(`/api/mock?n=${currentYear}&labels=${labels.join(',')}`)
      return res.json()
    },
  })

  useEffect(() => {
    if (fetchData) {
      setData(fetchData)
    }
  }, [fetchData])

  return (
    <div className="py-8 border-b content-container">
      <div className="flex gap-4 py-2 mb-4 border-b">
        <span className="italic font-semibold">工作年限：</span>
        {
          [0, 1, 3, 5].map(year => (
            <div
              key={year}
              className={clsx({ 'text-orange-500 font-bold border-orange-500': currentYear === year }, 'hover:cursor-pointer font-mono')}
              onClick={() => {
                setCurrentYear(year)
              }}
            >{year}</div>
          ))
        }
      </div>
      <div className="flex flex-wrap gap-4 py-2 mb-4 border-b">
        <span className="italic font-semibold">擅长技术：</span>
        {
          ALL_LABELS.map(label => (
            <div
              key={label}
              className={clsx({ 'text-orange-500 font-bold border-orange-500': labels.includes(label) }, 'hover:cursor-pointer font-mono')}
              onClick={() => {
                if (!labels.includes(label)) {
                  setLabels([...labels, label])
                } else {
                  setLabels(labels.filter(l => l !== (label)))
                }
              }}
            >{label}</div>
          ))
        }
      </div>
      <div className="mb-4">
        <button
          onClick={() => {
            if (!isLoading) {
              mutate({
                currentYear,
                labels
              })
            }
          }}
          className={clsx("rounded-md app-button", { 'bg-gray-200': isLoading })}>
          {
            isLoading ? '生成中...' : '生成'
          }
        </button>
      </div>
      <div className="py-2 mb-2 border-b">
        <h2 className="text-lg">基础</h2>
        <ul className="nx-mt-6 nx-list-decimal first:nx-mt-0 ltr:nx-ml-6 rtl:nx-mr-6">
          {
            data?.basic.map(q => (
              <li className="nx-my-2">
                {q.question}
              </li>
            ))
          }
        </ul>
      </div>
      <div className="py-2 mb-2 border-b">
        <h2 className="text-lg">进阶</h2>
        <ul className="nx-mt-6 nx-list-decimal first:nx-mt-0 ltr:nx-ml-6 rtl:nx-mr-6">
          {
            data?.advance.map(q => (
              <li className="nx-my-2">
                {q.question}
              </li>
            ))
          }
        </ul>
      </div>
      <div className="py-2 mb-2 border-b">
        <h2 className="text-lg">代码</h2>
        <ul className="nx-mt-6 nx-list-decimal first:nx-mt-0 ltr:nx-ml-6 rtl:nx-mr-6">
          {
            data?.althorigm.map(q => (
              <li className="nx-my-2">
                {q.question}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
