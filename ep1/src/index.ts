import { generateSchemaToPath } from "./helper";
import { func } from "joi";

generateSchemaToPath("/Users/abeniasaad/IdeaProjects/newTsSdk/ctp.graphql")


// const query = gql`
//   query {
//     carts {
//       count
//       results {
//         country
//         taxMode
//         billingAddress {
//           country
//           city,
//           building,
//         }
//         createdBy{
//             clientId
//         }
//       }
//     }
//   }
// `;

// function gql(val:TemplateStringsArray){
//     console.log(JSON.stringify(val))
// }