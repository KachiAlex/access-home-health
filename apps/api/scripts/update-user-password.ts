import "dotenv/config";
// import prisma from "../src/prisma/client";
// import { hashPassword } from "../src/modules/user/password.utils";

async function main() {
  console.log("This script requires Prisma to be configured");
  // const email = process.env.PASSWORD_RESET_EMAIL ?? "onyedika.akoma@gmail.com";
  // const newPassword = process.env.PASSWORD_RESET_VALUE ?? "dikaoliver2660";

  // const result = await prisma.user.upsert({
  //   where: { email },
  //   update: {
  //     passwordHash: hashPassword(newPassword),
  //   },
  //   create: {
  //     email,
  //     passwordHash: hashPassword(newPassword),
  //   },
  // });

  // console.log(`Password ${result.createdAt ? "set" : "updated"} for ${email}`);
}

main()
  .catch((error) => {
    console.error("Password reset script failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    // await prisma.$disconnect();
  });
