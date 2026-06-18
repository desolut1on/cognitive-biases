const Modal = ({ isOpen, onClose, title, message, type = 'info', buttonText = 'Ок' }) => {
  if (!isOpen) return null;

  const colors = {
    success: 'border-green-500 bg-green-100',
    error: 'border-red-500 bg-red-100',
    info: 'border-yellow-500 bg-yellow-50'
  };

  const icons = {
    success: '✅',
    error: '❌',
    info: '⚠️'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`max-w-md w-full rounded-xl border ${colors[type]} p-5 shadow-lg`}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{icons[type]}</span>
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <p className="text-gray-700 text-base leading-relaxed tracking-wide mb-4">
          {message}
        </p>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;