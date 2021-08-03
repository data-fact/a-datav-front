import React from 'react'
import {notification} from 'antd4'

export default function (res,isMessage) {
    switch (res.status) {
        case 500:
            return handle500(res,isMessage)
        case 503:
            return handle503(res,isMessage)
        default:
            return handleUnkown(isMessage)
    }
}

function handle500(res,isMessage) {
    return res.text()
        .then(err => {
            if(err.indexOf('Read timed out') >= 0){
                showMessage({
                    message: '连接超时',
                    description: '请检查网络情况'
                },isMessage)
                return false
            }else{
                return handleUnkown(isMessage)
            }
        })
}
function handle503(res,isMessage) {
    return res.text()
        .then(err => {
            let messages = err.split('::')
            if(!messages[0])
                throw new Error()
            showMessage({
                message: messages[0],
                description: messages[1] || ''
            },isMessage)
            return false
        })
}
function handleUnkown(isMessage) {
    console.error('未知异常')
    showMessage({
        message: '未知异常',
        description: '请前往系统日志查看原因'
    },isMessage)
    return false
}
function showMessage(m,isMessage) {
    if(isMessage)
        notification.error(m)
    else
        console.error(m)
}