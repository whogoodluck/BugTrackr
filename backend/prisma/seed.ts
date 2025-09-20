import { PrismaClient, Role, Severity, Status } from '@prisma/client'
import bcrypt from 'bcryptjs'
import logger from '../src/utils/logger'

const prisma = new PrismaClient()

async function main() {
  logger.info('🌱 Seeding database...')

  logger.info('Deleting existing data...')
  await prisma.bug.deleteMany()
  await prisma.user.deleteMany()

  logger.info('Hashing password...')
  const hashedPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
  }

  logger.info('Creating users...')
  await prisma.user.create({
    data: {
      email: 'goodluck@example.com',
      name: 'Sunny Kumar',
      password: await hashedPassword('hashedpassword123'),
      role: Role.ADMIN
    }
  })

  const reporter = await prisma.user.create({
    data: {
      email: 'reporter@example.com',
      name: 'Reporter User',
      password: await hashedPassword('hashedpassword123'),
      role: Role.REPORTER
    }
  })

  logger.info('Creating bugs...')
  await prisma.bug.createMany({
    data: [
      {
        title: 'Login button not working',
        description: 'The login button on the homepage is unresponsive.',
        severity: Severity.HIGH,
        status: Status.OPEN,
        reporterId: reporter.id
      },
      {
        title: 'Profile picture not updating',
        description: 'Uploading a new profile picture does not replace the old one.',
        severity: Severity.MEDIUM,
        status: Status.IN_PROGRESS,
        reporterId: reporter.id
      },
      {
        title: 'Typo in dashboard',
        description: "The word 'Succes' should be 'Success'.",
        severity: Severity.LOW,
        status: Status.CLOSED,
        reporterId: reporter.id
      }
    ]
  })

  console.log('✅ Seeding completed.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    logger.error('Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
