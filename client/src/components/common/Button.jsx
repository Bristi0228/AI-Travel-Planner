function Button({
  children,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;