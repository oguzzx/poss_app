import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";

function CreateBill({ isModal, clickModal, setIsModal }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onFinish = async(values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: cart.total * (cart.tax / 100),
          totalAmount: cart.total + cart.total * (cart.tax / 100),
          cartItems: cart.cartItems,
        }),
        headers: {
          "Content-Type": "application/json ; charset=UTF-8",
        },
      });
      if (res.status === 200) {
        clickModal();
        setIsModal(false);
        message.success("Fatura Oluşturuldu");
        dispatch(reset());
        navigate('/bills')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        title="Fatura Oluştur"
        open={isModal}
        footer={false}
        onCancel={() => clickModal()}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Müşteri Adı"
            name={"customerName"}
            rules={[
              { required: true, message: "Müşteri adı alanı boş geçilemez" },
            ]}
          >
            <Input placeholder="Müşteri Adını Giriniz" />
          </Form.Item>
          <Form.Item
            label="Telefon Numarası"
            name={"customerPhoneNumber"}
            rules={[
              {
                required: true,
                message: "Telefon numarası kısmı boş geçilemez",
              },
            ]}
          >
            <Input placeholder="Telefon Numarası Giriniz" maxLength={11} />
          </Form.Item>
          <Form.Item
            label="Ödeme Yöntemi"
            name={"paymentMode"}
            rules={[
              { required: true, message: "Ödeme yöntemi kısmı boş geçilemez" },
            ]}
          >
            <Select placeholder="Ödeme Yöntemi Seçiniz">
              <Select.Option value="Nakit">Nakit</Select.Option>
              <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>

          <Card className="">
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
            <div className="flex justify-end">
              <Button
                className="mt-4"
                type="primary"
                onClick={() => setIsModal(true)}
                htmlType="submit"
              >
                Sipariş Oluştur
              </Button>
            </div>
          </Card>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateBill;
