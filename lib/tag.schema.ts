type Category = '前端' | '后端' | '移动端' | '未知'
type Company = '字节' | '阿里' | '腾讯' | '百度' | '美团' | '京东' | '滴滴' | '快手' | '小米' | '网易' | '拼多多' | '未知'

export interface InterviewArticle {
  tags: Category[],
  company: Company[]
}