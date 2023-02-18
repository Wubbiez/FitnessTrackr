// import React from "react";



// async function CreateActivity(props) {
//     const { token, name, description, setName, setDescription } = props;


//     return (
//         <form
//             onSubmit={
//                 async (event) => {
//                     event.preventDefault();

//                     try {
//                         const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities',
//                             {
//                                 method: "POST",
//                                 headers: {
//                                     'Content-Type': 'application/json',
//                                     'Authorization': `Bearer ${token}`
//                                 },
//                                 body: JSON.stringify({
//                                     activity: {
//                                         name,
//                                         description,
//                                     }
//                                 })
//                             }).then(response => response.json())
//                             .then(result => {
//                                 console.log(result)
//                             });

//                         console.log(response)



//                     } catch (err) {
//                         console.log('failed to make an Activity');
//                         console.error(err)
//                     }

//                 }
//             }
//         >
//             <label>
//                 Name
//                 <input
//                     onChange={setName}
//                     value={name}
//                 />
//             </label>
//             <label>
//                 Description
//                 <input
//                     onChange={setDescription}
//                     value={description}
//                 />
//             </label>
//             <button type="submit">Submit Activity</button>

//         </form>
//     )

// }

// export default CreateActivity