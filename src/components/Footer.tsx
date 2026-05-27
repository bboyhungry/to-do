import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';

function Footer() {
  return (
    <footer className="py-6 flex flex-col items-center gap-3">
      <div className="flex items-center gap-4">
        <a href="https://github.com/bboyhungry" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition">
          <FaGithub size={18} />
        </a>
        <a href="https://linkedin.com/in/henry-dang-dev891" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition">
          <FaLinkedin size={18} />
        </a>
        <a href="https://instagram.com/sodanghungry" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition">
          <FaInstagram size={18} />
        </a>
        <a href="https://bboyhungry.github.io/portfolio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition">
          <TbWorld size={18} />
        </a>
      </div>
      <p className="text-xs text-gray-400">© 2026 Henry Dang</p>
    </footer>
  );
}

export default Footer;