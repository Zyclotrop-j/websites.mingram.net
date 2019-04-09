import React from 'react';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { graphql, StaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { ResponsiveContext } from 'grommet';
import rgba from 'polished/lib/color/rgba';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';

const HeaderWrapper: any = styled.header`
  position: relative;
  background: linear-gradient(
    -185deg,
    ${props => rgba(darken(0.1, props.theme.colors.primary), 0.6)},
    ${props => rgba(lighten(0.1, props.theme.colors.grey.dark), 0.8)}
  );
  background-size: cover;
  padding: 8rem 2rem 10rem;
  text-align: center;
  ::after {
    background: transparent;
    background-size: 101%;
    bottom: -2px;
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
  }
  @media ${media.tablet} {
    padding: 4rem 2rem 6rem;
  }
  @media ${media.phone} {
    padding: 1rem 0.5rem 2rem;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 999;
  a {
    color: white;
    &:hover {
      opacity: 0.85;
      color: white;
    }
  }
`;

interface Props {
  children: any;
  banner?: string;
}

const query = graphql`
  query {
    file(relativePath: { eq: "IMG_20181111_060935.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 2400) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

const ImgWrapper = styled.div`
  position: absolute;
  top: -${props =>
      ({
        small: 50,
        medium: 100,
        large: 150,
      }[props.size])}%;
  max-height: ${props =>
    ({
      small: 150,
      medium: 200,
      large: 250,
    }[props.size])}%;
  left: 0;
  right: 0;
  z-index: -1;
  overflow-y: hidden;
`;

export class Header extends React.PureComponent<Props> {
  public render() {
    return (
      <HeaderWrapper>
        <ResponsiveContext.Consumer>
          {size => (
            <ImgWrapper size={size}>
              {this.props.banner && false ? (
                <Img {...this.props.banner} />
              ) : (
                <StaticQuery query={query} render={data => <Img fluid={data.file.childImageSharp.fluid} />} />
              )}
            </ImgWrapper>
          )}
        </ResponsiveContext.Consumer>

        <Content>{this.props.children}</Content>
      </HeaderWrapper>
    );
  }
}
