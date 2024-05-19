
// import { TextField } from "@mui/material"

// import DateReserve from "@/components/DateReserve";
// import getUserProfile from "@/libs/user/getUserProfile";

// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";



// export default async function BookingPage(){
//     const session = await getServerSession(authOptions)
//     if(!session || !session.user.token) return null
//     const profile = await getUserProfile(session.user.token)
//     var createAt = new Date(profile.data.createAt)
    
//     return(
//         <div>
//             <div className="text-2xl" >{profile.data.name}
                
//             </div>
//             <table className="table-auto border-separate border-spacing-2"><tbody>
//                 <tr><td>Email</td><td>{profile.data.Email} </td></tr>
//                 <tr><td>Tel.</td><td>{profile.data.Tel} </td></tr>
//                 <tr><td>Email</td><td>{createAt.toString()} </td></tr>
                
                
                
//                 </tbody></table>
//             <div >
                
//                 <TextField name="Name-Lastname" />
//                 <label>Name-Lastname</label>
//             </div>
//             <div>
                
//                 <TextField name="Citizen ID" />
//                 <label>Citizen ID</label>
//             </div>
//             <DateReserve/>
//         </div>
//     )
// }


// //




/*

<main className="w-[100%] flex flex-col items-center">
            <div className="text-xl font-medium">
                
            </div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray"> Pick up Date And Location</div>
                <LocationDateReserve/>
            
                <div className="text-md text-left text-gray"> Return Date And Location</div>
                <LocationDateReserve/>
            </div>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"> Check Car Avaibility</button>
        </main>






*/