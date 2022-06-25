
export const postOptions = (data) => ({
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: { base64_encoded: 'true', fields: '*' },
    headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_JUDGE0_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data: data
})

export const getOptions = (token) => ({
    method: 'GET',
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: { base64_encoded: 'true', fields: '*' },
    headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_JUDGE0_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    }
})

export const languages = [
    {
        id: 62,
        language: 'Java',
        monacoL: 'java'
    },
    {
        id: 71,
        language: 'Python',
        monacoL: 'python'
    },
    {
        id: 63,
        language: 'JavaScript',
        monacoL: 'javascript'
    },
    {
        id: 72,
        language: 'Ruby',
        monacoL: 'ruby'
    },
]