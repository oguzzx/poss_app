import React, { useRef } from "react";
import { Button, Modal } from "antd";
import { useReactToPrint } from "react-to-print";

function PrintBill({ isModal, clickModal, customer }) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Modal
        title="Fatura Yazdır"
        open={isModal}
        footer={false}
        onCancel={() => clickModal()}
        width={800}
      >
        <section className="py-20 bg-black" ref={componentRef}>
          <div className="max-w-5xl mx-auto bg-white px-6">
            <article className="overflow-hidden">
              <div className="logo my-6">
                <h2 className="text-4xl font-bold text-slate-700">LOGO</h2>
              </div>
              <div className="bill-details">
                <div className="grid grid-cols-4 gap-12">
                  <div className="text-md text-slate-500">
                    <p className="font-bold text-slate-700">Fatura Detayı:</p>
                    <p>{customer?.customerName}</p>
                    <p>Unwrapped</p>
                    <p>Fake Street 123</p>
                    <p>San Javier</p>
                    <p>Ca 1234</p>
                  </div>
                  <div className="text-md text-slate-500">
                    <p className="font-bold text-slate-700">Fatura:</p>
                    <p>Unwrapped</p>
                    <p>Fake Street 123</p>
                    <p>San Javier</p>
                    <p>Ca 1234</p>
                  </div>
                  <div className="text-md text-slate-500">
                    <div>
                      <p className="font-bold text-slate-700">
                        Fatura Numarası:
                      </p>
                      <p>000{Math.floor(Math.random() * 150)}</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 mt-2">
                        Veriliş Tarihi:
                      </p>
                      <p>{customer?.createdAt.substring(0, 10)}</p>
                    </div>
                  </div>
                  <div className="text-md text-slate-500">
                    <div>
                      <p className="font-bold text-slate-700">Şartlar:</p>
                      <p>10 gün</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 mt-2">Vade:</p>
                      <p>14-12-2022</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bill-table-area mt-8">
                <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th
                        scope="col"
                        className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                      >
                        Görsel
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                      >
                        Başlık
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                      >
                        Fiyat
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                      >
                        Adet
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                      >
                        Toplam
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer?.cartItems.map((item) => (
                      <tr className="border-b border-slate-200">
                        <td className="py-4 pr-3">
                          <img
                            src={item.img}
                            alt="elma"
                            className="w-12 h-12 object-cover"
                          />
                        </td>
                        <td className="py-4 pr-3">
                          <span className="">{item.title}</span>
                        </td>
                        <td className="py-4 pr-3">
                          <span className="">{item.price}₺</span>
                        </td>
                        <td className="py-4 pr-3">
                          <span className="">{item.quantity}</span>
                        </td>
                        <td className="py-4 pr-3">
                          <span className="">
                            {item.price * item.quantity}₺
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th className="text-right pt-6" colSpan={3} scope="row">
                        <span className="font-normal pr-8 text-slate-700">
                          Ara Toplam
                        </span>
                      </th>
                      <th className="text-right pt-6 " scope="row">
                        <span className="font-normal  text-slate-700">
                          {customer?.subTotal}₺
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th className="text-right pt-4" colSpan={3} scope="row">
                        <span className="font-normal pr-8 text-slate-700">
                          KDV
                        </span>
                      </th>
                      <th className="text-right pt-4 " scope="row">
                        <span className="font-normal text-red-600 ">
                          +{customer?.tax}₺
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <th className="text-right pt-4" colSpan={3} scope="row">
                        <span className="font-normal pr-8 text-slate-700">
                          Total
                        </span>
                      </th>
                      <th className="text-right pt-6 " scope="row">
                        <span className="font-normal  text-slate-700">
                          {customer?.totalAmount}₺
                        </span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
                <div className="py-9">
                  <div className="border-t pt-9 border-slate-500">
                    <p className="text-sm font-light text-slate-700">
                      Ödeme koşulları 14 gündür. Paketlenmemiş borçların geç
                      ödenmesi durumunda, 1.5% gecikme faizi uygulanır.Ödeme
                      koşulları 14 gündür. Paketlenmemiş borçların geç ödenmesi
                      durumunda, 1.5% gecikme faizi uygulanır.Ödeme koşulları 14
                      gündür. Paketlenmemiş borçların geç ödenmesi durumunda,
                      1.5% gecikme faizi uygulanır.Ödeme koşulları 14 gündür.
                      Paketlenmemiş borçların geç ödenmesi durumunda, 1.5%
                      gecikme faizi uygulanır.Ödeme koşulları 14 gündür.
                      Paketlenmemiş borçların geç ödenmesi durumunda, 1.5%
                      gecikme faizi uygulanır.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
        <div className="flex justify-end mt-4">
          <Button type="primary" size="large" onClick={handlePrint}>
            Yazdır
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default PrintBill;
