import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
    Database_url: process.env.Database_url,
    Node_Env: process.env.Node_Env,
    PORT: process.env.PORT,
    Defaultpass: process.env.Defaultpass,
    saltNumber: process.env.saltNumber,
    JWT_sec_Token: process.env.JWT_sec_Token,
    JWT_Refresh_token: process.env.JWT_Refresh_token,
    StoreID:process.env.aamarpaytest,
    SIGNETURE_KEY:process.env.SignatureKey


}