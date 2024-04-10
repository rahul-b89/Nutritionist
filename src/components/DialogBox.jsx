import React, { useEffect, useState } from "react";
import axios from "axios";
import star from "../images/star.png";
import star2 from "../images/fill-star.png";

const DialogBox = ({ isOpen, onClose, setIsOpen }) => {
  const [dialogContent, setDialogContent] = useState();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.nal.usda.gov/fdc/v1/food/171596?api_key=rtvxHn8xJkOelav5gz5Trjd2RuhW7n4FwI5CPvAs"
      );
      setDialogContent(response.data);
    } catch (error) {
      console.log("Error fetching Data", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleBookmark = () => {
    setSaved((prev) => {
      return !prev;
    });
  };

  return (
    <div className={`${isOpen ? "fixed inset-0 overflow-y-auto" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left  transform transition-all mt-4 mb-8">
          <div className="bg-red-500 mb-6 sm:p-6 sm:pb-4">
            <div className="text-center sm:mt-0 sm:text-left flex justify-between ">
              <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                {dialogContent && dialogContent.description}{" "}
              </h3>
              <div onClick={handleBookmark}>
                <img
                  src={saved ? star2 : star}
                  alt=""
                  style={{ cursor: "pointer" }}
                  height="24px"
                  width="24px"
                />
              </div>
            </div>
          </div>

<div>
          <div className="bg-gray-50 flex flex-col overflow-y-auto" style={{height:"80vh"}}>
            <div className="grid grid-cols-3 gap-4 relative" style={{ paddingTop: "2.5rem" }}>
              <div className="p-4 font-bold fixed left-0 top-14 bg-gray-500 z-10 w-full pb-2" style={{textDecoration:"underline", color:"white"}}>Nutrient Name</div>
              <div className="p-4 font-bold fixed left-1/3 top-14 bg-gray-500 z-10 pb-1" style={{textDecoration:"underline",color:"white"}}>Weight</div>
              <div className="p-4 font-bold fixed left-2/3 top-14 bg-gray-500 z-10 pb-1" style={{textDecoration:"underline", color:"white"}}>Nutrient Amount</div>

              {dialogContent &&
                dialogContent.foodNutrients &&
                dialogContent.foodNutrients.map((nutrient, index) => (
                  <React.Fragment key={index}>
                    <div className="p-4">
                      {nutrient.nutrient ? nutrient.nutrient.name : ""}
                    </div>
                    <div className="p-4">
                      {nutrient.nutrient && nutrient.amount ? nutrient.nutrient.number + "g" : "N/A"}
                    </div>
                    <div className="p-4">
                      {nutrient.amount
                        ? `${nutrient.amount} ${nutrient.nutrient.unitName}`
                        : "N/A"}
                    </div>
                  </React.Fragment>
                ))}
            </div>
</div>

            <div className="flex justify-end pr-4 pb-4 mt-3">
              <button
                onClick={handleClose}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
