// import { Facebook } from '@ionic-native/facebook';
//
//
// export class FacebookMock extends Facebook{
//       constructor(){super();}
//
//       login(permissions: string[]) {
//         return new Promise((resolve, reject) => {
//           resolve(
//             {
//               status: "connected",
//               authResponse: {
//                 session_key: true,
//                 accessToken: "aoijaoisjdo",
//                 expiresIn: 5183979,
//                 sig: "...",
//                 secret: "...",
//                 userID: "100110"
//               }
//             }
//           )
//         })
//       }
//
//       api(requestPath: string, permissions: string[]): Promise<any> {
//
//         if (requestPath == '/me?fields=id,name,email,first_name,last_name,gender') {
//           return new Promise((resolve, reject) => {
//             resolve(
//               {
//                 id: "191919191",
//                 name: "Jeferson Solis de la Torre",
//                 first_name: "Jeferson",
//                 last_name: "Solis de la Torre",
//                 gender: "male",
//                 email:"matiassolis@gmail.com"
//               }
//             )
//           })
//
//         }
//
//         return new Promise((resolve, reject) => {
//           resolve(
//             {
//               data: {
//                 is_silhouette: false,
//                 url: "Thumbnail"
//               }
//             }
//           )
//         })
//
//       }
//
//     }
