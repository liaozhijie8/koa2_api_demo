const {fileUploadError,unSupporFileType,publishGoodsError,invalidGoodsId} = require('../constants/err_type')
const {successRes} = require('../constants/success_type')
const {createGoods,updateGoods,removeGoods,restoreGoods,findGoods} = require('../service/goods_service')
class GoodsController {
  async upload(ctx){
    // console.log(ctx.request.files)
    const {file} = ctx.request.files
    // 支持的文件类型
    const fileTypes = ['image/jpeg','image/png']
    if(file){
      if(!fileTypes.includes(file.mimetype)){
        return ctx.app.emit('error',unSupporFileType,ctx)
      }
      successRes.message = '商品图片上传成功'
      successRes.result = {goods_img:file.newFilename}
      ctx.body =successRes
    }else{
      ctx.app.emit('error',fileUploadError,ctx)
    }
  }
  /* 上传商品信息 */
  async create(ctx){
    try{
      const {updatedAt,createdAt,...res} = await createGoods(ctx.request.body)
      successRes.message = "商品发布成功"
      successRes.result = res
      ctx.body = successRes
    }catch(err){
      return ctx.app.emit('error',publishGoodsError,ctx)
    }
  }
  /* 修改商品信息 */
  async update(ctx){
    const res = await updateGoods(ctx.params.id,ctx.request.body)
    try{
      if(res){
        successRes.message = '修改商品成功'
        successRes.result = ''
        ctx.body = successRes
      }else{
        ctx.app.emit('error',invalidGoodsId,ctx)
      }
    }catch(err){
      console.error(err)
    }
  }
  /* 下架商品 */
  async remove(ctx){
    const res = await removeGoods(ctx.params.id)
    try{
      if(res){
        successRes.message = '下架商品成功'
        successRes.result = ''
        ctx.body = successRes
      }else{
        invalidGoodsId.message = '下架的商品不存在'
        ctx.app.emit('error',invalidGoodsId,ctx)
      }
    }catch(err){
      console.error(err)
    }
  }
  /* 上架商品 */
  async reCreate(ctx){
    const res = await restoreGoods(ctx.params.id)
    try{
      if(res){
        successRes.message = '上架商品成功'
        successRes.result = ''
        ctx.body = successRes
      }else{
        invalidGoodsId.message = '上架的商品不存在或已经在货架上'
        ctx.app.emit('error',invalidGoodsId,ctx)
      }
    }catch(err){
      console.error(err)
    }
  }
  /* 查找商品列表 */
  async findAll(ctx){
    const {pageNum = 1,pageSize=10} = ctx.request.query
    const res = await findGoods(pageNum,pageSize)
    successRes.message = '查找商品成功'
    successRes.result = res
    ctx.body = successRes
  }
}

module.exports = new GoodsController()