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

    let response_result = {
        'id':'',
        'name':'',
        'email':'',
        'invoices':[],
        'message': '',
        'status': '',
    } ;

    let invoices =[];
    let user_id = call.request.id;

    let qry = `select id,email,name from users where id=${user_id}`;
    conn.query(qry, (err, result) => {
        if (err) {
            response_result['status']=0;
            response_result['message']=err.message;
            callback(
                null,
                {
                    message: response_result
                }
            );
        } else {
            if (result.length){
                response_result = result[0];
                response_result['status'] =1;
                response_result['message'] ='Done';

                let qry2 = `select id,amount,status from invoices where user_id = ${user_id}`;
                conn2.query(qry2, (err, result2) => {
                    if (err) { 
                        console.log(err);
                    } else {
                        invoices = result2;
                    }

                    response_result['invoices'] = invoices;

                    callback(
                        null,
                        {
                            message: response_result
                        }
                    );
                });
            }else{
                console.log('Here');
                response_result['status']=0;
                response_result['message']='NO record found';
                callback( 
                    null, 
                    {
                        message: response_result
                    }
                );
            }
        }
    });
}

var server = new grpc.Server();
server.addService(hello_proto.Greeter.service, { sayHello: sayHello, getDetails: getDetails });
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();