import { Sun, Moon } from "lucide-react"; // assuming you're using lucide-react
import { useTheme } from "../context/ThemeContext"; // adjust path to your theme hook

const Navbar = () => {
  const theme = useTheme();

  return (
    <nav
      className={`${theme.colors.primary} ${theme.colors.border} border-b px-6 py-4 shadow-sm`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side: Logo + links */}
        <div className="flex items-center space-x-8">
          <div className={`${theme.colors.text} text-xl font-bold`}>
            LOGO
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {["HOME", "US", "GUIDE"].map((item) => (
              <button
                key={item}
                className={`${theme.colors.text} hover:text-blue-600 px-4 py-2 rounded-lg transition-colors font-medium`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Right side: Theme toggle + login */}
        <div className="flex items-center space-x-4">
          <button
            onClick={theme.toggleTheme}
            className={`${theme.colors.text} hover:text-blue-600 p-2 rounded-lg transition-colors`}
            aria-label="Toggle theme"
          >
            {theme.isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
            LOGIN
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
