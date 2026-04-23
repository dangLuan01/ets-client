"use client"

import { useState } from "react";

interface ShareButtonsProps {
    url: string;
    title: string;
}
//<a href="https://twitter.com/intent/tweet?button_hashtag=button&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-show-count="false">Tweet #button</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

const ShareButtons = ({ url, title }: ShareButtonsProps) => {
    const [copied, setCopied] = useState(false);

    const handleFacebookShare = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const handleTwitterShare = () => {
        const hashtags = 'toeic,toeicviet';
        const shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=${hashtags}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');     
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <div className="flex flex-col gap-3">
            <button 
                onClick={handleFacebookShare}
                className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition"
                aria-label="Share on Facebook"
            >
                <i className="fab fa-facebook-f"></i>
            </button>
            <button 
                onClick={handleTwitterShare}
                className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition"
                aria-label="Share on Twitter"
            >
                <i className="fab fa-twitter"></i>
            </button>
            <button 
                onClick={handleCopyLink}
                className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition"
                aria-label="Copy link"
            >
                {copied ? <i className="fas fa-check"></i> : <i className="fas fa-link"></i>}
            </button>
        </div>
    );
};

export default ShareButtons;
