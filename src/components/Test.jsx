import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = ({ isOpen, onClose, setIsOpen }) => {
  const [dialogContent, setDialogContent] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.nal.usda.gov/fdc/v1/food/171686?api_key=rtvxHn8xJkOelav5gz5Trjd2RuhW7n4FwI5CPvAs"
      );
      console.log("Response:", response.data);
      setDialogContent(response.data);
    } catch (error) {
      console.log("Error fetching Data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dialogContent]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
  
  <div className="p-4 font-bold">Nutrient Name</div>
  <div className="p-4 font-bold">Weight</div>
  <div className="p-4 font-bold">Nutrient Amount</div>

  {dialogContent &&
    dialogContent.foodNutrients &&
    dialogContent.foodNutrients.map((nutrient, index) => (
      <React.Fragment key={index}>
        <div className="p-4">
          {nutrient.nutrient ? nutrient.nutrient.name : ""}
        </div>
        <div className="p-4">
          {nutrient.nutrient ? nutrient.nutrient.number + "g" : ""}
        </div>
        <div className="p-4">
          {nutrient.amount
            ? `${nutrient.amount} ${nutrient.nutrient.unitName}`
            : "-"}
        </div>
      </React.Fragment>
    ))}
</div>

    </div>
  );
};

export default Test;
