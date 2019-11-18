/** @jsx jsx */
import { useBreakpointIndex, useResponsiveValue } from '@theme-ui/match-media';
import BackgroundImage from 'gatsby-background-image';
import get from 'lodash/get';
import { jsx } from 'theme-ui';

const CoverImageBase = ({
  height,
  imageAlt,
  coverFluidImage,
  borderRadiusForCard,
  backgroundSize
}) => {
  return (
    <div
      sx={{
        maxHeight: [height]
      }}
    >
      <BackgroundImage
        fluid={coverFluidImage}
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 'card',
          ...borderRadiusForCard
        }}
      >
        <BackgroundImage
          style={{
            backdropFilter: `blur(5px) contrast(50%)`,
            WebkitBackdropFilter: `blur(5px) contrast(50%)`,
            borderRadius: 'inherit',
            ...backgroundSize
          }}
          alt={imageAlt}
          title={imageAlt}
          fluid={coverFluidImage}
        >
          <div
            sx={{
              borderRadius: 'card',
              ...borderRadiusForCard,
              backdropFilter: `drop-shadow(0px 0px 20px black)`,
              boxShadow: 'inset 0px 0px 15px black'
            }}
          >
            <div
              sx={{
                minHeight: [height]
              }}
            />
          </div>
        </BackgroundImage>
      </BackgroundImage>
    </div>
  );
};

export default ({ data, type = 'post' }) => {
  //
  const coverFluidImage = get(
    data,
    'frontmatter.cover.childImageSharp["fluid"]',
    undefined
  );
  if (!coverFluidImage) return <div />;
  //
  const imageAlt = get(data, 'frontmatter.title', '');
  //
  let breakpointIndex = 0;
  try {
    breakpointIndex = useBreakpointIndex();
  } catch (error) {
    breakpointIndex = 0;
  }
  //
  let height = 366;
  if (breakpointIndex === 0) height = 183;
  //
  const borderRadiusForCard =
    type === 'card'
      ? {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      : {};
  //
  // 'contain' - default value
  let backgroundSize = { backgroundSize: 'contain' };
  // if img small - 'auto auto'
  let containerMaxWidth = 768;
  try {
    containerMaxWidth = useResponsiveValue((theme) => [
      theme.styles.Container.maxWidth
    ]);
  } catch (error) {
    containerMaxWidth = 768;
  }
  if (
    coverFluidImage.presentationWidth < containerMaxWidth &&
    coverFluidImage.presentationHeight < height
  ) {
    backgroundSize = { backgroundSize: 'auto auto' };
  }
  // for small media - 'contain'
  if (breakpointIndex === 0) backgroundSize = { backgroundSize: 'contain' };
  //
  return (
    <CoverImageBase
      height={height}
      imageAlt={imageAlt}
      coverFluidImage={coverFluidImage}
      borderRadiusForCard={borderRadiusForCard}
      backgroundSize={backgroundSize}
    />
  );
};
