# Nodejs-GRPC

# Clone the repository to get the example code
$ git clone https://github.com/umardev/Nodejs-GRPC.git
# Navigate to the Nodejs-GRP
$ cd Nodejs-GRPC
# Install the example's dependencies
$ npm install or npm i
# Open config/constants.js and provide database details.  

This project is dealing with 2 database:

First Database :
  Create database of any name and import below table.  
  
  CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `added_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
  
 Second Database:
  Create database of any name and import below table.
  
  CREATE TABLE `invoices` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('paid','unpaid') DEFAULT NULL,
  `added_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

In order to run this app:

    Go to root folder and run below command.
    PORT=3000 nodemon

Then, go to http://localhost:3000/user?id=1
