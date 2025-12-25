const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

addEventListener("resize", resize);
resize();

const blobs = [...Array(32)].map((_, i) => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    baseR: 70 + Math.random() * 120,
    r: 0,
    dx: (Math.random() - 0.5) * 0.45,
    dy: (Math.random() - 0.5) * 0.45,
    off: Math.random() * Math.PI * 2,
    t: i % 7 === 0 ? "orange" : "violet",
}));

let tx = 0, ty = 0, scrollY = 0, time = 0;

addEventListener("mousemove", (e) => {
    tx = (e.clientX / innerWidth - 0.5) * 100;
    ty = (e.clientY / innerHeight - 0.5) * 100;
});

addEventListener("scroll", () => (scrollY = window.scrollY));

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);
    g.addColorStop(0, "rgba(5,7,12,0)");
    g.addColorStop(1, "rgba(5,7,12,.45)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    time += 1;
    ctx.globalCompositeOperation = "lighter";

    blobs.forEach((b) => {
        b.r = b.baseR + Math.sin(time * 0.0018 + b.off) * b.baseR * 0.18;
        b.x += b.dx + tx * 0.008;
        b.y += b.dy + ty * 0.008 + scrollY * 0.002;

        if (b.x < -b.r) b.x = canvas.width + b.r;
        if (b.x > canvas.width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = canvas.height + b.r;
        if (b.y > canvas.height + b.r) b.y = -b.r;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);

        if (b.t === "orange") {
            ctx.fillStyle = "rgba(255,175,95,.075)";
            ctx.shadowColor = "rgba(255,175,95,.45)";
            ctx.shadowBlur = 95;
        } else {
            ctx.fillStyle = "rgba(145,155,255,.065)";
            ctx.shadowColor = "rgba(170,150,255,.4)";
            ctx.shadowBlur = 80;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
    });

    ctx.globalCompositeOperation = "source-over";
    requestAnimationFrame(draw);
}

draw();

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
        else entry.target.classList.remove("visible");
    });
}, { threshold: 0.35 });

document.querySelectorAll(".avatar, .circle, .title-cover, .bio, .hero-image, .hero-text").forEach((el) => observer.observe(el));
