const conn = require('./config/db');
const conn2 = require('./config/db2');
const PROTO_PATH = './helloworld.proto';
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
let { employees } = require('./data.js');
const { forEach } = require("lodash");
const { response } = require('express');

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) { 

    //callback(null, { message: 'Hellos ' + call.request.name });
    
    callback(null, { message: 'Hellos ' + call.request.name });
}
 
function getDetails(call, callback) {
    //console.log(conn);
    let response_result ;
    employees.forEach(element=>{
        if (call.request.id==element.id){
            response_result = element;
        }
    });
    let invoices =[];
    let qry = `select id,email,name from users where id=${call.request.id}`;
    conn.query(qry, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            response_result = result[0];

            let qry2 = `select id, price as amount from product limit 3`;
            conn2.query(qry2, (err, result2) =>{
                if(err){
                    console.log(err);
                }else{
                    invoices = result2;
                    console.log(result2);
                }

                response_result['list'] = invoices;

                callback(
                    null,
                    {
                        message: response_result
                    }
                );

            });
        }
    });
    // console.log(query);

    
}

var server = new grpc.Server();
server.addService(hello_proto.Greeter.service, { sayHello: sayHello, getDetails: getDetails });
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();