const Navbar = () => {
  return (
    <div className="h-[50px] flex items-center justify-between px-10 bg-[#F6F7F8] text-[14px]">
      <div className="flex space-x-6">
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Haqqımızda
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Dayanıqlı İnkişaf Hesabatları
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Tariflər
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Xəbərlər
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Satınalmalar
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Xidmət şəbəkəsi
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Araşdırma
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          İnvestorlarla əlaqə
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-700 hover:text-gray-900">Axtarış</button>
        <div className="flex items-center space-x-1">
          <span>AZ</span>
          <span className="text-gray-700">&#9662;</span>
        </div>
        <span className="text-gray-700">&#9742; 937</span>
      </div>
    </div>
  );
};

export default Navbar;
