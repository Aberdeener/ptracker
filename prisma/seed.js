const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');
const Role = require('../models/Role');

async function main() {
    const sections = [];

    sections.push({
        id: 1,
        name: 'Default Section',
        instructorId: 1,
    });

    for (let i = 2; i <= 4; i++) {
        sections.push({
            id: i,
            name: `Section ${i}`,
            instructorId: i,
        });
    }

    await prisma.section.createMany({
        data: [
            ...sections,
        ]
    });

    const users = [];

    for (let i = 1; i <= 100; i++) {
        users.push({
            id: i,
            name: faker.name.firstName() + ' ' + faker.name.lastName(),
            email: faker.internet.email(),
            googleId: faker.datatype.number({ min: 11491216591676147997, max: 12691216591676147997 }).toString(),
            role: i <= 4 ? Role.INSTRUCTOR : faker.random.arrayElement([
                Role.STUDENT,
                Role.INSTRUCTOR,
                Role.ADMIN
            ]),
            sectionId: faker.random.arrayElement(sections.map(s => s.id)),
            emailNotifications: faker.datatype.boolean(),
        });
    }

    await prisma.user.createMany({
        data: [
            ...users,
        ],
    });

    const sites = [];

    for (let i = 1; i <= 5; i++) {
        sites.push({
            id: i,
            name: faker.company.companyName(),
        });
    }

    await prisma.site.createMany({
        data: [
            ...sites,
        ],
    });

    const shifts = [];

    for (let i = 0; i <= 300; i++) {
        shifts.push({
            userId: faker.random.arrayElement(users.map(u => u.id)),
            siteId: faker.random.arrayElement(sites.map(s => s.id)),
            date: faker.date.past(),
            type: faker.random.arrayElement(['DAY', 'EVENING', 'NIGHT']),
        });
    }

    await prisma.shift.createMany({
       data: [
           ...shifts
       ],
    });
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })