import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        ¡Bienvenido a la Aplicación!
      </h1>
      <p className="text-lg text-gray-700">
        Navega por el sistema utilizando el menú lateral.
      </p>
    </div>
  );
};

export default Home;
