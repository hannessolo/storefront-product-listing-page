async function getGraphQL(apiUrl = '', query = '', variables = {}, store = '') {
  const graphqlEndpoint = apiUrl.includes('cs-graphql-sandbox')
    ? apiUrl.replace('cs-graphql-sandbox', 'graphql')
    : `${apiUrl}/graphql`;
  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Store: store },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => res.json());

  return response;
}

export { getGraphQL };
