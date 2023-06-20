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
  const [pageNo, setPageNo] = useState(0);
  const [edit, setEdit] = useState(0);
  const [selected, setSelected] = useState([]);
  const [activePage, setActivePage] = useState(pageNo);
  const [updatedValues, setUpdatedValues] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setUserData(response.data);
        setData(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newOffset = (pageNo * 10) % userData.length;
    setItemOffset(newOffset);
    const endOffset = newOffset + 10;
    const currentItem = userData.slice(newOffset, endOffset);
    setCurrent(currentItem);
  }, [userData, itemOffset, pageNo]);

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
      setSelected((prevSelected) => [...prevSelected, id]);
    } else {
      setSelected((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const deleteSelected = () => {
    const updatedUser = userData.filter((item) => !selected.includes(item.id));
    setUserData(updatedUser);
    setData(updatedUser);
    setSelected([]);
  };

  const handleDelete = (id) => {
    const updatedUser = userData.filter((item) => item.id !== id);
    setUserData(updatedUser);
    setData(updatedUser);
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

  const handlePageClick = (event) => {
    const clickedPage = parseInt(event.target.value);

    if (!isNaN(clickedPage) && clickedPage >= 0 && clickedPage < Pages) {
      setPageNo(clickedPage);
      setActivePage(clickedPage);
    } else if (event.target.value === "prev" && pageNo > 0) {
      setPageNo((prevPageNo) => prevPageNo - 1);
      setActivePage((prevActivePage) => prevActivePage - 1);
    } else if (event.target.value === "next" && pageNo < Pages - 1) {
      setPageNo((prevPageNo) => prevPageNo + 1);
      setActivePage((prevActivePage) => prevActivePage + 1);
    }
  };

  const totalItem = userData.length;
  const Pages = Math.ceil(totalItem / 10);
  console.log("pages", Pages);

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
      <Pagination
        Pages={Pages}
        handlePageClick={handlePageClick}
        activePage={activePage}
        deleteSelected={deleteSelected}
      />
    </div>
  );
};

export default Admin;
