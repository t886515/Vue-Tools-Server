const superagent = require('superagent');

// https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/nanananaa

// Accept: application/vnd.github.v3+json
// Authorization: c1f4d6212ca95869c9d8f3df9d4a696d56b8de99
// Content-Type: application/json
// X-Riot-Token: RGAPI-7e6d20d0-7ebe-43de-95f5-9c526889fce0

const getSummonerInfo = async summonerName => {
  const url = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}`;
  const header = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: 'c1f4d6212ca95869c9d8f3df9d4a696d56b8de99',
    'Content-Type': 'application/json',
    'X-Riot-Token': 'RGAPI-7e6d20d0-7ebe-43de-95f5-9c526889fce0'
  };

  try {
    const res = await superagent.get(url).set(header);
    console.log(res.body);
    return res.body ? res.body : 'did not retrieve anything';
  } catch (e) {
    console.error('Something went wrong trying to connect to Riot API.', e);
  }
};
module.exports = {
  getSummonerInfo
};
