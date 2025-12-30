import { ProtectUserRoute } from "@/lib/protectUserPage"

const FinanceClearance= async ()=>{
    await ProtectUserRoute();
    
    return(
        <div>
            Finance Clearance
        </div>
    );
};
export default FinanceClearance