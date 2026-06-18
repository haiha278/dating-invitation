"use client";

type TimeModalProps = {
  hour: number;
  minute: number;
  period: "AM" | "PM";
  onChangeHour: (hour: number) => void;
  onChangeMinute: (minute: number) => void;
  onChangePeriod: (period: "AM" | "PM") => void;
  onClose: () => void;
};

export default function TimeModal({
  hour,
  minute,
  period,
  onChangeHour,
  onChangeMinute,
  onChangePeriod,
  onClose,
}: TimeModalProps) {
  const hours = Array.from({ length: 12 }, (_, index) => index + 1);
  const minutes = Array.from({ length: 60 }, (_, index) => index);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-md rounded-[28px] bg-gray-700/80 p-6 text-white shadow-2xl backdrop-blur-md">
        <div className="relative flex h-72 items-center justify-center gap-8 overflow-hidden">
          <div className="absolute left-0 right-0 top-1/2 h-12 -translate-y-1/2 rounded-full bg-white/10" />

          <select
            value={hour}
            onChange={(e) => onChangeHour(Number(e.target.value))}
            className="relative z-10 h-60 bg-transparent text-center text-4xl font-semibold outline-none"
          >
            {hours.map((item) => (
              <option key={item} value={item} className="text-black">
                {item}
              </option>
            ))}
          </select>

          <select
            value={minute}
            onChange={(e) => onChangeMinute(Number(e.target.value))}
            className="relative z-10 h-60 bg-transparent text-center text-4xl font-semibold outline-none"
          >
            {minutes.map((item) => (
              <option key={item} value={item} className="text-black">
                {item.toString().padStart(2, "0")}
              </option>
            ))}
          </select>

          <select
            value={period}
            onChange={(e) => onChangePeriod(e.target.value as "AM" | "PM")}
            className="relative z-10 h-60 bg-transparent text-center text-4xl font-semibold outline-none"
          >
            <option value="AM" className="text-black">
              AM
            </option>

            <option value="PM" className="text-black">
              PM
            </option>
          </select>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onChangeHour(6);
              onChangeMinute(0);
              onChangePeriod("PM");
            }}
            className="rounded-full bg-black/30 px-8 py-3 text-xl font-bold text-white cursor-pointer"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-3xl text-white shadow-lg cursor-pointer"
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  );
}