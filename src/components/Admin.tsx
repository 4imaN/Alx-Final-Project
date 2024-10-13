// import { User } from "lucide-react";
// import { useState , useEffect} from "react";
// import axios from "axios";
 
// const Users = ()=>{
//     const [users ,setUsers ] = useState();

//     useEffect(() => {
//         let isMounted = true;
//         const controller = new AbortController();

//         const getUsers = async () =>{
//             try {

//                 const response = await axios.get('')

//             } catch(err){
//                 console.error(err);

            
//             }
//         }
//     },[])



//     return (
//     <article>
//         <h2>users List</h2>
//         { users?.length 
//             ? (
//                 <ul>
//                     {users.map((user,i) => <li key={i}>{user?.
//                     username}</li>)}
//                 </ul> 
//             ) : <p>No user to</p>
//         }
//          </article>
//     );
// }

// export default Users;