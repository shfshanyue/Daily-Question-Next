import clsx from "clsx"
import Link from "next/link"
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from "react"

import { MockInterview } from "../lib/mock.schema"

const ALL_LABELS = [
  'typescript',
  'react',
  'redux',
  'vue',
  'npm',
  'eslint',
  'pnpm',
  'node',
  'webpack',
  'canvas',
  '正则',
  '性能优化',
  '前端工程化',
]

export default function Mock() {
  const [currentYear, setCurrentYear] = useState(0)
  const [labels, setLabels] = useState<string[]>([])
  const { isLoading, error, data, mutate } = useMutation<MockInterview, unknown, {
    currentYear: number;
    labels: string[];
  }, unknown>({
    async mutationFn({ currentYear, labels }: {
      currentYear: number;
      labels: string[]
    }) {
      const res = await fetch(`https://q.dev.shanyue.tech/api/mock?n=${currentYear}&labels=${labels.join(',')}`)
      return res.json()
    },
  })

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
      <div className="flex gap-4 py-2 mb-4 border-b">
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