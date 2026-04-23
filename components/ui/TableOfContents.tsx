"use client"
import {useEffect, useState} from "react";
import Slugger from 'github-slugger'

interface TocItem {
    title: string;
    url: string;
    depth: number;
}

const TableOfContents = ({htmlContent}: {htmlContent: string}) => {
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const headings = Array.from(doc.querySelectorAll('h2, h3'));
        const sluggerInstance = new Slugger();
        const tocItems: TocItem[] = headings.map((heading) => {
            const title = heading.textContent || '';
            const slug = sluggerInstance.slug(title);
            heading.id = slug;
            const depth = heading.tagName === 'H2' ? 1 : 2;
            return {
                title,
                url: `#${slug}`,
                depth
            };
        });
        setToc(tocItems);
        const articleElement = document.querySelector('.article-content');
        if (articleElement) {
            articleElement.innerHTML = doc.body.innerHTML;
        }

        const observer = new IntersectionObserver((entries) => {
            let intersectingEntry: IntersectionObserverEntry | undefined;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!intersectingEntry || entry.intersectionRatio > intersectingEntry.intersectionRatio) {
                        intersectingEntry = entry;
                    }
                }
            });
            if (intersectingEntry) {
                setActiveId(intersectingEntry.target.id);
            }
        }, {
            rootMargin: '-100px 0px -80% 0px'
        });

        document.querySelectorAll('.article-content h2, .article-content h3').forEach((heading) => {
            observer.observe(heading);
        });

        return () => {
            observer.disconnect();
        };


    }, [htmlContent]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
        e.preventDefault();
        const targetId = url.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <ul className="space-y-4 text-sm font-bold text-slate-500">
            {toc.map((item, index) => (
                <li
                    key={index}
                    className={`
                        transition cursor-pointer
                        ${item.url === `#${activeId}` ? 'text-indigo-600' : 'hover:text-indigo-600'}
                        ${item.depth === 2 ? 'pl-4' : ''}
                    `}
                >
                    <a href={item.url} onClick={(e) => handleScroll(e, item.url)}>
                        {item.title}
                    </a>
                </li>
            ))}
        </ul>
    );
};
export default TableOfContents;
