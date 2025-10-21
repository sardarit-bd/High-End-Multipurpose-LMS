import React from "react";

const SelectedFundHeader = ({selectedFundData}) => {
  return (
    <section className={`bg-gradient-to-r ${selectedFundData?.color} p-8 text-white relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative flex items-center space-x-4">
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
          {selectedFundData && (
            <selectedFundData.icon className="w-8 h-8 text-pink-500" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{selectedFundData?.title}</h2>
          <p className="text-blue-100 text-lg opacity-95">
            {selectedFundData?.description}
          </p>
        </div>
        <div className="hidden sm:block">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="font-semibold text-black">Recommended</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedFundHeader;
