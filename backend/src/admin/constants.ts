export const jwtConstants = {
    secret: process.env.TOKEN || 'defaultSecretKey', // použije hodnotu z .env, nebo defaultní hodnotu
};