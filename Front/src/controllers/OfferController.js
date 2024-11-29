const URL = 'http://26.147.198.13:5058/api/offers';

export const getOffers = (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    return fetch(URL, options)
        .then(x => x.json())
        .catch(e => console.log(e));
}

export const getOffer = (id, token) => {
    
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    return fetch(URL+"/"+id, options)
        .then(x => x.json())
        .catch(e => console.log(e));
}