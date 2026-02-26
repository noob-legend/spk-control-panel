export default function PriorityBadge({ level }) {
  const priorityConfig = {
    1: { label: 'Urgent', bgColor: 'bg-red-900', textColor: 'text-red-200', borderColor: 'border-red-700' },
    2: { label: 'Tinggi', bgColor: 'bg-orange-900', textColor: 'text-orange-200', borderColor: 'border-orange-700' },
    3: { label: 'Sedang', bgColor: 'bg-yellow-900', textColor: 'text-yellow-200', borderColor: 'border-yellow-700' },
    4: { label: 'Rendah', bgColor: 'bg-gray-700', textColor: 'text-gray-200', borderColor: 'border-gray-600' },
  }

  const config = priorityConfig[level] || priorityConfig[4]

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
    >
      {config.label}
    </span>
  )
}
