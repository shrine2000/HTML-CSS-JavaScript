const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const reposCache = new Map();

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);

    return data;
  } catch (err) {
    if (err.response.status == 404) {
      throw new Error("No profile with this username");
    }

    throw new Error("Failed to fetch user data");
  }
}

async function getUserInfo(username) {
  try {
    const userData = await getUser(username);

    const userID = userData.name || userData.login;
    const userBio = userData.bio ? `<p>${userData.bio}</p>` : "";
    const cardHTML = `
            <div class="card">
                <div>
                    <img src="${userData.avatar_url}" alt="${userData.name}" class="avatar">
                </div>
                <div class="user-info">
                    <h2>${userID}</h2>
                    ${userBio}
                    <ul>
                        <li>${userData.followers} <strong>Followers</strong></li>
                        <li>${userData.following} <strong>Following</strong></li>
                        <li>${userData.public_repos} <strong>Repos</strong></li>
                    </ul>

                    <div id="repos"></div>
                </div>
            </div>
        `;
    main.innerHTML = cardHTML;

    return userData.login;
  } catch (err) {
    createErrorCard(err.message);
  }
}

async function getRepos(username) {
  try {
    if (reposCache.has(username)) {
      return reposCache.get(username);
    }

    const { data } = await axios(APIURL + username + "/repos?sort=created");

    reposCache.set(username, data);

    return data;
  } catch (err) {
    createErrorCard("Problem fetching repos");
  }
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

function createErrorCard(msg) {
  const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `;

  main.innerHTML = cardHTML;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    const username = await getUserInfo(user);
    const repos = await getRepos(username);

    addReposToCard(repos);

    search.value = "";
  }
});
