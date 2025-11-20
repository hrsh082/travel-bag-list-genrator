import { decodeTrip } from "@/utils/share";

interface SharePageProps {
  params: { token: string };
}

export default function SharedChecklistPage({ params }: SharePageProps) {
  const { token } = params;

  try {
    const checklist = decodeTrip(token);

    return (
      <div className="space-y-6">
        <div className="card space-y-2">
          <p className="pill w-fit">Shared checklist</p>
          <h1 className="text-3xl font-semibold text-[var(--text-primary)]">{checklist.destination}</h1>
          <p className="text-sm text-slate-500">
            {checklist.days} days · {checklist.tripType} · {checklist.weather} · {checklist.travelMode}
          </p>
        </div>
        <div className="grid gap-4">
          {checklist.categories.map((category) => (
            <div key={category.title} className="card space-y-2">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">{category.title}</h2>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {category.items.map((item, index) => (
                  <li key={`${category.title}-${index}`} className="flex items-center gap-2">
                    <span className="text-[var(--brand-primary)]">•</span>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  } catch {
    return (
      <div className="card text-center">
        <h1 className="text-2xl font-semibold text-red-500">Link expired or invalid</h1>
        <p className="text-sm text-slate-500">Please ask the creator to generate a new share link from the checklist page.</p>
      </div>
    );
  }
}

