
export default function FinishButton({
  text,
  onClick,
}: {
  text: string;
  onClick: Function;
}) {
  return (
    <button
      className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
