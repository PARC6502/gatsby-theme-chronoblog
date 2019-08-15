/** @jsx jsx */
import { jsx } from 'theme-ui';

export default ({ valueTag, tag, onClick }) => {
  // checked - true if the same data from tag
  const checkedCheck = (v, t) => v === t;
  const checked = checkedCheck(valueTag, tag);
  //
  return (
    <label
      sx={{
        // userSelect: 'none',
        display: 'inline-block',
        bg: 'muted',
        padding: '10px 20px',
        fontSize: [0],
        border: '1px',
        borderColor: 'muted',
        borderStyle: 'solid',
        borderRadius: [0]
      }}
    >
      <input
        sx={{
          opacity: 0,
          position: 'fixed',
          width: 0
        }}
        checked={checked}
        name="tag"
        value={tag}
        onClick={onClick}
        type="radio"
      />
      {`${tag}`}
    </label>
  );
};