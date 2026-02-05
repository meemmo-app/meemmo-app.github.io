import React from "react";

const PixelSprite = ({
  imagePath,
  frameWidth = 128,
  frameHeight = 128,
  columns = 3,
  rows = 3,
  frames = 9,
  animationDuration = 1.5,
  className = "",
  alt = "Pixel Sprite Animation",
}) => {
  // Calculate total frames based on columns and rows if not provided
  const totalFrames = frames || columns * rows;

  // Calculate total dimensions
  const totalWidth = frameWidth * columns;
  const totalHeight = frameHeight * rows;

  // Generate CSS keyframes for sprite animation
  let keyframes = "@keyframes pixelSpriteAnimation {\n";

  for (let i = 0; i < totalFrames; i++) {
    // Calculate row and column for this frame
    const row = Math.floor(i / columns);
    const col = i % columns;

    const percentageStart = (i / totalFrames) * 100;
    const percentageEnd = ((i + 1) / totalFrames) * 100;

    const offsetX = -col * frameWidth;
    const offsetY = -row * frameHeight;

    keyframes += `${percentageStart.toFixed(2)}% { transform: translate(${offsetX}px, ${offsetY}px); }\n`;
    keyframes += `${percentageEnd.toFixed(2)}% { transform: translate(${offsetX}px, ${offsetY}px); }\n`;
  }

  // Loop back to first frame
  const firstFrameRow = 0;
  const firstFrameCol = 0;
  const firstFrameOffsetX = -firstFrameCol * frameWidth;
  const firstFrameOffsetY = -firstFrameRow * frameHeight;
  keyframes += `100% { transform: translate(${firstFrameOffsetX}px, ${firstFrameOffsetY}px); }\n}`;

  return (
    <div
      className={`overflow-hidden inline-block ${className}`}
      style={{
        width: frameWidth,
        height: frameHeight,
      }}
    >
      <style>{keyframes}</style>
      <div
        style={{
          width: totalWidth,
          height: totalHeight,
          backgroundImage: `url(${imagePath})`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          msInterpolationMode: "nearest-neighbor",
          MozImageRendering: "pixelated",
          WebkitImageRendering: "optimize-contrast",
          animation: `pixelSpriteAnimation ${animationDuration}s steps(1) infinite`,
        }}
      />
    </div>
  );
};

export default PixelSprite;
