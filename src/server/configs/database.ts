import mongoose from 'mongoose';

export function configureDatabase(): void {
    try {
        mongoose.connect(process.env.DB_URL);
    } catch (err) {
        mongoose.createConnection(process.env.DB_URL);
    }
    mongoose.connection
        .once('open', () => {
            console.log('Mongo DB running');
        })
        .on('error', (e) => {
            console.log('Error ', e);
            throw e;
        });
}