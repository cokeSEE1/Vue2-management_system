import request from './../../utils/request.js'
// 获取图片的接口
// /admin/product/spuImageList/{spuId}
export const reqSpuImageList=(spuId)=>request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:'get'
})
// 获取销售属性列表 /admin/product/spuSaleAttrList/{spuId} get
export const reqSpuSaleAttrList=(spuId)=>request({
    url:`/admin/product/spuSaleAttrList/${spuId}`,
    method:'get'
})

// 获取商品属性信息的 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
export const reqAttrInfoList=(category1Id,category2Id,category3Id)=>request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:'get'
})

// 添加SKU /admin/product/saveSkuInfo post
export const reqAttrSku =(skuInfo)=>request({
    url:'/admin/product/saveSkuInfo',
    method:'post',
    data:skuInfo
})
// 获取SKU列表数据的接口
// /admin/product/findBySpuId/{spuId} get 
export const reqSkuList=(spuId)=>request({
    url:`/admin/product/findBySpuId/${spuId}`,
    method:'get'
})

// sku列表的接口 /admin/product/list/{page}/{limit}
export const reqSkuList1 =(page,limit)=>request({
    url:`/admin/product/list/${page}/${limit}`,
    method:'get'
})
// 上架的接口 /admin/product/onSale/{skuId} get
export const reqSale =(skuId)=>request({
    url:`/admin/product/onSale/${skuId}`,
    method:'get'
})
// 下架的接口 /admin/product/cancelSale/{skuId} get
export const reqCancel=(skuId)=>request({
    url:`/admin/product/cancelSale/${skuId}`,
    method:'get'
})
// 获取sku详情的接口  /admin/product/getSkuById/{skuId} get
export const reqSkuById=(skuId)=>request({
    url:`/admin/product/getSkuById/${skuId}`,
    method:'get'
})