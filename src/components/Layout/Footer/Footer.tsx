import { Link } from 'gatsby';
import React from 'react';

//@ts-expect-error
import * as styles from './Footer.module.less';
//@ts-expect-error
import netlify from '../../../images/netlify.png';
//@ts-expect-error
import gatsby from '../../../images/gatsby.png';
//@ts-expect-error
import github from '../../../images/nav-github.png';
//@ts-expect-error
import koFi from '../../../images/kofi-logo.png';
//@ts-expect-error
import newsletter from '../../../images/mail.png';
//@ts-expect-error
import rss from '../../../images/rss.png';

const links = [
  {
    url: 'https://awesomeden.substack.com/subscribe',
    label: 'Newsletter',
    icon: newsletter,
  },
  { url: 'https://ko-fi.com/awsmdenisbunchenko', label: 'Ko-Fi', icon: koFi },
  // ToDo: Patreon?
];
const internalLinks = [{ url: '/rss.xml', label: 'RSS', icon: rss }];
const madeWithLinks = [
  { url: 'https://github.com/AwesomeDevDen', label: 'GitHub', icon: github },
  { url: 'https://www.gatsbyjs.org/', label: 'Gatsby', icon: gatsby },
  { url: 'https://www.netlify.com', label: 'Netlify', icon: netlify },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section>
        <nav>
          <span className={styles.desktopOnly}>Made by Denis Bunchenko</span>
          {links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              <span>{link.label}</span>
              <img src={link.icon} alt={link.label} />
            </a>
          ))}
          {internalLinks.map((link) => (
            <Link to={link.url} key={link.url}>
              <span>{link.label}</span>
              <img src={link.icon} alt={link.label} />
            </Link>
          ))}
        </nav>
        <nav>
          {madeWithLinks.map((link) => (
            <a
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              <span>{link.label}</span>
              <img src={link.icon} alt={link.label} />
            </a>
          ))}
        </nav>
      </section>
    </footer>
  );
};
