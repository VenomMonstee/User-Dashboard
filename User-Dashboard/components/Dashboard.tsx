"use client"

import { useState, useEffect } from "react"
import UserList from "./UserList"
import UserForm from "./UserForm"
import type { User } from "../types/User"

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleCreateUser = async (user: Omit<User, "id">) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
      const newUser = await response.json()
      setUsers([...users, newUser])
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  const handleUpdateUser = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
      const updatedUser = await response.json()
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
      setEditingUser(null)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      await fetch(`/api/users/${id}`, { method: "DELETE" })
      setUsers(users.filter((user) => user.id !== id))
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <UserList users={users} onEdit={setEditingUser} onDelete={handleDeleteUser} />
      <UserForm
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
        initialData={editingUser}
        onCancel={() => setEditingUser(null)}
      />
    </div>
  )
}

