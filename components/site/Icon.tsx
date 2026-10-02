// <use> reference into the sprite rendered by IconSprite.
export function Icon({ id, size = 16, fill }: { id: string; size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} fill={fill} aria-hidden="true">
      <use href={`#i-${id}`} />
    </svg>
  );
}
