import { users } from './user'

const goods = [{
    id: '1',
    name: 'Mind+ 大礼包',
    price: 3999,
    type: '组合包',
    desc: 'Mind+ 15课时课程+工具包',
    onsale: true
},{
    id: '2',
    name: 'python课程',
    price: 2999,
    type: '课程',
    desc: 'python 15课时课程',
    onsale: true
},{
    id: '3',
    name: 'Mind+ 大礼包',
    price: 3999,
    type: '组合包',
    desc: 'Mind+ 15课时课程+工具包',
    onsale: true
},{
    id: '4',
    name: 'Mind+ 大礼包',
    price: 3999,
    type: '组合包',
    desc: 'Mind+ 15课时课程+工具包',
    onsale: false
},{
    id: '5',
    name: 'Mind+ 大礼包',
    price: 3999,
    type: '组合包',
    desc: 'Mind+ 15课时课程+工具包',
    onsale: true
}
]

export default [
    //获取商品数据
    {
        url: '/goods/info',
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
            data: goods
        }
        }
    },
    //提交表单
    {
        url: '/goods/submit',
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
        const index = goods.findIndex(item=> item.id == data.id)
        //判断为添加/删除
        if(index == -1){
        //判断为添加
            goods.push(data)
            return {
                code: 20000,
                message: 'add success'
                
            }
        //修改
        }else {
            if(data.del && data.del === true){
                goods.splice(index,1)
                return {
                    code: 20000,
                    message: 'delete seccess'
                }
            }else {
                goods[index] = data
                return {
                    code: 20000,
                    message: 'edit success'
                }
            }
        }
    }
}
]