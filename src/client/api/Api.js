export default function GetTagsApi() {
  fetch('/api/v1/tags')
    .then(tags => tags.json())
    .then(tags => this.setState({ tagList: tags }));
}
