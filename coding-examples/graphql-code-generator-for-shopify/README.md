# GraphQL Code Generator for Shopify Example

Run `npm run codegen` to generate TypeScript types.

This is the `codegen.yml` for Shopify GraphQL working with TypeScript.

```
overwrite: true
schema:
  - https://graphql.myshopify.com/api/graphql:
      headers:
        X-Shopify-Storefront-Access-Token: 078bc5caa0ddebfa89cccb4a1baa1f5c
documents: "src/**/*.{ts,tsx}"
generates:
  src/types/shopify.type.ts:
    plugins:
      - typescript
      - typescript-operations
    config:
      typesPrefix: Shopify
```
