import { Prisma } from 'prisma-binding';
const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466/inspiredby/dev',
    // endpoint: 'http://localhost:4466/inspiredby/prod',
    
});

export default prisma;