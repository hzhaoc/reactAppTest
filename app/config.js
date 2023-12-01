export const inputFile = {
    url: './testInput.json',
    header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'cache': 'force-cache',
    },
    next: 
    { 
        revalidate: 3600 // revalidate input per hour
    },
};