
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  const email = 'admin@avanti.local'
  const passwordHash = bcrypt.hashSync('admin123', 10)
  const exists = await prisma.user.findUnique({ where: { email } })
  if (!exists) {
    await prisma.user.create({ data: { email, passwordHash, role: 'ADMIN' } })
    console.log('Seed: admin user created:', email)
  } else {
    console.log('Seed: admin exists:', email)
  }
}
main().catch((e)=>{ console.error(e); process.exit(1) }).finally(()=>prisma.$disconnect())
