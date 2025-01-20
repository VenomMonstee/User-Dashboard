import { NextResponse } from "next/server"
import type { User } from "../../../types/User"

const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
]

export async function GET() {
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const user: Omit<User, "id"> = await request.json()
  const newUser: User = { ...user, id: Date.now().toString() }
  users.push(newUser)
  return NextResponse.json(newUser, { status: 201 })
}

