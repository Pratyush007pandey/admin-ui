import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import ClearIcon from "@mui/icons-material/Clear";
import "./List.css";

const List = ({
  userData,
  edit,
  selected,
  updatedValues,
  handleEdit,
  handleDelete,
  handleUpdate,
  handleInputChange,
  handleChecked,
}) => {
  const [data, setData] = useState(userData);

  useEffect(() => {
    setData(userData);
  }, [userData]);
  console.log(data);

  return (
    <div>
      <div className="title-container">
        <input type="checkbox" className="title-input"></input>
        <h5 className="title-item">Name</h5>
        <h5 className="title-item">Email</h5>
        <h5 className="title-item">Role</h5>
        <h5 className="title-item">Actions</h5>
      </div>
      {data.map((item) =>
        edit !== item.id ? (
          <div key={item.id} className="title-container">
            <input
              type="checkbox"
              className="title-input"
              onChange={(event) => handleChecked(event, item.id)}
              checked={selected.includes(item.id)}
            ></input>
            <p className="title-item">{item.name}</p>
            <p className="title-item">{item.email}</p>
            <p className="title-item">{item.role}</p>

            <span className="title-item control">
              <button onClick={() => handleEdit(item.id)}>
                <EditIcon />
              </button>
              <button onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </button>
            </span>
          </div>
        ) : (
          <div key={item.id} className="title-container">
            <input
              type="checkbox"
              onChange={(event) => handleChecked(event, item.id)}
              checked={selected.includes(item.id)}
              className="title-input"
            ></input>
            <div className="item-info">
              <input
                type="text"
                value={
                  updatedValues[item.id]?.name !== undefined
                    ? updatedValues[item.id].name
                    : item.name
                }
                onChange={(event) => handleInputChange(event, item.id, "name")}
                className="title-item"
              />
              <input
                type="text"
                value={
                  updatedValues[item.id]?.email !== undefined
                    ? updatedValues[item.id].email
                    : item.email
                }
                onChange={(event) => handleInputChange(event, item.id, "email")}
                className="title-item"
              />
              <input
                type="text"
                value={
                  updatedValues[item.id]?.role !== undefined
                    ? updatedValues[item.id].role
                    : item.role
                }
                onChange={(event) => handleInputChange(event, item.id, "role")}
                className="title-item"
              />
            </div>

            <span className="title-item control">
              <button onClick={() => handleUpdate(item.id)}>
                <UpgradeIcon />
              </button>
              <button onClick={() => handleEdit(0)}>
                <ClearIcon />
              </button>
            </span>
          </div>
        )
      )}
    </div>
  );
};
export default List;
