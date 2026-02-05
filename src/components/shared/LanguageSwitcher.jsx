'use client';
import { useEffect, useState, useRef } from 'react';
import { parseCookies, setCookie } from 'nookies';

// The following cookie name is important because it's Google-predefined for the translation engine purpose
const COOKIE_NAME = 'googtrans';

const LanguageSwitcher = () => {
    const [currentLanguage, setCurrentLanguage] = useState();
    const [languageConfig, setLanguageConfig] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Language flag mapping
    const languageFlags = {
        'en': '🇬🇧',
        'bn': '🇧🇩',
        'ms': '🇲🇾',
    };

    // Initialize translation engine
    useEffect(() => {
        // 1. Read the cookie
        const cookies = parseCookies();
        const existingLanguageCookieValue = cookies[COOKIE_NAME];

        let languageValue;
        if (existingLanguageCookieValue) {
            // 2. If the cookie is defined, extract a language nickname from there.
            const sp = existingLanguageCookieValue.split('/');
            if (sp.length > 2) {
                languageValue = sp[2];
            }
        }
        // 3. If __GOOGLE_TRANSLATION_CONFIG__ is defined and we still not decided about languageValue - use default one
        if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
            languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
        }
        if (languageValue) {
            // 4. Set the current language if we have a related decision.
            setCurrentLanguage(languageValue);
        }
        // 5. Set the language config.
        if (global.__GOOGLE_TRANSLATION_CONFIG__) {
            setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
        }
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Don't display anything if current language information is unavailable.
    if (!currentLanguage || !languageConfig) {
        return null;
    }

    // The following function switches the current language
    const switchLanguage = (lang) => () => {
        // We just need to set the related cookie and reload the page
        // "/auto/" prefix is Google's definition as far as a cookie name
        setCookie(null, COOKIE_NAME, '/auto/' + lang);
        window.location.reload();
    };

    // Get current language details
    const getCurrentLanguage = () => {
        if (currentLanguage === 'auto') {
            return languageConfig.languages.find(l => l.name === languageConfig.defaultLanguage);
        }
        return languageConfig.languages.find(l => l.name === currentLanguage) || languageConfig.languages[0];
    };

    const activeLanguage = getCurrentLanguage();

    return (
        <div className="relative notranslate" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white border-[var(--color-primary)] rounded-[var(--radius-default)] hover:bg-[var(--color-background)] hover:border-[var(--color-primary-hover)] transition-all duration-200 shadow-[var(--shadow-soft)]"
                style={{ opacity: 'var(--container-opacity)' }}
            >
                <span className="text-lg">{languageFlags[activeLanguage.name] || '🌐'}</span>
                <span className="font-semibold text-[var(--color-text)]">{activeLanguage.title}</span>
                <svg
                    className={`w-4 h-4 text-[var(--color-secondary)] transition-transform duration-200 ${openDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            <div
                className={`absolute right-0 mt-2 bg-white border-[var(--color-primary)] rounded-[var(--radius-card)] shadow-[var(--shadow-medium)] z-50 min-w-[180px] overflow-hidden transition-all duration-200 transform origin-top ${openDropdown
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                style={{ opacity: openDropdown ? 'var(--container-opacity)' : '0' }}
            >
                {languageConfig.languages.map((ld) => (
                    <button
                        key={`l_s_${ld.name}`}
                        onClick={() => {
                            switchLanguage(ld.name)();
                            setOpenDropdown(false);
                        }}
                        className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 ${currentLanguage === ld.name || (currentLanguage === 'auto' && languageConfig.defaultLanguage === ld.name)
                                ? "bg-[var(--color-primary)] text-white shadow-inner"
                                : "hover:bg-[var(--color-background)] text-[var(--color-text)] hover:text-[var(--color-primary-hover)]"
                            }`}
                    >
                        <span className="text-lg">{languageFlags[ld.name] || '🌐'}</span>
                        <span className="font-semibold">{ld.title}</span>
                        {(currentLanguage === ld.name || (currentLanguage === 'auto' && languageConfig.defaultLanguage === ld.name)) && (
                            <svg
                                className="w-4 h-4 ml-auto text-[var(--color-accent)]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export { LanguageSwitcher, COOKIE_NAME };