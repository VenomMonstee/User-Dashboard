import { useState, useEffect } from "react"
import type { User } from "../types/User"

interface UserFormProps {
  onSubmit: (user: User | Omit<User, "id">) => void
  initialData?: User | null
  onCancel: () => void
}

export default function UserForm({ onSubmit, initialData, onCancel }: UserFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setEmail(initialData.email)
    } else {
      setName("")
      setEmail("")
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const userData = initialData ? { ...initialData, name, email } : { name, email }
    onSubmit(userData)
    setName("")
    setEmail("")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{initialData ? "Edit User" : "Create User"}</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  )
}

