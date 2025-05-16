import React from "react";

const Actions = ({ row, onDelete, onEdit,isEdit,isDelete,  }) => {
  return (
    <div>
      <td className="icondiv">
        {
          isDelete ? <i
          className="mdi mdi-trash-can-outline iconsize"
          onClick={() => onDelete(row.id)}
        /> : ""
        }
        
        {
          isEdit ?  <i
          className="mdi mdi-pencil-box-outline iconsize"
          onClick={() => onEdit(row.id)}
        /> : ""
        }
       
      </td>
    </div>
  );
};

export default Actions;
