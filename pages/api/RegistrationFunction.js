
// import Cookies from 'js-cookie';
// import { URLADRESS } from '@/components/Constants';

// export default async function RegistrationFunction(body) {
//     let data
//     console.log(body)
//     try {
//         const response = await fetch(URLADRESS + 'authorization', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(body),

//         });

//         if (response.ok) {
//             data = await response.json()
//                 .then(data => {
//                     console.log(data)
//                     Cookies.set('jwtToken', data.token);
//                     Cookies.set('userName', data.username);
//                     // // console.log('userID', data.id);
//                     // // console.log(data);
//                     // JWTToken = data.token;
//                 })

//                 .catch(error => {
//                     console.error(error);
//                     prompt(error);
//                 });

//         } else {
//             alert('Невірно введені пошта або пароль! Спробуйте ще');

//         };
//     } catch (error) {
//         alert('Упс.... Щось пішло не так');
//     };
//     return data
// }