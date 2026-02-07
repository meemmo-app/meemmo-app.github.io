import React from "react";
import { Mic } from "lucide-react";
import { GLASSBASE } from "../../constants/styles";
import { VoiceWaveform } from "../ui/VoiceWaveform";

const TextToSpeechButton = ({ startListening, isListening }) => {
  return (
    <>
      <button
        onMouseDown={startListening} // Tieni premuto per parlare
        title="Hold down to speech a task"
        className={`
        ${GLASSBASE}
        rounded-full flex flex-row items-center justify-center gap-2 p-3 h-12 cursor-pointer transition-all duration-300
         text-white/80 hover:text-white ${isListening ? "scale-90" : "hover:scale-105 active:scale-90"}`}
      >
        <Mic size={22} className={isListening ? "animate-pulse" : ""} />
        {isListening && (
          <div className="relative">
            <VoiceWaveform />
          </div>
        )}
      </button>
    </>
  );
};

export default TextToSpeechButton;