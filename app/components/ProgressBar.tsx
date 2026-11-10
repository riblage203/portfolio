export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full max-w-md">
      <p id="progress-label" className="mb-2 text-sm font-bold tracking-widest uppercase">
        Avancement : <span className="text-hazard">{value}%</span>
      </p>
      <div
        role="progressbar"
        aria-labelledby="progress-label"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-6 w-full overflow-hidden rounded-sm border-2 border-hazard bg-asphalt/80"
      >
        <div className="progress-stripes h-full border-r-2 border-hazard" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
