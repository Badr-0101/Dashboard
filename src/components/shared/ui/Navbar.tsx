import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft, BsMoon, BsSun } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import avatar from '@assets/images/avatar.jpg';
import { Button } from '@components/shared/ui/index';
import { toggleMenu } from '@store/activeMenuSlice';
import { toggleDarkMode } from '@store/themeSlice';
import { useAppDispatch, useAppSelector } from '@store/typehook';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.themeSlice);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="flex justify-between items-center p-2 md:mx-6 relative">
      <Button onClick={() => dispatch(toggleMenu())} className="lg:hidden">
        <AiOutlineMenu />
      </Button>

      <div className="flex items-center gap-2 md:gap-3 ml-auto">
        <Button className="relative rounded-md">
          <FiShoppingCart className="text-lg md:text-xl" />
        </Button>

        <Button className="hidden sm:block p-2 rounded-md ">
          <BsChatLeft />
        </Button>

        <Button className="p-2 rounded-md ">
          <RiNotification3Line />
        </Button>

        <Button
          onClick={toggleTheme}
          className="p-2 rounded-md  transition-all"
        >
          {isDarkMode ? <BsSun /> : <BsMoon />}
        </Button>

        <div className="flex justify-center items-center cursor-pointer hover:bg-light-gray dark:hover:text-black p-1 rounded-lg">
          <img
            src={avatar}
            className="rounded-full w-8 h-8 md:w-10 md:h-10 mr-2"
            alt="User avatar"
          />
          <div className="hidden md:block ">
            <p className="text-sm ">
              <span className="text-gray-400">Hi, </span>
              <span className="font-semibold ">Abdelrahman</span>
            </p>
          </div>
          <MdKeyboardArrowDown className="hidden md:block ml-1" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
