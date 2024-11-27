const URL = 'http://26.147.198.13:5058/api/shopOffers';

export const getShopOffers = () => {
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

export const getShopOffer = (id) => {
    
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