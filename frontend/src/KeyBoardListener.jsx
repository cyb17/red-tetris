import { useEffect } from "react"

export default function KeyboardListener() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        // on envoie l'intention au serveur
        socket.emit("player:action", {
          type: "HARD_DROP",
          at: Date.now()
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null; // juste un listener, pas de rendu
}