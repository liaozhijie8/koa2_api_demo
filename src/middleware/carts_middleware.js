const { invalidGoodsId } = require("../constants/err_type");
const { checkGoodsId } = require("../service/carts_service");
/* 验证用户添加的商品规则 */
const cartsValidator = (rules)=>{
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
    } catch (err) {
      invalidGoodsId.message = "添加购物车参数出错";
      invalidGoodsId.result = err;
      return ctx.app.emit("error", invalidGoodsId, ctx);
    }
    await next();
  };
}
/* 验证商品库中是否有该商品 */
const goodsIdValidator = async (ctx,next) =>{
  const { goods_id } = ctx.request.body;
  const res = await checkGoodsId(goods_id);
  if (!res) {
    invalidGoodsId.message = '不存在该商品'
    invalidGoodsId.result = ''
    return ctx.app.emit("error", invalidGoodsId, ctx);
  }
  await next()
}
/* 更新购物车必填检测 */
const requiredParams = async (ctx,next) =>{
  const {number,selected} = ctx.request.body
  if(!number&&!selected){
    invalidGoodsId.message = '请输入需要修改的参数'
    invalidGoodsId.result = ''
    return ctx.app.emit('error',invalidGoodsId,ctx)
  }
  await next()
}
/* 检测全选购物车参数是否正确 */
const selectedParams = async (ctx,next) =>{
  const state = ctx.params.state
  if(state === 'true' || state === 'false'){
    return await next()
  }else{
    invalidGoodsId.message = '链接参数类型出错，请输入boolean值'
    invalidGoodsId.result = ''
    return ctx.app.emit('error',invalidGoodsId,ctx)
  }
}
module.exports = {
  cartsValidator,
  goodsIdValidator,
  requiredParams,
  selectedParams
};
