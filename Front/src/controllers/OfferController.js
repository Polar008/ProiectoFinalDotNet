const URL = 'http://localhost:5058/api/offers';

export const getOffers = () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(URL, options)
        .then(x => x.json())
        .catch(e => console.log(e));
}

export const getOffer = (id) => {
    
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(URL+"/"+id, options)
        .then(x => x.json())
        .catch(e => console.log(e));
}