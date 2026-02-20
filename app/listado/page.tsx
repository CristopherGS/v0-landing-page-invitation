import { getRSVPs } from "@/lib/rsvp-store";

export const dynamic = "force-dynamic";

export default async function ListadoPage() {
  const records = await getRSVPs();
  const sorted = [...records].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <main className="min-h-screen bg-[#0a1628] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif mb-2">Listado de Personas</h1>
        <p className="text-white/70 mb-8">Total registrados: {sorted.length}</p>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10 text-left">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Telefono</th>
                <th className="p-3">Asistencia</th>
                <th className="p-3">Familiar de</th>
                <th className="p-3">Mensaje</th>
                <th className="p-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((item) => (
                <tr key={item.id} className="border-t border-white/10">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3">{item.attendance === "yes" ? "Si" : "No"}</td>
                  <td className="p-3">{item.family === "bride" ? "Novia" : "Novio"}</td>
                  <td className="p-3">{item.message || "-"}</td>
                  <td className="p-3">{new Date(item.createdAt).toLocaleString("es-GT")}</td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td className="p-6 text-white/60" colSpan={6}>
                    Aun no hay personas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
