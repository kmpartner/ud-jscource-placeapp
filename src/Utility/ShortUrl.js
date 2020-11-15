const url = 'http://localhost:8000'

export const createShortUrl = (url, longUrl) => {
  console.log(url, longUrl);
  return new Promise((resolve, reject) => {
    fetch(url + '/v1/shorturl', {
      method: 'POST',
      headers: {
        // Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        longUrl: longUrl 
      })
    })
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(resData => {
        console.log(resData);
        resolve({ message: "create short url success", data: resData });
      })
      .catch(err => {
        console.log(err);
        reject('make short url failed');
      })
  })
}