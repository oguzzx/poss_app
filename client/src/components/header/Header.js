import React from "react";
import { Badge, Input, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ setSearch }) {
  const { pathname } = useLocation();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    message.success("Çıkış Yapıldı");
    navigate("/login");
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <a href="/">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </a>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input
            size="large"
            placeholder="Ürün ara"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            onClick={() => {
              if (pathname !== "/") {
                navigate("/");
              }
            }}
          />
        </div>
        <div className="menu-links flex justify-between items-center gap-7 mr-1 md:static fixed z-50 bottom-0 md:w-auto w-screen bg-white md:bg-transparent left-0 md:border-t-0 border-t md:px-0 px-4 py-1">
          <Link
            to="/"
            className={`menu-link flex flex-col hover:text-[#40a9ff] transition-all ${
              pathname === "/" && "text-[#40a9ff]"
            }`}
          >
            <HomeOutlined className="text-xl md:text-2xl " />
            <span className="md:text-xs text-xl">Ana Sayfa</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 0]}
            className="md:flex hidden"
          >
            <Link
              to="/cart"
              className={`menu-link flex flex-col hover:text-[#40a9ff] transition-all ${
                pathname === "/cart" && "text-[#40a9ff]"
              }`}
            >
              <ShoppingCartOutlined className="text-xl md:text-2xl " />
              <span className="md:text-xs text-xl">Sepet</span>
            </Link>
          </Badge>
          <Link
            to="/bills"
            className={`menu-link flex flex-col hover:text-[#40a9ff] transition-all ${
              pathname === "/bills" && "text-[#40a9ff]"
            }`}
          >
            <CopyOutlined className="text-xl md:text-2xl " />
            <span className="md:text-xs text-xl">Faturalar</span>
          </Link>
          <Link
            to="/customers"
            className={`menu-link flex flex-col hover:text-[#40a9ff] transition-all ${
              pathname === "/customers" && "text-[#40a9ff]"
            }`}
          >
            <UserOutlined className="text-xl md:text-2xl " />
            <span className="md:text-xs text-xl">Müşteriler</span>
          </Link>
          <Link
            to="/statistics"
            className={`menu-link flex flex-col hover:text-[#40a9ff] transition-all ${
              pathname === "/statistics" && "text-[#40a9ff]"
            }`}
          >
            <BarChartOutlined className="text-xl md:text-2xl " />
            <span className="md:text-xs text-xl">İstatistikler</span>
          </Link>
          <div onClick={logOut}>
            <Link
              to="/register"
              className={
                "menu-link flex flex-col hover:text-[#40a9ff] transition-all"
              }
            >
              <LogoutOutlined className="text-xl md:text-2xl " />
              <span className="md:text-xs text-xl">Çıkış</span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
          <Link
            to="/"
            className="menu-link flex flex-col hover:text-[#40a9ff] transition-all"
          >
            <ShoppingCartOutlined className="text-2xl " />
            <span className="md:text-xs text-xl">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
}

export default Header;
