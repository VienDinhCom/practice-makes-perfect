import { gql } from 'apollo-boost';
import { ShopifyProductsQueryVariables, ShopifyProductSortKeys } from './types/shopify.type'

const productConnectionFields = gql`
  fragment ProductConnectionFields on ProductConnection {
    edges {
      node {
        title
        handle
        description
        createdAt
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
    }
  }
`;

export const productsQuery = gql`
  ${productConnectionFields}
  query Products($query: String!, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: 5, query: $query, sortKey: $sortKey, reverse: $reverse) {
      ...ProductConnectionFields
    }
  }
`;

export function getProducts({query, reverse, sortKey}: ShopifyProductsQueryVariables) {
  console.log({query, reverse, sortKey})
}

getProducts({
  query: '',
  sortKey: ShopifyProductSortKeys.BestSelling,
  reverse: true
});