import "../style/index.css";
import React, { useState } from "react";
import { Client, Functions } from "appwrite";

export default function Index() {
  const [show, setShow] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setLongUrl(e.target.value);
  };

  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("PROJECT_ID");
  const functions = new Functions(client);

  const handleSubmit = (e) => {
    e.preventDefault();

    const execution = functions.createExecution(
      "FUNCTION_ID",
      JSON.stringify({
        url: longUrl,
      }),
      false,
      "/",
      "POST",
      {
        "Content-Type": "application/json",
      }
    );
    execution.then(
      function (response) {
        setShortUrl(response.responseBody);
        setShow(true);
        setLongUrl("");
        console.log(response);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>Paste your URL here:</label>
        <div className="section">
          <input
            type="text"
            placeholder="URL"
            value={longUrl}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      {show && (
        <p>
          <span>
            <b>Here's your short link: </b>
          </span>
          {shortUrl}
        </p>
      )}
    </div>
  );
}
