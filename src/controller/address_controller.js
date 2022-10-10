const { successRes } = require("../constants/success_type");
const {commonError} = require('../constants/err_type')
const { addressAdd,addressList,addressUpdate,addressDelete,addressChange } = require("../service/address_service");
class AddressController {
  /* 添加地址 */
  async addAddress(ctx) {
    const user_id = ctx.state.user.id;
    const { consigness, phone, address } = ctx.request.body;
    const res = await addressAdd({ user_id, consigness, phone, address });
    try {
      successRes.message = "地址添加成功";
      successRes.result = res;
      ctx.body = successRes;
    } catch (err) {
      console.error(err);
      ctx.body = err;
    }
  }
  /* 获取地址列表 */
  async listAddress(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    const user_id = ctx.state.user.id;
    const res = await addressList(pageNum,pageSize,user_id)
    ctx.body = res;
  }
  /* 更新地址参数 */
  async updateAddress(ctx){
    const user_id = ctx.state.user.id;
    const id = ctx.params.id
    const { consigness, phone, address } = ctx.request.body;
    const res = await addressUpdate(id,user_id,{ consigness, phone, address })
    try{
      if(res){
        successRes.message = '更新地址参数成功'
        successRes.result = ''
        ctx.body = successRes
      }else{
        commonError.message = '该地址不存在'
        commonError.result = ''
        ctx.app.emit('error',commonError,ctx)
      }
    }catch(err){
      console.error(err)
    }
  }
  /* 删除地址 */
  async deleteAddress(ctx){
    const user_id = ctx.state.user.id;
    const id = ctx.params.id
    const res = await addressDelete(id,user_id)
    try{
      if(res){
        successRes.message = '删除地址成功'
        successRes.result = ''
        ctx.body = successRes
      }else{
        commonError.message = '该地址不存在'
        commonError.result = ''
        ctx.app.emit('error',commonError,ctx)
      }
    }catch(err){
      console.log(err)
    }
  }
  /* 设置默认地址 */
  async changeAddress(ctx){
    const user_id = ctx.state.user.id;
    const id = ctx.params.id
    const res = await addressChange(id,user_id)
    try{
      if(res){
        successRes.message = '设置默认地址成功'
        successRes.result = ''
        ctx.body = successRes
      }else{
        commonError.message = '该地址不存在'
        commonError.result = ''
        ctx.app.emit('error',commonError,ctx)
      }
    }catch(err){
      console.error(err)
    }
  }
}

module.exports = new AddressController();
