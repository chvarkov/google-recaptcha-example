class HttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    /**
     * @param {string} uri
     * @param {Object} data
     * @param {HeadersInit} headers
     * @returns {Promise<Response>}
     */
    post(uri, data, headers) {
        return fetch(`${this.baseUrl}${uri}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...headers || {},
            },
            body: JSON.stringify(data)
        }).catch(e => e);
    }
}

function init() {
    const http = new HttpClient('http://localhost:3000');

    const reqButton = document.getElementById('request-btn');
    const statusElem = document.getElementById('status');
    const dataElem = document.getElementById('data');

    reqButton.onclick = async () => {
        const recaptcha = grecaptcha.getResponse();
        grecaptcha.reset();


        const res = await http.post('/submit', {}, {
            recaptcha,
        });

        const payload = await res.json() || {};

        console.log(payload);

        statusElem.innerText = res.status;
        dataElem.innerText = JSON.stringify(payload, null, 4);
    };
}
