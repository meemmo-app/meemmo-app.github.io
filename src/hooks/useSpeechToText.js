import { useState, useEffect, useCallback } from "react";

export const useSpeechToText = (newTask, setNewTask, onFinish) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser non supportato");

    const recognition = new SpeechRecognition();
    recognition.lang = "it-IT";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      processTask(text);
    };

    recognition.start();
  }, []);

  const processTask = (text) => {
    // Semplice logica di parsing
    let sectionId = "morning";
    let priority = false;

    const lowerText = text.toLowerCase();
    if (lowerText.includes("importante") || lowerText.includes("urgente"))
      priority = true;

    // Puliamo il titolo dalle parole chiave
    const cleanTitle = text.replace(/importante|urgente/gi, "").trim();

    console.log(
      "Capture speech raw: " +
        lowerText +
        "\nTitle" +
        cleanTitle +
        "\nPriority: " +
        priority,
    );

    onFinish({
      title: cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1), // Capitalizza
      note: "Aggiunto via voce 🎙️",
      priority: priority,
      sectionId: sectionId,
    });
  };

  return { isListening, startListening, transcript };
};
