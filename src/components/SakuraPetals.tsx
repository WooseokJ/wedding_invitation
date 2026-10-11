const petals = [
  { left: "4%", duration: "21s", delay: "-13s" },
  { left: "11%", duration: "17s", delay: "-5s" },
  { left: "19%", duration: "24s", delay: "-19s" },
  { left: "27%", duration: "19s", delay: "-8s" },
  { left: "35%", duration: "22s", delay: "-16s" },
  { left: "43%", duration: "16s", delay: "-3s" },
  { left: "51%", duration: "23s", delay: "-11s" },
  { left: "59%", duration: "18s", delay: "-15s" },
  { left: "67%", duration: "20s", delay: "-7s" },
  { left: "75%", duration: "25s", delay: "-21s" },
  { left: "84%", duration: "17s", delay: "-10s" },
  { left: "93%", duration: "22s", delay: "-17s" },
];

export function SakuraPetals() {
  return (
    <div className="sakura-layer" aria-hidden="true">
      {petals.map((petal, index) => (
        <span
          key={index}
          className="sakura-petal"
          style={{
            left: petal.left,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
          }}
        />
      ))}
    </div>
  );
}