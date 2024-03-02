const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL_SEARCH = 'https://api.unsplash.com/search/photos';
const API_URL_IMG = 'https://api.unsplash.com/photos';
const IMAGES_PER_PAGE = 20;


const apiSettings = {
    fetchImages: async (term) => {
        const endpoint =
            `${API_URL_SEARCH}?query=${term}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`
        return await (await fetch(endpoint)).json();
    },

    fetchPopular: async (term) => {
        const endpoint =
            `${API_URL_SEARCH}?query=${term}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`
        return await (await fetch(endpoint)).json();
    },


    fetchImgStats: async (imgId) => {
        const endpoint = `${API_URL_IMG}/${imgId}/statistics?client_id=${API_KEY}`
        return await (await fetch(endpoint)).json();

    }
}

export default apiSettings;