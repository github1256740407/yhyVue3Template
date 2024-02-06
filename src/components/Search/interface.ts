// 搜索框配置项类型
interface searchConfigItemType {
    label:string,
    type:string,
    placeholder?:string,
    clearable?:string,
    disabled?:string,
    value?:any,
    defaultValue:any,
    valueFormat?:string,
    change?:Function,

    [key:string]:any
}
interface searchConfigType {
    [key:string]:searchConfigItemType
}
export type {
    searchConfigType,
    searchConfigItemType
}