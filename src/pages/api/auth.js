import { databaseServiceFactory } from "../../../services/databaseService"
import { authServiceFactory } from "../../../services/authService"
import withSession from "../../../lib/session";

import * as bcrypt from "bcryptjs"

const dbService = databaseServiceFactory();
const authService = authServiceFactory();

export default withSession(async (req, res) => {
    const ERROR_CREDENTIALS = "Invalid username and/or password";

    const method = req.method.toLowerCase();
    const { username, password } = req.body;
    
    if (method !== "post") {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const saveMono = async (req, res)=>{
        try{
            const saltRounds = 1;
            const pw = "test";
            const username = "jesus";
            let hashedPassword;
             bcrypt.hash(pw, saltRounds)
                .then(hash => {
                    hashedPassword = hash
                    console.log('Hash ', hashedPassword)
                    dbService.createUser(username, hashedPassword)
                })
                .catch(err => console.error(err.message))
        }catch(error){
            return res.status(500).json({mesage: error.mesage})
        }
    }

    //saveMono();

    try {
        const userCredentials = await dbService.getUser(username);
        //const pass = userCredentials.pw
        //console.log(userCredentials)
        if (await authService.validate(password, userCredentials.pw) === true){
            //console.log(password)
            await saveSession({username}, req);
            res.status(200).json({username});
            return;
        
        }
    } catch (error) {
        console.log(error);
    }
    res.status(403).json({error: ERROR_CREDENTIALS});
})

async function saveSession(user, request) {
    console.log(user)
    request.session.set("user", user);
    await request.session.save();
}
