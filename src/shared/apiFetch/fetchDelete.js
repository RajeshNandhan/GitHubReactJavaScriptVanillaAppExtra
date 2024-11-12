//This method uses "react fetch" maily to make delete api call
const fetchDelete = async(url = '') => {
    const deleteOptions = {
        method: 'DELETE'
    };

    try {
        const response = await fetch(url, deleteOptions);
        if(!response.ok)
            throw Error('unsuccessfull request');
    } catch(err) {
        throw err;
    }
}

export default fetchDelete;