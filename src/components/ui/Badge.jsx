function Badge({ number, dataTestid }) {
  return (
    <div
      className="py-1 px-2 text-xs font-bold bg-orange-500 rounded-full"
      data-testid={dataTestid}
    >
      {number}
    </div>
  );
}

export default Badge;
