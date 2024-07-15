"use client";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (values) => {
    const apiUrl = "http://localhost:8000";
    console.log(values);
    const productValue = {
      product_code: values["product_code"] || "",
      product_name: values["product_name"],
      category_id: values["category_id"],
      detail: values["detail"],
      blemishes: values["blemishes"],
      size: values["size"],
      num_all: values["num_all"],
      status: values["status"],
      cost_price: values["cost_price"],
      sum_price: values["sum_price"],
      barcode: values["barcode"],
      files: values["files"],
    };
    const customerValue = {
      fullName: values["fullName"],
      idCardNumber: values["idCardNumber"],
      phoneNumber: values["phoneNumber"],
      address: values["address"],
      file: values["file"],
    };
    console.log("customer", customerValue, "product", productValue);
    // tranFormObjectToFormData(values);
    axios({
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/product/createCustomer`,
      data: tranFormObjectToFormData(customerValue),
    });

    axios({
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/product/createProduct`,
      data: tranFormObjectToFormData(productValue),
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
  // React.useEffect(() => {
  //   const apiUrl = "http://localhost:8000";
  //   const config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: `${apiUrl}/api/product/getOrder`,
  //   };

  //   axios(config)
  //     .then((orders) => {
  //       console.log(orders);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const tranFormObjectToFormData = (obj) => {
    console.log("obj", obj);
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      if (key === "files") {
        Object.entries(value).forEach(([item, file], index) => {
          formData.append(`${key}[]`, file);
        });

        // console.log("item", value.item());
        // console.log(value.item(2));
      } else if (key === "file") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  };
  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center ">
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <div>
            <h1>Customer</h1>
            <div>
              <h3>fullName</h3>
              <input
                {...register("fullName")}
                className="block text-black"
                type="text"
              />
            </div>
            <div>
              <h3>idCardNumber</h3>
              <input
                {...register("idCardNumber")}
                className="block text-black"
              />
            </div>
            <div>
              <h3>phoneNumber</h3>
              <input
                {...register("phoneNumber")}
                className="block text-black"
              />
            </div>
            <div>
              <h3>lastname</h3>
              <input {...register("lastname")} className="block text-black" />
            </div>
            <div>
              <h3>address</h3>
              <input {...register("address")} className="block text-black" />
            </div>
            <div>
              <h3>file</h3>
              <input
                {...register("file")}
                className="block text-white"
                type="file"
              />
            </div>
          </div>
          <div className="mt-[20px]">
            <h1>Product</h1>
            <div>
              <h3>product_code</h3>
              <input
                {...register("product_code")}
                className="block text-black"
                type="text"
              />
            </div>
            <div>
              <h3>product_name</h3>
              <input
                {...register("product_name")}
                className="block text-black"
              />
            </div>
            <div>
              <h3>category_id</h3>
              <input
                {...register("category_id")}
                className="block text-black"
              />
            </div>
            <div>
              <h3>detail</h3>
              <input {...register("detail")} className="block text-black" />
            </div>
            <div>
              <h3>blemishes</h3>
              <input {...register("blemishes")} className="block text-black" />
            </div>
            <div>
              <h3>size</h3>
              <input {...register("size")} className="block text-black" />
            </div>
            <div>
              <h3>num_all</h3>
              <input {...register("num_all")} className="block text-black" />
            </div>
            <div>
              <h3>status</h3>
              <input {...register("status")} className="block text-black" />
            </div>
            <div>
              <h3>cost_price</h3>
              <input {...register("cost_price")} className="block text-black" />
            </div>
            <div>
              <h3>sum_price</h3>
              <input {...register("sum_price")} className="block text-black" />
            </div>
            <div>
              <h3>barcode</h3>
              <input {...register("barcode")} className="block text-black" />
            </div>
            <div>
              <h3>files</h3>
              <input
                {...register("files")}
                className="block text-white"
                type="file"
                multiple
              />
            </div>
          </div>

          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
