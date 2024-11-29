const URL = 'http://localhost:5058/api/shopOffers';

export const getShopOffers = (token) => {
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

export const getShopOffer = (id, token) => {
    
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