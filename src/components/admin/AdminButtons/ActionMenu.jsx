import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, Search } from "lucide-react";

const ActionMenu = ({
  items = [],
  icon = <MoreVertical className="w-4 h-4" />,
  buttonClassName = "",
  menuClassName = "",
  disabled = false,
  enableSearch = false,
  usePortal = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  /* ---------------- FILTER ---------------- */
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter(i =>
      i.label?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  /* ---------------- OPEN ---------------- */
  const openMenu = useCallback(() => {
    if (disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setCoords({
      top: rect.bottom + window.scrollY + 6,
      left: rect.right + window.scrollX - 240, // 240 = menu width
    });

    setIsOpen(true);
  }, [disabled]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setSearchTerm("");
    buttonRef.current?.focus();
  }, []);

  /* ---------------- OUTSIDE CLICK ---------------- */
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e) => {
      if (e.key === "Escape") closeMenu();
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", handler);
    };
  }, [isOpen, closeMenu]);

  /* ---------------- MENU ---------------- */
  const Menu = (
    <div
      ref={menuRef}
      role="menu"
      style={{ top: coords.top, left: coords.left }}
      className={`fixed w-60 bg-white border border-gray-200 rounded-xl shadow-2xl z-[9999] overflow-hidden ${menuClassName}`}
    >
      {enableSearch && (
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 w-3.5 h-3.5 text-gray-400" />
            <input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-7 pr-3 py-1.5 text-sm bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Search..."
            />
          </div>
        </div>
      )}

      <div className="py-1 max-h-72 overflow-y-auto">
        {filteredItems.length ? (
          filteredItems.map((item, i) => (
            <button
              key={i}
              disabled={item.disabled}
              onClick={() => {
                item.onClick?.();
                closeMenu();
              }}
              className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2
                ${item.danger ? "text-red-600 hover:bg-red-50" : "hover:bg-blue-50"}
                disabled:opacity-40`}
            >
              {item.icon}
              {item.label}
            </button>
          ))
        ) : (
          <div className="px-4 py-4 text-sm text-gray-400 text-center">
            No results found
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        disabled={disabled}
        className={`p-2 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 ${buttonClassName}`}
      >
        {icon}
      </button>

      {isOpen && (usePortal ? createPortal(Menu, document.body) : Menu)}
    </>
  );
};

export default ActionMenu;
