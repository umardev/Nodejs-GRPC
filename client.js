var PROTO_PATH = './helloworld.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

var client = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());

module.exports = {
    getUser: (params) => {

        let { name: memberName = 'raju' } = params;

        client.sayHello({ name: memberName }, function (err, response) {
            console.log('Greeting:', response.message);
            console.log('Response:', response);
        });
    },

    getUserDetail: (params) => {
        return new Promise(
            (resolve, reject) => {
                let { id: id = '1' } = params;
                client.getDetails({ id: id }, function (err, response) {
                    err ? reject(err) : resolve(response.message);
                });
            }
        )
    }
};