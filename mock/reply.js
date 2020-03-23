import { users } from './user'

const replyData = [{
  id: 1,
  date: '2020-03-18',
  course: 'scratch',
  teacher: '张大虎',
  updateDate: '2020-3-19',
  desc: '近几年少儿编程作为一个新兴的素质教育学科，增速很快，发展前景越来越广阔，也吸引了越来越多的人才的目光。与此同时，行业刚兴起不久，市面上现成的人才并不多，尤其教研这种需要积累的岗位更是难觅人才，因此出现了少儿编程教研不拘一格选人才的局面。',
  tag: '已提交'
}, {
  id: 2,
  date: '2019-05-02',
  course: 'python',
  teacher: '赵铁柱',
  updateDate: '2019-5-10',
  desc: '在我负责Scratch课程产品线，招聘教研（课程设计）岗位时，就接触了很多想入行少儿编程做教研工作的候选人，他们当中有当了几年程序员想转做教育的技术人，有在其他学科教学多年想转少儿编程的老师，也有看上去跟少儿编程教研八杆子打不着的人，当然也有很多小白应届生，这篇文章就来聊一聊，如果你有意向加入少儿编程行业当一名教研，可以提前做哪些准备。',
  tag: '已提交'
}, {
  id: 3,
  date: '2020-03-18',
  course: 'HTML',
  teacher: '赵铁柱',
  updateDate: '',
  desc: '',
  tag: '未提交'
}, {
  id: 4,
  date: '2018-05-02',
  course: 'C++',
  teacher: '王大虎',
  updateDate: '2018-5-4',
  desc: '首先是懂编程，有不错的编程基本功，这一点很好理解。少儿编程教育虽然不是为了把孩子培养成小程序员，但毕竟要对孩子进行编程启蒙，教会孩子一些基础的编程概念和算法知识。如果候选人本身有不错的编程基本功，是非常有利于他快速掌握Scratch这门语言，快速上手工作的。当然，我们并不要求候选人的编程基础达到程序员那样的程度。',
  tag: '已提交'
}, {
  id: 5,
  date: '2018-07-02',
  course: 'C语言',
  teacher: '张大虎',
  updateDate: '',
  desc: '',
  tag: '未提交'
}, {
  id: 6,
  date: '2019-05-02',
  course: 'scratch',
  teacher: '王大虎',
  updateDate: '',
  desc: '',
  tag: '未提交'
}, {
  id: 7,
  date: '2019-05-02',
  course: 'scratch',
  teacher: '张大虎',
  updateDate: '',
  desc: '',
  tag: '未提交'
}, {
  id: 8,
  date: '2019-05-02',
  course: 'scratch',
  teacher: '王大虎',
  updateDate: '',
  desc: '',
  tag: '未提交'
}, {
  id: 9,
  date: '2019-05-02',
  course: 'scratch',
  teacher: '王大虎',
  updateDate: '',
  desc: '',
  tag: '未提交'
}]

export default [
  {
    url: '/reply',
    type: 'get',
    response: config => {
      const { token } = config.headers

      // mock error
      if (!users[token]) {
        return {
          code: 50008,
          message: '数据异常，请重新登录'
        }
      }

      return {
        code: 20000,
        data: replyData
      }
    }
  },

  {
    url: '/reply/submit',
    type: 'post',
    response: config => {
      const { token } = config.headers

      // mock error
      if (!users[token]) {
        return {
          code: 50008,
          message: '数据异常，请重新登录'
        }
      }
      const data = config.body
      const index = replyData.findIndex(item => item.id == data.id)
      replyData[index] = data
      return {
        code: 20000,
        data: replyData
      }
    }
  }
]
