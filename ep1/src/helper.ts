import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'
import { createClient } from '@commercetools/sdk-client'
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/typescript-sdk'
import fetch from 'node-fetch'
import { introspectionQuery, buildClientSchema, printSchema } from 'graphql'
import { PathLike, writeFile } from 'fs'



const projectKey = process.env.JVM_SDK_IT_PROJECT_KEY
const clientId = process.env.JVM_SDK_IT_CLIENT_ID
const clientSecret = process.env.JVM_SDK_IT_CLIENT_SECRET

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.sphere.io',
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  fetch,
})

const httpMiddleware = createHttpMiddleware({
  host: 'https://api.sphere.io',
  fetch,
})

const ctpClient = createClient({
  middlewares: [authMiddleware, httpMiddleware],
})

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({projectKey})


export function generateSchemaToPath(path: PathLike) {
    apiRoot
      .graphql()
      .post({
        body: {
          query: introspectionQuery
        }
      })
      .execute()
      .then(res => (res.body as any).data)
      .then(buildClientSchema)
      .then(printSchema)
      .then(res =>
        writeFile(
          path,
          res,
          error => {
            console.log(error);
          }
        )
      )
      .catch(console.log);
  }
  