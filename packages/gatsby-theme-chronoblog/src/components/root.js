/** @jsx jsx */
import { Global } from '@emotion/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faAt,
  faEnvelope,
  faMoon,
  faPhone,
  faSun
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDXProvider } from '@mdx-js/react';
import { Link as LinkGatsby } from 'gatsby';
import { useCallback, useState } from 'react';
import { jsx, Layout } from 'theme-ui';

import FeedContext from '../contexts/context-feed';
import FeedItems from './feed-items';
import FeedSearch from './feed-search';
import LightDarkSwitchButton from './light-dark-switch-button';
import SEO from './seo';
import Tags from './tags';

library.add(fab, faEnvelope, faPhone, faAt, faSun, faMoon);

const Link = ({ to, ...props }) => <LinkGatsby to={to} {...props} />;
const A = ({ children, ...props }) => <a {...props}>{children}</a>;

const components = {
  SEO,
  Tags,
  FeedItems,
  FeedSearch,
  LightDarkSwitchButton,
  Link,
  A,
  FontAwesomeIcon
};

/**
 * site layout
 *
 * @param {*} props spread props
 */
export default ({ children, ...props }) => {
  //
  const [value, setValue] = useState({
    searchInput: ''
  });

  const onChangeSearchInput = useCallback((event) => {
    setValue({ searchInput: event.currentTarget.value });
  }, []);
  //
  return (
    <Layout {...props}>
      <Global
        styles={{
          '*': {
            boxSizing: 'border-box'
          },
          body: {
            margin: 0
          },
          overflowWrap: 'break-word',
          wordWrap: 'break-word'
        }}
      />
      <SEO />
      <MDXProvider components={components}>
        <FeedContext.Provider value={{ value, onChangeSearchInput }}>
          {children}
        </FeedContext.Provider>
      </MDXProvider>
    </Layout>
  );
};