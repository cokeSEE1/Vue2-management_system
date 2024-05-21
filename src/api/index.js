// 将四个模块的请求接口函数统一暴露
import * as trademark from './product/tradeMark'
import * as attr from './product/attr'
import * as spu from './product/spu'
import * as sku from './product/sku'
// 对外暴露
export default {
    trademark,
    attr,
    spu,
    sku
}