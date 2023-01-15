import { Button, Card, Input, message, Popconfirm, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateBill from "../components/cart/CreateBill";
import Header from "../components/header/Header";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { deleteProduct, decrease, increase } from "../redux/cartSlice";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

function CartPage() {
  const [isModal, setIsModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const clickModal = () => {
    if (isModal === true) {
      setIsModal(false);
    }
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      render: (img) => (
        <img src={img} alt="" className="w-20 h-20 object-cover" />
      ),
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Katagori",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toFixed(2)}₺</span>,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <div className="flex items-center gap-x-2">
          <Button
            type="primary"
            size="small"
            className="w-full  flex items-center justify-center !rounded-full"
            icon={<PlusCircleOutlined />}
            onClick={() => dispatch(increase(record))}
          />
          <span className="font-bold"> {record.quantity}</span>
          <Button
            type="primary"
            size="small"
            className="w-full  flex items-center justify-center !rounded-full"
            icon={<MinusCircleOutlined />}
            onClick={() => {
              if (record.quantity === 1) {
                if (
                  window.confirm(
                    "Ürünü sepetten silmek istediğinize emin misiniz?"
                  )
                ) {
                  dispatch(deleteProduct(record));
                  message.success("Ürün sepetten silindi");
                }
              }
              if (record.quantity > 1) {
                dispatch(decrease(record));
              }
            }}
          />
        </div>
      ),
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "price",
      key: "price",
      render: (price, record) => (
        <span>{(price * record.quantity).toFixed(2)}₺</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actions, record) => (
        <Popconfirm
          title="Ürünü sepetten silmek istediğinize emin misiniz?"
          onConfirm={() => {
            dispatch(deleteProduct(record));
            message.success("Ürün sepetten silindi");
          }}
          okText="Evet"
          cancelText="Hayır"
        >
          <Button type="primary" danger size="small">
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="overflow-y-scroll h-screen">
      <Header />
      <div className="px-6">
        <Table
          columns={columns}
          dataSource={cart.cartItems}
          bordered
          pagination={false}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72 ">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV %{cart.tax}</span>
              <span className="text-red-600">
                {cart.total > 0
                  ? (cart.total * (cart.tax / 100)).toFixed(2)
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <b>
                {cart.total > 0 &&
                  (cart.total + cart.total * (cart.tax / 100)).toFixed(2)}
                ₺
              </b>
            </div>
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              disabled={cart.cartItems.length === 0}
              onClick={() => setIsModal(true)}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill
        isModal={isModal}
        setIsModal={setIsModal}
        clickModal={clickModal}
      />
    </div>
  );
}

export default CartPage;
