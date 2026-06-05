import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.order.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.vendor.deleteMany()
  await prisma.deliverySchedule.deleteMany()

  // Create vendors
  const vendors = await Promise.all([
    prisma.vendor.create({
      data: {
        name: 'Aunty Muni',
        phoneNumber: '0209876543',
        foodType: 'Ghanaian Traditional',
        location: 'Central Cafeteria',
        ordersCompleted: 287,
        averageOrderValue: 24.5,
        rating: 4.8,
      },
    }),
    prisma.vendor.create({
      data: {
        name: 'Royal Kitchen',
        phoneNumber: '0208765432',
        foodType: 'Mixed Cuisine',
        location: 'Engineering Block B',
        ordersCompleted: 215,
        averageOrderValue: 26.0,
        rating: 4.6,
      },
    }),
    prisma.vendor.create({
      data: {
        name: 'Ice Kenkey',
        phoneNumber: '0207654321',
        foodType: 'Kenkey & Seafood',
        location: 'Library Annex',
        ordersCompleted: 156,
        averageOrderValue: 19.0,
        rating: 4.7,
      },
    }),
    prisma.vendor.create({
      data: {
        name: "Mama's Food",
        phoneNumber: '0206543210',
        foodType: 'Local Delicacies',
        location: 'Architecture Studio',
        ordersCompleted: 198,
        averageOrderValue: 23.5,
        rating: 4.9,
      },
    }),
    prisma.vendor.create({
      data: {
        name: 'Campus Grill',
        phoneNumber: '0205432109',
        foodType: 'Grilled & Fried',
        location: 'Hall 7',
        ordersCompleted: 242,
        averageOrderValue: 25.0,
        rating: 4.5,
      },
    }),
  ])

  // Create customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'Kwame Mensah',
        phoneNumber: '0501234567',
        email: 'kwame.mensah@knust.edu.gh',
        hostel: 'Hall 7',
        faculty: 'Engineering',
        orderHistory: 24,
        totalSpend: 580.5,
        favoriteVendors: ['Aunty Muni', 'Campus Grill'],
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Ama Serwaa',
        phoneNumber: '0502345678',
        email: 'ama.serwaa@knust.edu.gh',
        hostel: 'Brunei Hall',
        faculty: 'Architecture',
        orderHistory: 31,
        totalSpend: 752.0,
        favoriteVendors: ['Royal Kitchen', "Mama's Food"],
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Kofi Boateng',
        phoneNumber: '0503456789',
        email: 'kofi.boateng@knust.edu.gh',
        hostel: 'Mensah Hall',
        faculty: 'Science',
        orderHistory: 18,
        totalSpend: 425.75,
        favoriteVendors: ['Ice Kenkey'],
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Esi Appiah',
        phoneNumber: '0504567890',
        email: 'esi.appiah@knust.edu.gh',
        hostel: 'Africa Hall',
        faculty: 'Management',
        orderHistory: 42,
        totalSpend: 1025.5,
        favoriteVendors: ["Mama's Food", 'Royal Kitchen', 'Aunty Muni'],
      },
    }),
  ])

  // Create delivery schedules
  await Promise.all([
    prisma.deliverySchedule.create({
      data: {
        window: '12:00–12:20',
        capacity: 15,
      },
    }),
    prisma.deliverySchedule.create({
      data: {
        window: '12:20–12:40',
        capacity: 15,
      },
    }),
    prisma.deliverySchedule.create({
      data: {
        window: '12:40–13:00',
        capacity: 15,
      },
    }),
    prisma.deliverySchedule.create({
      data: {
        window: '13:00–13:20',
        capacity: 15,
      },
    }),
    prisma.deliverySchedule.create({
      data: {
        window: '13:20–13:40',
        capacity: 15,
      },
    }),
  ])

  console.log('✅ Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })