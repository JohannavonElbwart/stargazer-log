const list = document.getElementById("starred-list");

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then((repos) => {
    for (const repo of repos) {
      const item = document.createElement("li");

      const link = document.createElement("a");
      link.href = repo.url;
      link.textContent = repo.name;

      const description = document.createElement("p");
      description.className = "description";
      description.textContent = repo.description;

      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = `${repo.language} · starred ${repo.starred_at}`;

      item.append(link, description, meta);
      list.append(item);
    }
  })
  .catch((error) => {
    list.textContent = `Could not load starred repositories: ${error.message}`;
  });
