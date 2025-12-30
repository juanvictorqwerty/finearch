import { ProtectAdminRoute } from "@/lib/protectAdminPage";

const Admin = async () => {
    await ProtectAdminRoute();

    return(
        <div>
            Admin Page
        </div>
    )
}
export default Admin