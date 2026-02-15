const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Basic validation
        if (!email || !password || !name) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        const items = await prisma.user.findUnique({ where: { email } });
        if (items) return res.status(400).send({ error: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 8);

        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
            });
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
            res.status(201).send({ user, token });
        } catch (dbError) {
            console.error("Database error during registration:", dbError);
            if (dbError.code === 'P2002') {
                return res.status(400).send({ error: 'Email already exists' });
            }
            throw dbError;
        }
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).send({ error: error.message || 'Registration failed' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = { register, login };
