export default function SummaryCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-6 hover:border-primary-500 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
          {trend && (
            <p className={`text-xs mt-2 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% dari hari kemarin
            </p>
          )}
        </div>
        {Icon && (
          <div className="bg-primary-600 bg-opacity-20 p-3 rounded-lg">
            <Icon size={24} className="text-primary-400" />
          </div>
        )}
      </div>
    </div>
  )
}
