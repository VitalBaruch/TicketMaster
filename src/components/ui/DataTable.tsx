type Column = {
  key: string;
  header: string;
};

type Row = Record<string, React.ReactNode>;

export function DataTable({
  columns,
  rows,
  caption,
  id,
}: {
  columns: Column[];
  rows: Row[];
  caption?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60"
    >
      <table className="min-w-full text-sm">
        {caption && (
          <caption className="text-left px-4 pt-3 pb-1 text-xs text-slate-400">
            {caption}
          </caption>
        )}
        <thead className="text-xs uppercase text-slate-400">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 text-right">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-slate-200">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
