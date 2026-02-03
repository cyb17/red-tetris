export default function Button({ name, type, onClick }) {
  return (
    <button
      className="w-50 sm:w-60 h-12 border border-[#888888] bg-[#b2b1b1] text-white font-bold text-xl"
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
