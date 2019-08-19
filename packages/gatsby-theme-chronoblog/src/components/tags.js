/** @jsx jsx */
import { Link } from 'gatsby';
import { jsx } from 'theme-ui';

import Button from './button';

/**
 * @typedef {object} TagProps
 * @property {string} tag
 */

/**
 * @param {TagProps=} props
 */
const Tag = ({ tag }) => {
  return (
    <Link to={`/feed?tag=${tag}`}>
      <Button
        sx={{
          mr: ['5px'],
          mt: ['2px'],
          mb: ['2px'],
          px: '10px',
          py: '4px',
          fontSize: [0]
        }}
      >
        {tag}
      </Button>
    </Link>
  );
};

/**
 * @typedef {object} Props
 * @property {*} tags
 */

/**
 * @param {Props=} props
 */
const Tags = ({ tags }) => {
  let tagsUse = tags;
  if (tagsUse) tagsUse = tagsUse.filter((t) => typeof t === 'string');
  return (
    <div>{tagsUse ? tagsUse.map((t) => <Tag key={t} tag={t} />) : ''}</div>
  );
};

export default Tags;
