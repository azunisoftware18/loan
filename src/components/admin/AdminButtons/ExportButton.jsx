import { Download } from "lucide-react";

const ExportButton = ({
  label = "Export",
  onClick,
  loading = false,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center gap-2
        bg-blue-600 text-white
        px-5 py-2.5
        rounded-xl
        font-medium
        shadow-sm
        hover:bg-blue-700
        transition-all
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      <Download size={18} />
      {loading ? "Exporting..." : label}
    </button>
  );
};

export default ExportButton; 