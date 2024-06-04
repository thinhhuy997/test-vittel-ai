import React, { useEffect, useState } from "react";
import axios from "axios";

const AudioPlayer = () => {
  const [audioSrc, setAudioSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("audioSrc:", audioSrc);
  }, [audioSrc]);

  const fetchAudio = async () => {
    setLoading(true);
    setError(null);
    const url = "https://viettelgroup.ai/voice/api/tts/v1/rest/syn";
    const data = {
      text: "Con trỏ hay biến con trỏ cũng là một biến thông thường nhưng giá trị mà nó lưu lại là địa chỉ của 1 biến khác",
      voice: "doanngocle",
      id: "2",
      without_filter: false,
      speed: 1.0,
      tts_return_option: 3,
    };
    const headers = {
      "Content-type": "application/json",
      token: "Gh8--a69OOb92whJ-bKF9287hbYxbs253LjSUeKWqNDKrCtyh6eF6TX3zmOVrF-3",
    };

    try {
      const response = await axios.post(url, data, {
        headers,
        responseType: "blob",
      });
      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioSrc(audioUrl);
    } catch (error) {
      setError("Error fetching audio");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchAudio} disabled={loading}>
        {loading ? "Loading..." : "Fetch Audio"}
      </button>
      {error && <p>{error}</p>}
      {audioSrc && (
        <audio controls>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;
