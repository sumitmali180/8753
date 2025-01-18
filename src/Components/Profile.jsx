import { useEffect, useState } from "react";

function Profile() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setName("John Doe"); 
      setIsLoading(false); 
    }, 1000);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        {isLoading ? (
          <p className="text-lg text-gray-500">Loading...</p> 
        ) : (
          <p className="text-lg">Name: {name}</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
