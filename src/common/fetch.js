import React from 'react'
import fetch from 'cross-fetch'
import {encrypt} from "../utils/crypto.util";

export default function myfetch(url,body){
    body = security(body)
    return fetch(url,body)
}

function security(body) {
    if(!body) body = {}
    // if(!body.headers) body.headers = {}
    if(!body.headers)
        body.headers = {}
    //TODO 别忘了删请求头
    body.headers['user-id'] = 1
    let hash = new Date().getTime()
    body.headers['hash'] = btoa(encrypt(''+hash))

    let csrfHeaderEl = document.getElementById("_csrf_header")
    let csrfEl = document.getElementById("_csrf")
    if(!csrfHeaderEl || !csrfEl)
        return body

    let csrfHeader = csrfHeaderEl.value
    let csrf = csrfEl.value
    body.headers[csrfHeader] = csrf

    if(body.method == 'POST' && !body.noenc){
        if(body.body && typeof body.body === 'string'){
            body.headers['encode'] = 'UTF-8'
            body.body = btoa(encrypt(body.body,body.headers['hash']))
        }
    }
    return body
}