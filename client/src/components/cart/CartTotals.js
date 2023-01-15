import React from "react";
import { Button, message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  increase,
  decrease,
  reset,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function CartTotals() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart h-full max-h-[calc(100vh_-_120px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-2 pt-2 overflow-y-auto">
        {cart.cartItems.length > 0 ? (
          cart.cartItems.map((item) => (
            <li className="cart-item flex justify-between" key={item._id}>
              <div className="flex items-center cursor-pointer">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-14 h-14 object-cover"
                  onClick={() => {
                    dispatch(deleteProduct(item));
                    message.success("Ürün sepetten silindi");
                  }}
                />
                <div className="flex flex-col ml-2">
                  <b>{item.title}</b>
                  <span>
                    {item.price}₺ x {item.quantity}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <Button
                  type="primary"
                  size="small"
                  className="w-full  flex items-center justify-center !rounded-full"
                  icon={<PlusCircleOutlined />}
                  onClick={() => dispatch(increase(item))}
                />
                <span className="font-bold"> {item.quantity}</span>
                <Button
                  type="primary"
                  size="small"
                  className="w-full  flex items-center justify-center !rounded-full"
                  icon={<MinusCircleOutlined />}
                  onClick={() => {
                    if (item.quantity === 1) {
                      if (
                        window.confirm(
                          "Ürünü sepetten silmek istediğinize emin misiniz?"
                        )
                      ) {
                        dispatch(deleteProduct(item));
                        message.success("Ürün sepetten silindi");
                      }
                    }
                    if (item.quantity > 1) {
                      dispatch(decrease(item));
                    }
                  }}
                />
              </div>
            </li>
          ))
        ) : (
          <h1 className="font-bold flex justify-center">Sepet Boş </h1>
        )}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b ">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.total.toFixed(2)}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-700">
              +{((cart.total * cart.tax) / 100).toFixed(2)}₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-lg text-green-500">Genel Toplam</b>
            <span className="text-2xl">
              {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            type="primary"
            disabled={cart.cartItems.length === 0}
            size="large"
            className="w-full"
            onClick={() => {
              navigate("/cart");
            }}
          >
            Sipariş Oluştur
          </Button>
          <Button
            type="primary"
            danger
            disabled={cart.cartItems.length === 0}
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            icon={<ClearOutlined />}
            onClick={() => {
              if (
                window.confirm("Sepeti temizlemek istediğinize emin misiniz?")
              ) {
                dispatch(reset());
                message.success("Sepet temizlendi");
              }
            }}
          >
            Sepeti Temizle
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartTotals;
