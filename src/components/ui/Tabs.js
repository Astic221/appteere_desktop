export function Tabs({ children }) {
    return (
      <div className="flex border-b border-gray-200 space-x-4 p-2">
        {children}
      </div>
    );
  }
  
  export function Tab({ active, children, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`py-2 px-4 font-medium ${
          active ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
        }`}
      >
        {children}
      </button>
    );
  }
  