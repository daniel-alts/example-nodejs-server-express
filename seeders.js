const db = require('./db');
const UserModel = require('./models/user.model');

db.connect().then(async () => {
    await UserModel.insertMany([
        { 
            name: 'daniel',
            email: 'daniel@example.com',
            contact: 'lagos',
            password: '1244566',
            phone_number: '9035444444',
            gender: 'male'
        }
     ])
     console.log('added to db successfully')
     process.exit(1)
}).catch((err) => {
    console.log('Error seeding', err)
})


