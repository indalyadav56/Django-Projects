import { useQuery, gql } from "@apollo/client"

/**
 *
 * @param {Parameters<typeof useQuery>[1]} options
 */
export default function useTypeQuery(options) {
  return useQuery(gql`
    query getAssetTypes($name: String!) {
      __type(name: $name) {
        name
        fields {
          name
          type {
            kind
            ofType {
              name
              enumValues {
                name
                description
              }
            }
          }
        }
      }
    }
  `, options)
}
