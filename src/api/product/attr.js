// 平台属性管理模块的请求文件
import request from './../../utils/request.js'
// 获取一级分类的地址 /admin/product/getCategory1 get
export const reqCategory1List=()=>request({
    url:'/admin/product/getCategory1',
    method:'get'
})
// 获取二级分类的数据 /admin/product/getCategory2/{category1Id} get
export const reqCategory2List=(category1Id)=>request({
    url:`/admin/product/getCategory2/${category1Id}`,
    method:'get'
}) 
// 获取三级分类的数据 /admin/product/getCategory3/{category2Id} get
export const reqCategory3List=(category2Id)=>request({
    url:`/admin/product/getCategory3/${category2Id}`,
    method:'get'
})
// 获取平台属性的接口
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
export const reqAttrList=(category1Id,category2Id,category3Id)=>request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:'get'
})
// 添加属性与属性值的接口 /admin/product/saveAttrInfo post
export const reqAddOrUpdateAttr=(data)=>request({
   url:'/admin/product/saveAttrInfo',
   method:'post',
   data
})