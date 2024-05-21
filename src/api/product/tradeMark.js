// 主要获取品牌管理数据的模块
import request from '@/utils/request'
// import request2 from './../../utils/request2.js'
// 获取品牌列表的接口
// /admin/product/baseTrademark/{page}/{limit} get
export const reqTardeMark= (page,limit)=>request({
    url:`/admin/product/baseTrademark/${page}/${limit}`,
    method:'get'
})
// 处理添加品牌操作
// /admin/product/baseTrademark/save   post 携带两个参数 品牌名称 logo
// 对于新增品牌不需要携带id id是有服务器生成的




// 修改品牌的操作 /admin/product/baseTrademark/update  put  
// 携带三个参数 id 名称 logo
// 对于修改某一品牌的参数 前端携带的参数需要携带参数 需要告诉服务器 要修改的是哪一个品牌

// 封装成一个函数
export const reqAddOrUpdateTradeMark=(tradeMark)=>{
    if(tradeMark.id){
        // 如果带有id 修改
      return request({
        url:'/admin/product/baseTrademark/update',
        method:'put',
        data:tradeMark
      })
    }else{
        // 如果不带 修改
        return request({
            url:'/admin/product/baseTrademark/save',
            method:'post',
            data:tradeMark
          })
    }
}
// 删除品牌的 /admin/product/baseTrademark/remove/{id} delete
export const reqDeleteTradeMark=(id)=>request({
  url:`/admin/product/baseTrademark/remove/${id}`,
  method:'delete'
})
