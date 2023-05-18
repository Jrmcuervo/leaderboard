import './style.css';

let data = [];

const player = window.document.getElementById('nameInput');
const points = window.document.getElementById('scoreInput');
const pointsDeploy = window.document.querySelector('.leaderboard__table');

const getScore = async () => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/TYBkzPuwqpwT7G0vx1Do/scores')
    .then((response) => response.json())
    .then((json) => {
      data = json.result;
      pointsDeploy.innerHTML = '';
      data.forEach((dat, index) => {
        const listItem = document.createElement('li');
        listItem.className = `li-${index % 2}`;
        listItem.innerHTML = `<p><b>${dat.user}</b> : ${dat.score}</p>`;
        pointsDeploy.appendChild(listItem);
      });
    });
};

const addScore = async (playerAdd, pointsAdd) => {
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/TYBkzPuwqpwT7G0vx1Do/scores', {
    method: 'POST',
    body: JSON.stringify({
      user: playerAdd,
      score: Number(pointsAdd),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.response === 'Leaderboard score created correctly.') {
        getScore();
      }
      player.value = '';
      points.value = '';
    });
};

window.document.querySelector('.leaderboard__refresh').addEventListener('click', () => {
  getScore();
});

window.document.querySelector('.leaderboard__form').addEventListener('submit', (event) => {
  event.preventDefault();
  addScore(player.value, points.value);
});

getScore();
