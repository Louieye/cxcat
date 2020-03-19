import request from '@/utils/request'

export function getReplyData() {
    return request({
        url: '/reply',
        method: 'get'
    })
}

export function submitReply(data) {
    return request({
        url: '/reply/submit',
        method: 'post',
        data
    })
}