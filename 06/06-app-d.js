import {writeFile, readFile} from 'fs';
import {use, start, write} from "./05-httpFramework-f.js";

use('POST', 'sum', function (request, response) {
    response.write((parseInt(request.data.input1) + parseInt(request.data.input2)).toString());
    response.end();
});
use('GET', 'sum', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);
    response.write((parseInt(inputs[0]) + parseInt(inputs[1])).toString());
    response.end();
});
use('GET', 'log', function (request, response) {
    console.log('post data is:', request.data);
    response.end();
});
use('GET', 'file', function (request, response) {
    let url = request.url.split('/');
    let inputs = url.slice(2);

    readFile(inputs[0], function (error, fileBody){
        if(error){
            console.log('ERROR:', error);
            write(response, 400, 'ERROR:' + error)
        }
        else{
            response.write(fileBody);
            response.end();
        }
    });
});
use('POST', 'user', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{
            let dataObject = JSON.parse(fileData);
            let username = request.data.username
		let isUserExists = false
            for (const user of dataObject.records) {
		if(user.username == username){
		isUserExists = true;
		break;
		}
            }

	if(isUserExists){
	return write(response, 500, "User Already Exists !!");
	}

            dataObject.records.push(request.data);
            let dataString = JSON.stringify(dataObject);
            
            writeFile('./users.json', dataString, function (error){
                if(error){
                    console.log('ERROR:', error);
                    write(response, 500, 'ERROR:' + error)
                }
                else{
                    console.log('User Created.');
                    write(response, 200, 'User Created.')
                }
            });
        }
    });
});


use('DELETE', 'user', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{
            let dataObject = JSON.parse(fileData);
            let username = request.data.username
		
		const users = dataObject.records.filter((user) => user.username != username)

if(users.length === dataObject.records.length)
{
return write(response, 200, 'User Not Found')
}
dataObject.records = users

let dataString = JSON.stringify(dataObject)

		writeFile('./users.json', dataString, function (error){
                if(error){
                    console.log('ERROR:', error);
                    write(response, 500, 'ERROR:' + error)
                }
                else{
                    console.log('User Created.');
                    write(response, 200, 'User deleted successfully !!.')
                }
            });
            
        }
    });
});


use('POST', 'token', function (request, response) {
    readFile('./users.json', 'utf8', function (error, fileData){
        if(error){
            console.log('ERROR:', error);
            write(response, 500, 'ERROR:' + error);
        }
        else{
            let dataObject = JSON.parse(fileData);
            let username = request.data.username
let password = request.data.password
		let isUserExists = false
            for (const user of dataObject.records) {
		if(user.username == username && user.password == password){
		isUserExists = true;
		break;
		}
            }

	if(isUserExists){
	const token = Math.random() * 1000
	return write(response, 500, JSON.stringify({token}));
	}else{
return write(response, 500, "Username or password is wrong");
}

            
        }
    });
});
start();
