import { Button, Carousel, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      if (res.status === 200) {
        setTimeout(() => {
          setLoading(false);
          message.success("Kayıt Başarılı");
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      message.error("Kayıt Başarısız.Bir Terslik Oluştu");
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="px-10 xl:px-20 flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullanıcı Adı"
              name={"username"}
              rules={[
                { required: true, message: "Kullanıcı Alanı Boş Bırakılamaz" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                { required: true, message: "E-mail Alanı Boş Bırakılamaz" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                { required: true, message: "Şifre Alanı Boş Bırakılamaz" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Şifre Tekrar"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Şifre Tekrar Alanı Boş Bırakılamaz",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Şifreler Eşleşmiyor"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir hesabınız mı var?{" "}
            <Link to="/login" className="text-blue-500">
              Şimdi giriş yap
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 min-w-[800px] bg-[#6c63ff]">
          <div className="w-full">
            <Carousel autoplay>
              <AuthCarousel
                img={"/images/responsive.svg"}
                title={"Responsive"}
                description={"Tüm Cihaz Boyutlarıyla Uyumluluk Gösterir"}
              />
              <AuthCarousel
                img={"/images/statistic.svg"}
                title={"İstatistikler"}
                description={"Geniş Tutulan İstatistikler"}
              />
              <AuthCarousel
                img={"/images/customer.svg"}
                title={"Müşteri Memnuniyeti"}
                description={"Müşterilerimize En İyi Hizmeti Sunuyoruz"}
              />
              <AuthCarousel
                img={"/images/admin.svg"}
                title={"Yönetim Paneli"}
                description={"Tek Tıkla Yönetim Paneline Ulaşın"}
              />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
