import { NextResponse } from "next/server"
import type { User } from "../../../../types/User"

let users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
]

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedUser: User = await request.json()
  users = users.map((user) => (user.id === params.id ? updatedUser : user))
  return NextResponse.json(updatedUser)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  users = users.filter((user) => user.id !== params.id)
  return new NextResponse(null, { status: 204 })
}

