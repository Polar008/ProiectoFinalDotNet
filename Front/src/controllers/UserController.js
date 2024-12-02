const URL = 'http://26.147.198.13:5058/api/users';

export const createUser = (formData) => {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    };

    return fetch(URL, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => console.error("Error uploading image:", error));
};

export const getUserData = (token) => {
    
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    return fetch(URL+"/", options)
        .then(x => x.json())
        .catch(e => console.log(e));
}