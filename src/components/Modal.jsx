const Modal = ({ isOpen, onClose, title, message, type = 'info' }) => {
    if (!isOpen) return null;
  
    const colors = {
      success: 'border-green-500 bg-green-50',
      error: 'border-red-500 bg-red-50',
      info: 'border-blue-500 bg-blue-50'
    };
  
    const icons = {
      success: '✅',
      error: '❌',
      info: 'ℹ️'
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className={`max-w-md w-full rounded-xl border ${colors[type]} p-6 shadow-lg`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{icons[type]}</span>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
          
          <p className="text-gray-700 mb-6">{message}</p>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Ок
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;