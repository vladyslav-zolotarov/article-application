import { twMerge } from "tailwind-merge";
import { HTMLProps } from "react";
import Search from "../../components/Header/Search/Search";
import DarkModeToggler from "../../components/Header/DarkModeToggler/DarkModeToggler";
import MenuSettings from "../../components/Header/MenuSettings/MenuSettings";
import Navbar from "../../components/Header/Navbar/Navbar";

export interface HeaderProps extends HTMLProps<HTMLDivElement> {
  containerProps?: HTMLProps<HTMLDivElement>;
  navbarProps?: HTMLProps<HTMLDivElement>;
  searchProps?: HTMLProps<HTMLDivElement>;
  darkModeTogglerProps?: HTMLProps<HTMLDivElement>;
  menuSettingsProps?: HTMLProps<HTMLDivElement>;
}

const Header = ({
  containerProps = {},
  navbarProps = {},
  searchProps = {},
  darkModeTogglerProps = {},
  menuSettingsProps = {},
  ...props
}: HeaderProps) => {
  return (
    <header
      {...props}
      className={twMerge(
        "border-b border-gray-200 dark:border-gray-600 bg-white px-2 py-2.5 dark:bg-gray-900",
        props.className
      )}
    >
      <div
        {...containerProps}
        className={twMerge(
          "container flex flex-wrap items-center justify-between max-w-7xl mx-auto",
          containerProps.className
        )}
      >
        <Navbar {...navbarProps} />
        <Search {...searchProps} />
        <div className="flex">
          <DarkModeToggler {...darkModeTogglerProps} />
          <MenuSettings {...menuSettingsProps} />
        </div>
      </div>
    </header>
  );
};

export default Header;
