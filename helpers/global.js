const constants = require("../config/constants");
var request = require("request");

module.exports = {
    response: (status, msg, data, err) => {
        return new Promise(async function (resolve, reject) {
            let r = {
                status: Number(status),
                msg: msg,
                data: data ? data : {},
                err: err
            };
            resolve(r);
        });
    }
};