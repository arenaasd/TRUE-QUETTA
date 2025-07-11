export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 ml-12 flex flex-col mt-16 items-center justify-center">
      <video
        src="/animation.mp4"
        autoPlay
        muted
        playsInline
        className="w-[200px] h-[150px] object-cover "
      ></video>
      <div
        className="mt-4 text-medium text-center md:text-xl lg:text-2xl font-black uppercase tracking-wider"
        style={{
          backgroundImage: 'repeating-linear-gradient(105deg, var(--teal) 0%, #8B4513 5%, var(--teal) 12%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          transform: 'scaleY(1.05)',
          transformOrigin: 'top',
          WebkitTextStroke: 'clamp(0.5px, 0.15vw, 1px)',
          fontSize: 'clamp(1.5rem, 5vw, 3rem)',
        }}
      >
        Loading Data...
      </div>
    </div>
  );
}