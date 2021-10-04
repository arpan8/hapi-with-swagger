const crypto = require('crypto');
let {users} = require('../fakeDb')
let fs = require('fs');

async function hash(password) {
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}

// verify password in case you need
async function verify(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":")
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(key == derivedKey.toString('hex'))
        });
    })
}

//Add some details

exports.addDetails = async(req, res)=>{
    try {
        const { name, email, password } = req.payload;

        let hashedPassword = password ? await hash(password) : ''

        let details = {
            id: Math.floor(Math.random() * 10),
            name,
            email,
            hashedPassword,
            message: 'Details added successfully'
        }
       
        users.push({id: details.id, name, email, hashedPassword})

        console.log(users)

        return details

    } catch (error) {
        console.log(error)
    }
}

//Show All details

exports.showDetails = async(req, res)=>{
    try {

        let details = {
            users,          // Here 'users' is array of objects (static). One can get their dynamic data from DB.  
            message: 'Details fetched successfully'
        }

        return details

    } catch (error) {
        console.log(error)
    }
}

//View details

exports.viewDetails = async(req, res)=>{
    try {

        let { id } = req.params;

        let userDetails = users.filter(user=> user.id == id)

        let details = {
            userDetails,         
            message: 'Detail fetched successfully'
        }

        return details

    } catch (error) {
        console.log(error)
    }
}

//update Details

exports.update = async(req, res)=>{
    try {
        const { id, name, email } = req.payload;

        let updateusers = users.map(user=> user.id === id ? { ...user, name: name, email: email} : user)

        users = updateusers

        let details = {
            updateusers,
            name,
            email,
            message: 'Details updated successfully'
        }

        console.log(updateusers)

        return details

    } catch (error) {
        console.log(error)
    }
}


exports.fileUpload = async(req, res)=>{
    try {
        
        fs.createWriteStream(__dirname + "../../../uploads/" + req.payload.file.filename)
        
        let details = {
            msg: 'File upload successfull'
        }
        return details
    } catch (error) {
        console.log(error)
    }
}

