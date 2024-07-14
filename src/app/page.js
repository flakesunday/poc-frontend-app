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
    // tranFormObjectToFormData(values);
    axios({
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/product/createCustomer`,
      data: tranFormObjectToFormData(values),
    });
  };
  React.useEffect(() => {
    const apiUrl = "http://localhost:8000";
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/product/getOrder`,
    };

    axios(config)
      .then((orders) => {
        console.log(orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const tranFormObjectToFormData = (obj) => {
    console.log("obj", obj);
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
      if (key === "file") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    return formData;
  };
  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center ">
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
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
            <input {...register("idCardNumber")} className="block text-black" />
          </div>
          <div>
            <h3>phoneNumber</h3>
            <input {...register("phoneNumber")} className="block text-black" />
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
            <h3>files</h3>
            <input
              {...register("file")}
              className="block text-white"
              type="file"
            />
          </div>

          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
