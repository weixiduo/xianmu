import { v4 as uuidv4 } from 'uuid';
export const getUUID=()=>{
    //本地获取UUID
    let uuid_token=localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        //生成游客历史身份
        uuid_token=uuidv4();
        //本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}