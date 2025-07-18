import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { bookBaseUrl } from "../axiosInstance";

export const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
    Id: "",
  });

  const [booklist, setBookList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const getAllbookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("booklists");
      setBookList(data?.BookList);
      console.log("booklist", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllbookList();
  }, []);

  const handleFormCange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      if (!isUpdating) {
        if (
          !bookForm?.BookName ||
          !bookForm.BookTitle ||
          !bookForm.Author ||
          !bookForm.SellingPrice
        ) {
          alert("All field's are required");
        }

        const { data } = await bookBaseUrl.post("/addbook", bookForm);
        if (data?.Success) {
          alert(data?.Message);
          getAllbookList();
          setBookForm({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            PublishDate: "",
            Id: "",
          });
        }
      } else {
        const { data } = await bookBaseUrl.put("/updatebook", bookForm);
        if (data?.Success) {
          alert(data?.Message);
          getAllbookList();
          setBookForm({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            PublishDate: "",
            Id: "",
          });
          setIsUpdating(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await bookBaseUrl.post("deletebook", {
        Id: id,
      });
      if (data?.Success) {
        alert(data?.Message);
        getAllbookList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (data) => {
    setBookForm({
      BookName: data?.BookName,
      BookTitle: data?.BookTitle,
      Author: data?.Author,
      SellingPrice: data?.SellingPrice,
      PublishDate: data?.PublishDate,
      Id: data?._id,
    });
    setIsUpdating(true);
  };

  return (
    <div className="w-full px-5 min-h[calc(100vh-60px)]">
      <div className="w-full grid grid-cols-5 gap-3 ">
        <div className="w-full flex flex-col gap-2">
          <lebel htmlfor="">Book Name</lebel>
          <input
            type="text"
            placeholder="Book Name"
            className="w-full border-2 outline-none px-2  border-gray-300 rounded-sm outline-gray-500 h-8 text-gray-400"
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormCange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <lebel htmlfor="">Book Title</lebel>
          <input
            type="text"
            placeholder="Book Title"
            className="w-full border-2 outline-none px-2  border-gray-300 rounded-sm outline-gray-500 h-8 text-gray-400"
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormCange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <lebel htmlfor="">Author</lebel>
          <input
            type="text"
            placeholder="Author"
            className="w-full border-2 outline-none px-2  border-gray-300 rounded-sm outline-gray-500 h-8 text-gray-400"
            name="Author"
            value={bookForm.Author}
            onChange={handleFormCange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <lebel htmlfor="">Selling Price</lebel>
          <input
            type="text"
            placeholder="Selling Price"
            className="w-full border-2 outline-none px-2  border-gray-300 rounded-sm outline-gray-500 h-8 text-gray-400"
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormCange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <lebel htmlfor="">Publish Date</lebel>
          <input
            type="date"
            placeholder="Publish Date"
            className="w-full border-2 outline-none px-2  border-gray-300 rounded-sm outline-gray-500 h-8 text-gray-400"
            name="PublishDate"
            value={bookForm.PublishDate}
            onChange={handleFormCange}
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          className="bg-green-600 px-1 mt-1 text-white h-9 w-20 rounded-md cursor-pointer"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>
      <div className="w-full mt-10">
        <div className="w-full">
          <table className="w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Name
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Book Title
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Author
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  selling Price
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Publish Date
                </th>
                <th className="tracking-wider px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {booklist?.map((book, index) => {
                return (
                  <tr className="hover:bg-gray-200" key={index}>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.BookName}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.BookTitle}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.Author}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.SellingPrice}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {book?.PublishDate}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="w-20 flex justify-center gap-5">
                        <div
                          className="w-8 h-8 flex justify-center items-center bg-red-100 text-red-600 rounded-2xl cursor-pointer"
                          onClick={() => handleDelete(book._id)}
                        >
                          <span>
                            <MdDelete />
                          </span>
                        </div>
                        <div
                          className="w-8 h-8 flex justify-center items-center bg-green-100 text-green-600 rounded-2xl cursor-pointer"
                          onClick={() => handleUpdate(book)}
                        >
                          <span>
                            <FaEdit />
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
