import { site } from '../config/site';

type AreaChipsProps = {
  note?: boolean;
};

export function AreaChips({ note = true }: AreaChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {site.areas.map((area) => (
        <span
          key={area}
          className="inline-flex items-center rounded-full border border-brand-500 bg-brand-50 px-3 py-1 text-xs text-brand-700 shadow-sm"
        >
          {area}
        </span>
      ))}
      {note ? (
        <span className="inline-flex items-center rounded-full border border-brand-500 bg-brand-50 px-3 py-1 text-xs text-brand-700 shadow-sm">
          {site.areasNote}
        </span>
      ) : null}
    </div>
  );
}

export default AreaChips;


