import { PillProps } from "@/interfaces";

export default function Pill({ label, onClick, className }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-full text-sm transition ${className}`}
    >
      {label}
    </button>
  );
}
// export default function Pill({ label, onClick }: PillProps) {
//   return (
//     <button
//       onClick={onClick}
//       className="px-4 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
//     >
//       {label}
//     </button>
//   );
// }
