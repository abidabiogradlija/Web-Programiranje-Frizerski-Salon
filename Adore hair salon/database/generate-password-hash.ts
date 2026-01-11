import bcrypt from "bcryptjs"

async function generateHash() {
  const password = "user"
  const hash = await bcrypt.hash(password, 10)
  console.log("Password:", password)
  console.log("BCrypt hash:", hash)
}

generateHash()
