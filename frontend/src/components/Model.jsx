const Model = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-600 to-slate-900">
            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-500 p-4 rounded-lg z-10 text-right">
              <button
                className="text-slate-700 font-semibold hover:text-gray-700 focus:outline-none mr-2"
                onClick={onClose}
              >
                X
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Model;
