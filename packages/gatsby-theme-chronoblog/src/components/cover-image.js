/** @jsx jsx */
import { useBreakpointIndex, useResponsiveValue } from '@theme-ui/match-media';
import BackgroundImage from 'gatsby-background-image';
import get from 'lodash/get';
import { jsx } from 'theme-ui';

const CoverImageBase = ({
  data,
  type,
  height,
  coverFluidImage,
  backgroundSize
}) => {
  const borderRadiusForCard =
    type === 'card'
      ? {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      : {};
  //
  const imageAlt = get(data, 'frontmatter.title', '');
  //
  return (
    <div
      sx={{
        maxHeight: height
      }}
    >
      <div
        sx={{
          backgroundImage: `url(${coverFluidImage.src})`,
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
                minHeight: height
              }}
            />
          </div>
        </BackgroundImage>
      </div>
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
  let breakpointIndex = 0;
  try {
    breakpointIndex = useBreakpointIndex();
  } catch {
    breakpointIndex = 0;
  }
  //
  const heightMain = 366;
  const heightMobile = 183;
  const heightArray = [heightMobile, heightMain];
  //
  let containerMaxWidth = 768;
  try {
    containerMaxWidth = useResponsiveValue((theme) => [
      theme.styles.Container.maxWidth
    ]);
  } catch {
    containerMaxWidth = 768;
  }
  //
  if (
    breakpointIndex === 0 &&
    coverFluidImage.presentationWidth < 320 &&
    coverFluidImage.presentationHeight < heightMobile
  )
    return (
      <CoverImageBase
        data={data}
        type={type}
        height={heightArray}
        coverFluidImage={coverFluidImage}
        backgroundSize={{ backgroundSize: 'auto auto' }}
      />
    );
  //
  if (breakpointIndex === 0)
    return (
      <CoverImageBase
        data={data}
        type={type}
        height={heightArray}
        coverFluidImage={coverFluidImage}
        backgroundSize={{ backgroundSize: 'contain' }}
      />
    );
  //
  if (
    coverFluidImage.presentationWidth < containerMaxWidth &&
    coverFluidImage.presentationHeight < heightMain
  )
    return (
      <CoverImageBase
        data={data}
        type={type}
        height={heightArray}
        coverFluidImage={coverFluidImage}
        backgroundSize={{ backgroundSize: 'auto auto' }}
      />
    );
  //
  return (
    <CoverImageBase
      data={data}
      type={type}
      height={heightArray}
      coverFluidImage={coverFluidImage}
      backgroundSize={{ backgroundSize: 'contain' }}
    />
  );
};
