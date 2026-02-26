export default function DataTable({
  columns = [],
  data = [],
  onRowClick,
  className = "",
  emptyMessage = "Tidak ada data",
}) {
  const safeData = Array.isArray(data) ? data : [];
  const safeColumns = Array.isArray(columns) ? columns : [];

  return (
    <div
      className={`bg-dark-surface border border-dark-border rounded-lg overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border bg-dark-bg">
              {safeColumns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {safeData.length > 0 ? (
              safeData.map((row, index) => (
                <tr
                  key={row?._id || index}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-dark-border hover:bg-dark-bg transition-colors ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                >
                  {safeColumns.map((column) => {
                    const cellValue = row?.[column.key];

                    return (
                      <td
                        key={`${row?._id || index}-${column.key}`}
                        className="px-6 py-4 text-sm text-gray-300"
                      >
                        {column.render
                          ? column.render(cellValue, row)
                          : (cellValue ?? "-")}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={safeColumns.length}
                  className="text-center py-8 text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
