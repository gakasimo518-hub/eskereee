import { PrismaClient, Role, Department } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ---------- ROLES ----------
  const rolesData: { name: Role }[] = [
    { name: 'ADMIN' },
    { name: 'MANAGER' },
    { name: 'EMPLOYEE' },
  ];

  const roles = await Promise.all(
    rolesData.map((r) =>
      prisma.role.upsert({
        where: { name: r.name },
        update: {},
        create: { name: r.name },
      })
    )
  );

  // ---------- DEPARTMENTS ----------
  const departmentsData: { name: Department }[] = [
    { name: 'SALES' },
    { name: 'HR' },
    { name: 'IT' },
    { name: 'FINANCE' },
  ];

  const departments = await Promise.all(
    departmentsData.map((d) =>
      prisma.department.upsert({
        where: { name: d.name },
        update: {},
        create: { name: d.name },
      })
    )
  );

  // ---------- ADMIN USER ----------
  const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@eskereee.com' },
    update: {},
    create: {
      email: 'admin@eskereee.com',
      firstName: 'Admin',
      lastName: 'User',
      password: adminPasswordHash,
      roleId: roles.find((r) => r.name === 'ADMIN')!.id,
      isActive: true,
    },
  });

  // ---------- SAMPLE CLIENTS ----------
  const clientsData = [
    {
      name: 'Acme Corp',
      email: 'contact@acme.com',
      phone: '+1-555-0100',
      address: '123 Main St, Metropolis',
    },
    {
      name: 'Globex Ltd.',
      email: 'info@globex.com',
      phone: '+1-555-0200',
      address: '456 Oak Ave, Gotham',
    },
    {
      name: 'Initech',
      email: 'support@initech.com',
      phone: '+1-555-0300',
      address: '789 Pine Rd, Springfield',
    },
  ];

  await Promise.all(
    clientsData.map((c) =>
      prisma.client.upsert({
        where: { email: c.email },
        update: {},
        create: {
          name: c.name,
          email: c.email,
          phone: c.phone,
          address: c.address,
        },
      })
    )
  );

  // ---------- SAMPLE EMPLOYEES ----------
  const employeesData = [
    {
      email: 'john.doe@eskereee.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'Employee@123',
      role: 'MANAGER',
      department: 'SALES',
    },
    {
      email: 'jane.smith@eskereee.com',
      firstName: 'Jane',
      lastName: 'Smith',
      password: 'Employee@123',
      role: 'EMPLOYEE',
      department: 'HR',
    },
    {
      email: 'bob.brown@eskereee.com',
      firstName: 'Bob',
      lastName: 'Brown',
      password: 'Employee@123',
      role: 'EMPLOYEE',
      department: 'IT',
    },
  ];

  await Promise.all(
    employeesData.map(async (e) => {
      const passwordHash = await bcrypt.hash(e.password, 10);
      const role = roles.find((r) => r.name === e.role);
      const department = departments.find((d) => d.name === e.department);

      if (!role) throw new Error(`Role ${e.role} not found`);
      if (!department) throw new Error(`Department ${e.department} not found`);

      await prisma.user.upsert({
        where: { email: e.email },
        update: {},
        create: {
          email: e.email,
          firstName: e.firstName,
          lastName: e.lastName,
          password: passwordHash,
          roleId: role.id,
          departmentId: department.id,
          isActive: true,
        },
      });
    })
  );

  console.log('🌱 Seed data successfully inserted.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });