import request from '@/utils/request'

export function getTableData(){
    return request({
        url: '/vue-admin-template/home/table-data',
        method: 'get'
    })
    
}

export function getHeaderData(){
    return request({
        url: '/vue-admin-template/home/header-data',
        method: 'get'
    })
    
}