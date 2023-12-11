import "../style/index.css";
import React, { useState } from "react";
import { Client, Databases, ID } from "appwrite";

export default function Index() {
  const [show, setShow] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setLongUrl(e.target.value);
  };

  const client = new Client();
  const databases = new Databases(client);
  client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject("656e2c43a574f664ebd8"); // Your project ID

  const handleSubmit = (e) => {
    e.preventDefault();
    const promise = databases.createDocument(
      "656e2d6d5ee9c0a6c953",
      "656e2f4485d720af38f2",
      ID.unique(),
      JSON.stringify({
        url: longUrl,
      })
    );
    promise.then(
      function (response) {
        setShortUrl(response.$id);
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
          <span><b>Here's your short link: </b></span>
          http://6577636fce6343804854.appwrite.global/{shortUrl}
        </p>
      )}
    </div>
  );
}
