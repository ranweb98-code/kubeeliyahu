import { useLanguage } from "@/i18n/LanguageContext";

const SkipToContent = () => {
  const { t, dir } = useLanguage();

  return (
    <a
      href="#main-content"
      dir={dir}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground focus:shadow-lg focus:outline-none"
    >
      {t.skipToContent}
    </a>
  );
};

export default SkipToContent;
