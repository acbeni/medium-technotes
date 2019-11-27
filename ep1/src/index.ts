

const query = print`
    query{
      carts{
        count
      }
    }
`;

function print(val:TemplateStringsArray){
    console.log(JSON.stringify(val))
}