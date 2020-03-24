import request from '@/utils/request'

export function getClassTable(){
    return request({
        url: '/classTable/info',
        method: 'get'
    })
    
}

export function submitClassTable(data){
    return request({
        url: '/classTable/submit',
        method: 'post',
        data
    })
    
}

export function deleteTable(data){
    return request({
        url: '/classTable/delete',
        method: 'post',
        data
    })
    
}