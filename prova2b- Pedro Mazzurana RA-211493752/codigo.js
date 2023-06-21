async function getPersonagem() {
    const response = await fetch('https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10')
    const personagemArray = await response.json()

    const container = document.getElementById("container");


    personagemArray.forEach((personagem) => {
        const card = document.createElement("div")
        card.classList.add("card")

        const idPersonagem = document.createElement("p")
        idPersonagem.textContent = personagem.id

        const image = document.createElement("img");
        image.src = personagem.image
 
        const namePersonagem = document.createElement("h2")
        namePersonagem.textContent = personagem.name

        const statusPersonagem = document.createElement("p")
        statusPersonagem.textContent = personagem.status

        const genderPersonagem = document.createElement("p")
        genderPersonagem.textContent = personagem.gender
        
        container.appendChild(card)
        card.appendChild(image)
        card.appendChild(idPersonagem)
        card.appendChild(namePersonagem)
        card.appendChild(statusPersonagem)
        card.appendChild(genderPersonagem)

    })

}
function forms(){
    document.getElementById("registrationForm").addEventListener("submit", function(event){
    event.preventDefault()
  
    let name = document.getElementById("name").value
    let gender = document.getElementById("gender").value
    let episode = document.getElementById("episode").value
  
    let tableRow = document.createElement("tr")
  
    tableRow.innerHTML = `<td>${name}</td><td>${gender}</td><td>${episode}</td>`
    document.getElementById("registrationTable").appendChild(tableRow)
    document.getElementById("registrationForm").reset()
  })
}

function fetchCharacterData() {
    const characterIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const apiUrl = 'https://rickandmortyapi.com/api/character/';
  
    Promise.all(characterIds.map(id => fetch(apiUrl + id)))
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(characters => {
        characters.forEach(character => {
          const { name, gender, episode } = character;
          const episodeList = getEpisodeList(episode);
  
          const newRow = document.createElement('tr');
          newRow.innerHTML = `
            <td>${name}</td>
            <td>${gender}</td>
            <td>${episode.length}</td>
            <td>${episodeList}</td>
            <td>${getRuleStatus(episode)}</td>
          `;
  
          document.getElementById('characterTableBody').appendChild(newRow);
        });
      })
      .catch(error => console.log(error));
  }
  
  function getEpisodeList(episode) {
    const firstFiveEpisodes = episode.slice(0, 5).join(', ');
    const lastTwoEpisodes = episode.slice(-2).join(', ');
  
    return `${firstFiveEpisodes}, ${lastTwoEpisodes}`;
  }
  
  function getRuleStatus(episode) {
    return episode.length >= 7 ? 'Passed' : 'Failed';
  }
  
getPersonagem();
fetchCharacterData();
forms();