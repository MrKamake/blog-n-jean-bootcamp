

export default function postsApi() {
  const url = '/api/v1/articles?limit=10&sort=dsc';
  return fetch(url)
    .then(res => res.json());
}
