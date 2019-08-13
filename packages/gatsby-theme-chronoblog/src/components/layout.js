/** @jsx jsx */
import { MDXProvider } from '@mdx-js/react';
import { useCallback, useState } from 'react';
import { Container, jsx, Layout } from 'theme-ui';

import FeedContext from '../contexts/context-feed';
import FeedItems from './feed-items';
import FeedSearch from './feed-search';
import Footer from './footer';
import Header from './header';
import LightDarkSwitchButton from './light-dark-switch-button';
import SEO from './seo';
import SiteHeaderTitle from './site-header-title';

const components = {
  FeedItems,
  FeedSearch,
  LightDarkSwitchButton,
  SiteHeaderTitle
};

/**
 * site layout
 *
 * @param {*} props spread props
 */
export default ({ children, ...props }) => {
  //
  const [value, setValue] = useState('');

  const onChange = useCallback((event) => {
    setValue(event.currentTarget.value);
  }, []);
  //
  return (
    <Layout {...props}>
      <SEO />
      <MDXProvider components={components}>
        <FeedContext.Provider value={{ value, onChange }}>
          <Header />
          <Container>{children}</Container>
          <Footer />
        </FeedContext.Provider>
      </MDXProvider>
    </Layout>
  );
};