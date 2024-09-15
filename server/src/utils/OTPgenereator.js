import { customAlphabet } from "nanoid"


const generateOTP=(len)=>{
    const nanoid=customAlphabet('123456789',len)
    return nanoid()
}

export default generateOTP