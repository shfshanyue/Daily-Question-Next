import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import * as _ from 'midash'

import { Issue, IssueComment } from '../../github/query'
import issues from '../../data/issues.json'
import labels from '../../data/labels.json'

const allQuestions: Array<Issue> = issues as any
const questionsById = _.keyBy(allQuestions, x => x.number)
const labelsByName = _.keyBy(labels, x => x.name)

const typeDefs = `#graphql
  enum Topic {
    FE
    SERVER
    DEVOPS
    OPEN
    BASE
  }

  type Query {
    questions (
      label: String
      topic: Topic
      limit: Int
      random: Boolean
      withAnswer: Boolean
    ): [Question!]
    question (
      number: Int
      label: String
      topic: Topic
      limit: Int
      random: Boolean
      withAnswer: Boolean
    ): Question
  }

  type Question {
    id: ID!
    number: Int!
    title: String!
    body: String!
    labels (alias: Boolean): [String!]
    topics: [Topic!]
    answers: [Answer!]
    selfAnswer: Answer
  }

  type Answer {
    id: ID!
    body: String!
    star: Int!
    author: String!
  }
`

const resolvers = {
  Topic: {
    FE: 'fe',
    SERVER: 'server',
    DEVOPS: 'devops',
    OPEN: 'open',
    BASE: 'base'
  },
  Query: {
    questions({ }, { label, topic, limit, random, withAnswer }: {
      label?: string;
      topic?: string;
      limit?: number;
      random?: boolean;
      withAnswer?: boolean;
    }) {
      const q = allQuestions.filter(q => _.pick({ label, topic })).filter(qq => {
        const question: Issue = qq as any
        return withAnswer ? question.comments.nodes?.find(comment => {
          return comment?.author?.login === 'shfshanyue'
        }) : true
      })
      if (random) {
        return _.sampleSize(q, limit)
      }
      return q.slice(0, limit || 1000)
    },
    question({ }, { number, label, topic, random, withAnswer }: {
      label?: string;
      topic?: string;
      random?: boolean;
      withAnswer?: boolean;
      number?: number
    }) {
      if (number) {
        return questionsById[number]
      }
      const q = allQuestions.filter(q => _.pick({ label, topic })).filter(qq => {
        const question: Issue = qq as any
        return withAnswer ? question.comments.nodes?.find(comment => {
          return comment?.author?.login === 'shfshanyue'
        }) : true
      })
      return _.sample(q)
    }
  },
  Question: {
    labels(question: Issue, { alias }: { alias?: boolean } = {}) {
      return question.labels?.nodes?.map(x => {
        const name = x?.name
        return name && alias ? labelsByName[name]?.alias || name : name
      }).filter(Boolean)
    },
    topics(question: Issue) {
      return resolvers.Question.labels(question)?.map(x => labelsByName[x as string]?.group || 'fe')
    },
    answers(question: Issue) {
      return question.comments.nodes
    },
    selfAnswer(question: Issue) {
      return question.comments.nodes?.find(comment => {
        return comment?.author?.login === 'shfshanyue'
      })
    }
  },
  Answer: {
    star(answer: any) {
      return answer.star?.totalCount || 0
    },
    author(answer: IssueComment) {
      return answer.author?.login
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  rootValue: {},
  formatError(e) {
    console.error(e)
    return e
  }
})

export default startServerAndCreateNextHandler(server);
