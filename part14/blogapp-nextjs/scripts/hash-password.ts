import bcrypt from "bcryptjs";

async function main() {
  const hash = await bcrypt.hash("secret123", 10);

  console.log(hash);
}

main();
