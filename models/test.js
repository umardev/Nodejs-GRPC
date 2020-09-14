module.exports = {
    testFunction: function () {
        return new Promise(
            function (resolve, reject) {
                let dd = db
                    .get()
                    .query(
                        `SELECT
                            *
                        FROM 
                            ${dbConst.DB_USER}
                        WHERE 
                            id = ${userId}
                        `,
                        function (err, rows) {
                            //console.log(dd.sql)
                            if (err) {
                                reject(err);
                            } else {
                                resolve(rows);
                            }
                        }
                    );
            }
        )
    },

    testFunction1: function () {
        return ' functin 3';
    }
};