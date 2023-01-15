import { Button, Form, Input, message, Modal, Select } from "antd";
import React from "react";

function Add({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setProducts,
  products,
}) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          charset: "UTF-8",
        },
      });
      message.success("Ürün Başarıyla Eklendi");
      form.resetFields();
      setIsAddModalOpen(false);
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Ürün Adı"
          rules={[{ required: true, message: "Ürün Adı Alanı Boş Geçilemez" }]}
        >
          <Input placeholder="Ürün adı giriniz." />
        </Form.Item>
        <Form.Item
          name="img"
          label="Ürün Görseli"
          rules={[
            { required: true, message: "Ürün Görseli Alanı Boş Geçilemez" },
          ]}
        >
          <Input placeholder="Ürün görselini giriniz." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Ürün Fiyatı"
          rules={[
            { required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez" },
          ]}
        >
          <Input placeholder="Ürün fiyatını giriniz." />
        </Form.Item>
        <Form.Item
          name="category"
          label="Kategori Seçiniz"
          rules={[{ required: true, message: "Kategori Alanı Boş Geçilemez" }]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={
              categories?.map((item) => ({
                value: item.title,
                title: item.title.toLowerCase(),
              })) ?? []
            }
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Add;
