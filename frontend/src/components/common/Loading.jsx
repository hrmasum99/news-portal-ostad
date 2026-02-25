const Loading = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-dark-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="spinner mx-auto mb-4"></div>
        <p className="text-dark-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;