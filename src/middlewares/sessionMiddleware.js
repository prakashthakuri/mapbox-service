import { v4 as uuidv4 } from "uuid"


export const sessionMiddleware = (req,res,next) => {
    if(!req.sessionId){
        req.sessionId = uuidv4();
    }
    next()
}