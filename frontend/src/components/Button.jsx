export default function Button({ name, type, onClick }) {
  return (
    <button
      className="w-38 sm:w-50 h-12 border border-[#888888] bg-[#b2b1b1] text-white font-bold text-base md:text-xl"
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
