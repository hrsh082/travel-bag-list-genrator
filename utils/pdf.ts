import type { RowInput } from "jspdf-autotable";
import { TripChecklist } from "@/types/trip";

export const downloadChecklistPdf = async (trip: TripChecklist) => {
  const { default: jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;
  const doc = new jsPDF();
  const title = `Travel Checklist • ${trip.values.destination}`;

  doc.setFontSize(16);
  doc.text(title, 14, 18);

  doc.setFontSize(11);
  doc.text(
    `Days: ${trip.values.days} • Trip: ${trip.values.tripType} • Weather: ${trip.values.weather} • Mode: ${trip.values.travelMode}`,
    14,
    26
  );

  const rows: RowInput[] = trip.categories.flatMap((category) => [
    [
      {
        content: category.title,
        styles: {
          fillColor: [226, 232, 240],
          textColor: [15, 23, 42],
          fontStyle: "bold" as const,
        },
      },
      "",
    ],
    ...category.items.map((item) => [item.packed ? "☑" : "☐", item.name]),
  ]);

  autoTable(doc, {
    head: [["Packed", "Item"]],
    body: rows,
    startY: 34,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [14, 165, 233] },
  });

  doc.save(`${trip.values.destination}-checklist.pdf`);
};

