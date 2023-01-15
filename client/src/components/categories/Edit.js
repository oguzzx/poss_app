import { Button, Form, Input, message, Modal, Table } from "antd";
import React, { useState } from "react";

function Edit({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: {
          "Content-Type": "application/json",
          charset: "UTF-8",
        },
      });
      message.success("Kategori Başarıyla Güncellendi");
      setCategories(
        categories.map((item) =>
          item._id === editingRow._id ? { ...item, title: values.title } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category", {
        method: "DELETE",
        body: JSON.stringify({ categoryId: id }),
        headers: {
          "Content-Type": "application/json",
          charset: "UTF-8",
        },
      });
      message.success("Kategori Başarıyla Silindi");
      setCategories(categories.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name={"title"}>
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return record.title;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex">
            <Button
              type="link"
              onClick={() => setEditingRow(record)}
              className="pl-0"
            >
              Düzenle
            </Button>
            <Button type="link" htmlType="submit" className="text-green-500">
              Kaydet
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      open={isEditModalOpen}
      title="Kategori İşlemleri"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
}

export default Edit;
