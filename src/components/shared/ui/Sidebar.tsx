import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { links } from '@data/dummy';
import { toggleMenu } from '@store/activeMenuSlice';
import { useAppDispatch, useAppSelector } from '@store/typehook';

const Sidebar = () => {
  const { isMenuActive } = useAppSelector((state) => state.activeMenuSlice);
  const dispatch = useAppDispatch();

  return (
    <>
      {isMenuActive && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={() => dispatch(toggleMenu())}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-secondary-dark-bg z-50 overflow-auto pb-10 transition-transform duration-300 ease-in-out ${
          isMenuActive ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto w-72`}
      >
        <div className="flex justify-between items-center px-4 py-5">
          <Link
            to="/"
            onClick={() => dispatch(toggleMenu())}
            className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            <SiShopware /> <span>Shoppy</span>
          </Link>
          <button
            type="button"
            onClick={() => dispatch(toggleMenu())}
            className="text-xl rounded-full p-3 hover:bg-light-gray lg:hidden"
          >
            <MdOutlineCancel />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="mt-10">
          {links.map((item) => (
            <div key={item.title}>
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                {item.title}
              </p>
              {item.links.map((link) => (
                <NavLink
                  to={`/${link.name}`}
                  key={link.name}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      dispatch(toggleMenu());
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 pl-4 py-3 mx-3 rounded-lg text-base transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white font-medium'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
