import type { User } from "../types/User"

interface UserListProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (id: string) => void
}

export default function UserList({ users, onEdit, onDelete }: UserListProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-medium">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => onEdit(user)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

