import request from './../../utils/request.js'


// 获取SPU列表数据的接口
// /admin/product/{page}/{limit} get page limit category3id
export const reqSpuList =(page,limit,category3Id)=>request({
    url:`/admin/product/${page}/${limit}`,
    method:'get',
    params:{category3Id}
})
// 获取某一个SPU信息  /admin/product/getSpuById/{spuId} get
export const reqSpu = (spuId)=>request({
    url:`/admin/product/getSpuById/${spuId}`,
    method:'get'
})

// 获取品牌的信息进行展示  /admin/product/baseTrademark/getTrademarkList get
 export const reqTradeMarkList=()=>request({
    url:'/admin/product/baseTrademark/getTrademarkList',
    method:'get'
 })

//  获取SPU图片的接口 /admin/product/spuImageList/{spuId} get
export const reqSpuImageList=(spuId)=>request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:'get'
})

// 获取SPU全部销售属性 一共就是三个销售属性 /admin/product/baseSaleAttrList get
export const reqBaseSaleAttrList=()=>request({
    url:'/admin/product/baseSaleAttrList',
    method:'get'
})
// 修改SPU 添加SPU 对于修改和添加唯一的区别就是携带的参数是否带id
export const reqAddOrUpdateSpu = (spuInfo) =>{
//    如果携带的参数带有id 那就是修改SPU
if(spuInfo.id){
    return request({
        url:'/admin/product/updateSpuInfo',
        method:'post',
        data:spuInfo
    })
}else{
    // 携带的参数不带id 添加id
    return request({
        url:'/admin/product/saveSpuInfo',
        method:'post',
        data:spuInfo
    })
}
}
// 删除SPU
export const reqDeleteSpu =(spuId)=>request({
    url:`/admin/product/deleteSpu/${spuId}`,
    method:'delete'
})
