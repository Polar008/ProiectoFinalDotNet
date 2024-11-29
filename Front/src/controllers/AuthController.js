const URL = 'http://26.147.198.13:5058/api/auth/login'

export const authLogin = (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }

    return fetch(URL, options)
        .then(x => x.json())
        .catch(e => console.log(e));
}