import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLanguage } from "@/i18n/LanguageContext";

const VideoTeaser = () => {
  const { dir } = useLanguage();

  return (
    <section className="w-full py-16 px-6 bg-background" dir={dir}>
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center">
          <video
            src="/videos/kubbeh-2.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-[420px] h-auto mx-auto rounded-3xl"
          />
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default VideoTeaser;
