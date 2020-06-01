const Order = require('../model/order_schema') //const声明


const addOrder = async ctx => {
    ctx.body='新增成功'
}

const findOrder = async ctx => {
    ctx.body = '查看成功'
}
const dropOrder = async ctx => {
    ctx.body = '删除成功'
}

module.exports = {
    addOrder,
    findOrder,
    dropOrder
}