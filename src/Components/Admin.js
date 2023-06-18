import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import List from "./List";
import "./Admin.css";

const Admin = () => {
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [edit, setEdit] = useState(0);
  const [selected, setSelected] = useState([]);
  const [updatedValues, setUpdatedValues] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUserData(response.data);
      setData(response.data);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;

    if (value.trim() === "") {
      setUserData(data);
    } else {
      const filteredUser = data.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.id.toString().includes(value) ||
          item.role.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase())
      );
      setUserData(filteredUser);
    }
  };

  const handleChecked = (event, id) => {
    const checked = event.target.checked;
    if (checked) {
      setSelected([...selected, id]);
    } else {
      const updatedSelectedItems = selected.filter(
        (selectedId) => selectedId !== id
      );
      setSelected(updatedSelectedItems);
    }
  };

  const deleteSelected = () => {
    const updatedUser = userData.filter((item) => !selected.includes(item.id));
    setUserData(updatedUser);
    setData(updatedUser);
    setSelected([]);
  };

  const handleDelete = (id) => {
    console.log(id);
    const updateduser = userData.filter((item) => item.id !== id);
    setUserData(updateduser);
    setData(updateduser);
  };

  const handleEdit = (id) => {
    setEdit(id);
  };

  const handleInputChange = (event, id, identify) => {
    const value = event.target.value;
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [id]: {
        ...prevValues[id],
        [identify]: value,
      },
    }));
  };

  const handleUpdate = () => {
    setUserData((prevUser) =>
      prevUser.map((item) => {
        const updatedValuesForItem = updatedValues[item.id];
        if (updatedValuesForItem) {
          return {
            ...item,
            ...updatedValuesForItem,
          };
        }
        return item;
      })
    );
    setUpdatedValues({});
    setEdit(0);

    setData((prevUser) =>
      prevUser.map((item) => {
        const updatedValuesForItem = updatedValues[item.id];
        if (updatedValuesForItem) {
          return {
            ...item,
            ...updatedValuesForItem,
          };
        }
        return item;
      })
    );
  };

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % userData.length;
  //   setItemOffset(newOffset);
  // };
  // const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + 10;
    const currentItem = userData.slice(itemOffset, endOffset);
    setCurrent(currentItem);
  }, [userData, itemOffset]);

  // const pageCount = Math.ceil(userData.length / itemsPerPage);

  // console.log(userData, "hekl");
  // console.log(userData, "hek2");
  const handlePageClick = (event) => {
    console.log(event.target.value);
    const newOffset = (event.target.value * 10) % userData.length;
    setItemOffset(newOffset);
    const endOffset = itemOffset + 10;
    const currentItem = userData.slice(itemOffset, endOffset);
    setCurrent(currentItem);
  };
  const totalItem = userData.length;

  return (
    <div className="admin-body">
      <SearchBar handleSearch={handleSearch} />
      <List
        userData={current}
        edit={edit}
        selected={selected}
        updatedValues={updatedValues}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleInputChange={handleInputChange}
        handleUpdate={handleUpdate}
        handleChecked={handleChecked}
      />
      {/* <Pagination
        deleteSelected={deleteSelected}
        pageCount={pageCount}
        handlePageClick={handlePageClick}
      /> */}
      <Pagination totalItems={totalItem} handPageClick={handlePageClick} />
    </div>
  );
};
export default Admin;
