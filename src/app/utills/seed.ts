import config from "../config/config";
import { User } from "../module/user/user.model";

const Admin = {
    name: "fahim",
    email: "f@gmail.com",
    role: "admin",
    password: config.AdminPass,
    profile: "https://example.com/profile.jpg",
    address: "1234 Elm Street, Springfield, USA"
}


const AdminDefault = async ()=>{
    const isAdminexist = await User.findOne({role: Admin.role})

    if (!isAdminexist) {
        await User.create(Admin);
    }
}

export default AdminDefault