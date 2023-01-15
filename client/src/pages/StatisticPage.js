import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import StatisticCard from "../components/statistics/StatisticCard";
import { Area } from "@ant-design/plots";
import { Pie } from "@ant-design/plots";
import { Spin } from "antd";

function StatisticPage() {
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data: data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nDeğer",
      },
    },
  };

  const totalAmount = () => {
    let total = 0;
    data.forEach((item) => {
      total += item.totalAmount;
    });
    return total + " TL";
  };

  return (
    <>
      <Header />
      {data ? (
        <div className="px-6 pb-20">
          <h1 className="text-4xl font-bold text-center mb-4">
            İstatistiklerim
          </h1>
          <div className="statistic-section">
            <h2 className="text-xl">
              Hoş geldin{" "}
              <span className="text-green-700 font-bold text-xl">
                {user?.username}
              </span>
            </h2>
            <div className="statistic-cards grid grid-cols-4 my-10 gap-10">
              <StatisticCard
                title={"Toplam Müşteri"}
                amount={data?.length}
                img={"images/user.png"}
              />
              <StatisticCard
                title={"Toplam Kazanç"}
                amount={totalAmount()}
                img={"images/money.png"}
              />
              <StatisticCard
                title={"Toplam Satış"}
                amount={data?.length}
                img={"images/sale.png"}
              />
              <StatisticCard
                title={"Toplam Ürün"}
                amount={products?.length}
                img={"images/product.png"}
              />
            </div>
            <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
              <div className="lg:w-1/2 lg:h-full h-72">
                <Area {...config} height={200} />
              </div>
              <div className="lg:w-1/2 lg:h-full h-72">
                <Pie {...config2} height={200} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  );
}

export default StatisticPage;
