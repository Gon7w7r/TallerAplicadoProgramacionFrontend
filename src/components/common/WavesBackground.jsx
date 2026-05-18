import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";

export default function WavesBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const noise2D = createNoise2D();
        let animationId;
        let t = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const drawWave = (offsetY, amplitude, speed, colorStart, colorEnd, alpha) => {
            const width = canvas.width;
            const height = canvas.height;

            ctx.beginPath();
            ctx.moveTo(0, height);

            for (let x = 0; x <= width; x += 3) {
                const nx = x / width;
                const ny = t * speed;
                const noiseVal = noise2D(nx * 2, ny);
                const y = offsetY + noiseVal * amplitude;
                ctx.lineTo(x, y);
            }

            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();

            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, colorStart);
            gradient.addColorStop(1, colorEnd);

            ctx.globalAlpha = alpha;
            ctx.fillStyle = gradient;
            ctx.filter = "blur(28px)";
            ctx.fill();
            ctx.filter = "none";
            ctx.globalAlpha = 1;
        };

        const animate = () => {
            // Si está activado calma, pausar
            if (document.documentElement.classList.contains("calma")) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            // Ola trasera
            drawWave(
                height * 0.52,
                height * 0.28,
                0.08,
                "rgba(0, 230, 180, 0.6)",
                "rgba(0, 180, 140, 0.3)",
                0.25
            );

            // Ola media
            drawWave(
                height * 0.62,
                height * 0.22,
                0.12,
                "rgba(0, 200, 220, 0.5)",
                "rgba(0, 140, 180, 0.2)",
                0.2
            );

            // Ola delantera
            drawWave(
                height * 0.72,
                height * 0.18,
                0.16,
                "rgba(140, 240, 255, 0.4)",
                "rgba(80, 180, 220, 0.15)",
                0.15
            );

            t += 0.004;
            animationId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        window.addEventListener("resize", resize);
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
        />
    );
}