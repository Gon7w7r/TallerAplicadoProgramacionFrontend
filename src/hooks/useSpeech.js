import { useState, useCallback } from "react";

export function useSpeech() {
    const [speaking, setSpeaking] = useState(false);
    const [paused, setPaused] = useState(false);

    const getPageText = () => {
        const elements = document.querySelectorAll(
            "h1, h2, h3, h4, h5, h6, p, label, button, input, a, span, li"
        );

        const texts = [];

        elements.forEach((el) => {
            // Saltar elementos ocultos
            if (el.offsetParent === null) return;
            // Saltar el panel de accesibilidad
            if (el.closest("[data-accessibility-panel]")) return;

            if (el.tagName === "INPUT") {
                const label = document.querySelector(`label[for="${el.id}"]`);
                const placeholder = el.placeholder;
                if (label) texts.push(`Campo: ${label.textContent}`);
                else if (placeholder) texts.push(`Campo: ${placeholder}`);
            } else {
                const text = el.textContent.trim();
                if (text && text.length > 1) texts.push(text);
            }
        });

        // Deduplicar
        return [...new Set(texts)].join(". ");
    };

    const speak = useCallback(() => {
        if (!window.speechSynthesis) {
            alert("Tu navegador no soporta text to speech");
            return;
        }

        window.speechSynthesis.cancel();

        const text = getPageText();
        console.log("Texto a leer:", text); // ← verifica que hay texto

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "es-ES";
        utterance.rate = 0.9;
        utterance.pitch = 1;

        // Esperar voces antes de asignar
        const assignVoiceAndSpeak = () => {
            const voices = window.speechSynthesis.getVoices();
            const spanishVoice = voices.find((v) => v.lang.startsWith("es"));
            if (spanishVoice) utterance.voice = spanishVoice;

            utterance.onstart = () => setSpeaking(true);
            utterance.onend = () => { setSpeaking(false); setPaused(false); };
            utterance.onerror = (e) => { console.error("Speech error:", e); setSpeaking(false); setPaused(false); };

            setTimeout(() => {
                window.speechSynthesis.speak(utterance);
            }, 100);
        };

        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = assignVoiceAndSpeak;
        } else {
            assignVoiceAndSpeak();
        }
    }, []);

    const pause = useCallback(() => {
        window.speechSynthesis.pause();
        setPaused(true);
    }, []);

    const resume = useCallback(() => {
        window.speechSynthesis.resume();
        setPaused(false);
    }, []);

    const stop = useCallback(() => {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        setPaused(false);
    }, []);

    return { speaking, paused, speak, pause, resume, stop };
}