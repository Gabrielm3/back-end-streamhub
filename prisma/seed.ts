import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('12345678', 10); // Hash da senha

    await prisma.user.create({
        data: {
            email: 'contatoeugm@gmail.com',
            password: hashedPassword, // Use a senha hash
            name: 'Admin',
            role: 'ADMIN',
        },
    });

    console.log('Admin user created');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });