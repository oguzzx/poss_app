import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const user = await res.json();
      if (res.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );

        setTimeout(() => {
          setLoading(false);
          message.success("Giriş Başarılı");
          navigate("/");
        }, 1000);
      } else if (res.status === 400) {
        setTimeout(() => {
          setLoading(false);
          message.error("Giriş Başarısız.Kullanıcı Bulunamadı");
        }, 1000);
      }
    } catch (error) {
      message.error("Kayıt Başarısız.Bir Terslik Oluştu");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="px-10 xl:px-20 flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
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

            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Remember me</Checkbox>
                <Link>Forgot Password?</Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henüz bir hesabınız yok mu?{" "}
            <Link to="/register" className="text-blue-500">
              Şimdi kaydol
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

export default Login;
