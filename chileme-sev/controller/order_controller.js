const Order = require('../model/order_schema')
const Goods = require('../model/goods_schema')
const User = require('../model/user_schema')
// 新增订单
const addOrder = async ctx => {
    // 获取商品id
    let req = ctx.request.body
    // 获取用户的cookie信息
    let uId = ctx.cookies.get('user')
    console.log(uId)
    let user = await User.findOne({module:uId})
    console.log(user)
    // 定义一个变量来收集查询出来的商品数据
    let collectGoods = []
    // 根据商品id去库中查询商品信息
    await Goods.find({goodsId:{$in:req.ids}})
    .then(res => { //查询成功
        console.log(res)
        collectGoods = res
    }).catch(err => { //查询失败
        console.log(err)
        ctx.body = {
            success : false,
            msg:'查询商品数据失败'
        }
    })
    // 定义一个计算总价的变量
    let countPrice = 0
    // 遍历要结算的商品的id [id,id,id]
    for(let i=0;i<req.ids.length;i++){
        // 遍历数据库中查询出来的商品数据[{id,price},{},{}]
        for(let j=0;j<collectGoods.length;j++){
            if(req.ids[i] == collectGoods[j].goodsId){
                console.log(collectGoods[j].price)
                // 商品单价累加
                countPrice += Number(collectGoods[j].price)
            }
        }
    }
    console.log(countPrice)
    ctx.body='新增成功'
}
//     orderNo        订单号         String
//    * orderType      订单状态       String (已创建,进行中,已挂起,已完成)
//    * detail         订单包含菜品    Array
//    * createTime     下单时间       Number
//    * way              支付方式     String
//    * price            订单总金额    Number
//    * payTime          支付时间      Number
//    * createPersonName  下单用户名   String
//    * createPersonId     下单用户    Number

let OrderItem = new Order({
    orderNo           : 'ODR'+new Date().getTime,
     orderType        : "已完成",
     detail           : req.ids,
     createTime       : new Date().getTime,
     way              : "cash",
     price            : countPrice,
     payTime          : new Date().getTime,
     createPersonName : user.username,
     createPersonId   : Number(user.module),
 
})
// 查看订单
const findOrder = async ctx => {
    ctx.body='查看成功'
}
// 删除订单
const dropOrder = async ctx => {
    ctx.body='删除成功'
}

module.exports ={
    addOrder,findOrder,dropOrder
}