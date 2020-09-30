const apiServer = (process.env.REACT_APP_serverIp && process.env.REACT_APP_PORT) ? process.env.REACT_APP_serverIp + ':' + process.env.REACT_APP_PORT : 'http://receipt-server.softhem.se:6600';
console.log('ENV:', apiServer);

const statuses = {
    NEW: 1,
    CREATED: 2,
    FINISHED: 3,
    UNFINISHED: 4
};

export {
    apiServer,
    statuses
};

console.log(process.env.REACT_APP_serverIp)
