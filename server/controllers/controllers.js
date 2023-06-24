const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { jwtSign, jwtVerify } = require('../helpers/jwt')
const fs = require('fs');
const pool = require('../config/config');

class controllers {
    static async initdb(req, res, next) {
        try {
            // Read the JSON file
            const jsonData = fs.readFileSync('./seeders/data.json', 'utf8');
            const data = JSON.parse(jsonData);

            // Connect to the PostgreSQL server
            const client = await pool.connect();

            // Create Table
            await client.query(`  
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL
                );

                CREATE TABLE IF NOT EXISTS jobLists (
                    id VARCHAR PRIMARY KEY,
                    type VARCHAR,
                    url VARCHAR,
                    created_at TIMESTAMP DEFAULT NOW(),
                    company VARCHAR,
                    company_url VARCHAR,
                    location VARCHAR,
                    title VARCHAR,
                    description VARCHAR,
                    how_to_apply VARCHAR,
                    company_logo VARCHAR
                );
            `);

            // Seeding Table
            await Promise.all(
                data.map(async (row) => {
                    const query = {
                    text: 'INSERT INTO jobLists (id, type, url, created_at, company, company_url, location, title, description, how_to_apply, company_logo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
                    values: [ row.id, row.type, row.url, row.created_at, row.company, row.company_url, row.location, row.title, row.description, row.how_to_apply, row.company_logo,],
                    };
                    await client.query(query);
                })
            );


            client.release();
        
            res.json({ message: `Init Success`});
        } catch (error) {
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const { username, password } = req.body;
            const hashedPassword = hashPassword(password);
            const insertUserQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
            await pool.query(insertUserQuery, [username, hashedPassword]);
            res.send('User created successfully');
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body
            if (!username) throw { name: 'Username cannot be empty' }
            if (!password) throw { name: 'Password cannot be empty' }
            const response = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            if(!response.rows[0]) throw { name: 'Invalid username/password' }
            const isValid = comparePassword(password, response.rows[0].password)
            if (!isValid) throw { name: 'Invalid username/password' }
            const access_token = jwtSign({ username: response.rows[0].username })
            res.status(200).send({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async getJobList(req, res, next) {
        try {
            let {description, location, full_time, page, limit} = req.query
            if(full_time) full_time = true
            else full_time = false
            console.log(full_time)
            if(!page) page = 1
            if(!limit) limit = 10
            const offset = (page - 1) * limit;
            const query = `
            SELECT * FROM jobLists
            WHERE 
                description ILIKE $1 AND
                location ILIKE $2 AND
                CASE
                    WHEN $3 = true THEN type ILIKE 'Full Time'
                    ELSE NOT type ILIKE 'Full Time'
                END
            LIMIT $5
            OFFSET $4
            `
            const response = await pool.query(query, [`%${description}%`,`%${location}%`,full_time, offset, limit])
            res.status(200).send(response.rows)
        } catch (error) {
            next(error)
        }
    }

    static async getJobDetail(req, res, next) {
        try {
            const {id} = req.params
            const query = `
            SELECT * FROM jobLists WHERE id = $1
            `
            const response = await pool.query(query, [id])
            res.status(200).send(response.rows)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = controllers