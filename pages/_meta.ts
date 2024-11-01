export default {
  index: {
    type: 'page',
    title: '首页',
    theme: {
      layout: 'raw'
    }
  },
  deploy: {
    type: 'page',
    title: '前端部署',
    display: 'hidden'
  },
  engineering: {
    type: 'page',
    title: '工程化',
    display: 'hidden'
  },
  books: {
    title: '我的小册',
    type: 'menu',
    items: {
      interview: {
        href: '/engineering',
        title: '工程化'
      },
      deploy: {
        href: '/deploy',
        title: '前端部署'
      }
    }
  },
  roadmap: {
    type: 'page',
    title: '面试路线图🔥'
  },
  base: {
    type: 'page',
    title: '计算机基础',
    display: 'hidden'
  },
  fe: {
    type: 'page',
    title: '高级前端'
  },
  ai: {
    href: '/ai',
    title: '智能面试',
    theme: {
      layout: 'raw'
    },
    display: 'hidden'
  },
  interview: {
    href: '/interview',
    title: '面经大全🔥',
    theme: {
      layout: 'raw'
    },
    display: 'hidden'
  },
  tools: {
    title: '面经与智能面试',
    type: 'menu',
    items: {
      interview: {
        href: '/interview',
        title: '面经大全🔥'
      },
      ai: {
        href: 'https://cv.devtool.tech/mock',
        title: '智能面试',
        newWindow: true
      }
    }
  },
  other: {
    title: '其它面试题',
    type: 'menu',
    items: {
      base: {
        href: '/base',
        title: '计算机基础'
      },
      server: {
        href: '/server',
        title: '全栈开发'
      },
      open: {
        title: '开放式问题',
        href: '/open'
      }
    }
  },
  server: {
    type: 'page',
    title: '全栈开发',
    display: 'hidden'
  },
  open: {
    type: 'page',
    title: '开放式问题',
    display: 'hidden'
  },
  train: {
    type: 'page',
    title: '训练营🔥'
  },
  resume: {
    type: 'page',
    href: 'https://cv.devtool.tech',
    title: '一纸简历🔥',
    newWindow: true
  },
  // coze: {
  //   title: 'AI Bot',
  //   type: 'menu',
  //   items: {
  //     comate: {
  //       href: 'https://comate.baidu.com/?inviteCode=hw7jki0p',
  //       title: 'Baidu Comate',
  //       newWindow: true
  //     },
  //     tongyi: {
  //       href: 'https://developer.aliyun.com/topic/lingma/activities/202403?taskCode=14508&recordId=7a6665535809acb96955e0ddd5179112#/?utm_content=m_fission_1',
  //       title: '通义灵码',
  //       newWindow: true
  //     },
  //     coze: {
  //       href: 'https://www.coze.cn/store/bot/7338902096575692815?bid=MDQEENnABjuSZsA3UimneFfVy2gEHsCt7MkXCLQVWm5HTOqB5K8qdIzn32UA8JX48eDgowQA&share=1&from=others',
  //       title: '阿狸 P7 候选人（扣子）',
  //       newWindow: true
  //     },
  //     doubao: {
  //       href: 'https://www.doubao.com/share?botId=7338758967289724968',
  //       title: '阿狸 P7 候选人（豆包）',
  //       newWindow: true
  //     },
  //     cici: {
  //       href: 'https://www.ciciai.com/share?botId=7339071191707320327',
  //       title: '阿狸 P7 候选人（Cici）',
  //       newWindow: true
  //     }
  //   }
  // },
  mock: {
    type: 'page',
    title: '模拟面试'
  }
}