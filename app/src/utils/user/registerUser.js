import bcrypt from "bcryptjs";
import { sendUserToServer } from "../Client";

const salt = "$2a$10$Ipw6Le9g01KD91fOFi15IO";

export default (username, password) => {
    const user = {
        username: username,
        hash: bcrypt.hashSync(password, salt)
    }
    return sendUserToServer(user)
}