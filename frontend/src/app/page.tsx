"use client";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/extract-transcript`,
        { url },
        { responseType: "blob" }
      );

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      link.download = "transcript.txt";
      link.click();
      window.URL.revokeObjectURL(urlBlob);

      toast.success("Transcript extracted successfully!");
      setUrl("");
    } catch (err: AxiosError | any) {
      const errorMessage =
        (err.response && err.response.data && err.response.data.error) ||
        "Something went wrong";
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="flex items-center justify-center space-x-2 mb-8">
          {/* YouTube Icon */}
          <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Transcript Extractor
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="text"
              placeholder="Paste YouTube URL here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       transition-all duration-300 ease-in-out
                       placeholder:text-gray-400 text-gray-700"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 
                          group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl
                     font-medium hover:from-purple-600 hover:to-blue-600 transform hover:scale-105
                     transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 
                     focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70
                     flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                {/* Download Icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                <span>Extract Transcript</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Enter any YouTube video URL to extract its transcript
      </p>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;