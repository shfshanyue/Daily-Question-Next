import Link from "next/link"

export default function Post ({ id, title, createdAt, star }: any) {
  return (
    <div className="border-b mb-2 py-2">
      <div className="text-gray-800 hover:text-orange-500">
        <a href={`https://juejin.cn/post/${id}`} target="_blank">
          { title }
        </a>
      </div>
      <div className="flex gap-4 font-mono mt-2 text-sm text-gray-400">
        <div>{ new Date(createdAt).toJSON().slice(0, 10) }</div>
        <div>★ { star }</div>
      </div>
    </div>
  )
}