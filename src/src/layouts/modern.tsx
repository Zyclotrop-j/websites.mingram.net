import React from 'react';
import styled, { css } from 'styled-components';
import { Anchor, Box, Grid, ResponsiveContext, SkipLinkTarget } from 'grommet';
import { mq } from '../utils/media';
import { PriorityContext, LOW, DEFAULT, IMPORTANT } from "../utils/priorityContext";
import { ThemeContext } from 'styled-components';

const NoOverflowBox = styled(Box)`
  overflow-x: hidden;
`;
const calcpad = (idx) => {
  if(idx < 3) return "0px";
  if(idx > 12) return `${(idx-12)*1.5+10}vw`;
  return `${idx+2}rem`;
}
const breakpoints = ["xxxs", "xxs", "xs", "s", "sl", "m", "ml", "l", "xl", "xxl", "xxxl", "xxxxl", "xxxxxl"];
const Main = ({ children, value }) => {
  const MMain = styled.main`
    position: relative;
    padding: 3px;
    ${props => breakpoints
        .filter(([k]) => !["small", "medium", "large"]
        .includes(k)).map((bp, idx) => props?.theme?.mq?.(bp)(css`
     padding: 0 calc( ${calcpad(idx)} + ( 100vw - ${props?.theme?.__breakpoints[bp]}px ) / 2 );
     @supports (padding: 0 max( ${calcpad(idx)}, calc( ( 100vw - ${props?.theme?.__breakpoints[bp]}px ) / 2 ) )) {
       padding: 0 max( ${calcpad(idx)}, calc( ( 100vw - ${props?.theme?.__breakpoints[bp]}px ) / 2 ) );
     }
    `))}
  `;
  return (<ThemeContext.Consumer>
      {theme => (
        <MMain theme={theme}>
          {children}
        </MMain>
      )}
    </ThemeContext.Consumer>);
}

export const ModernLayout = (props) => {
  return (<>
    <PriorityContext.Provider value={IMPORTANT}>
      <Grid
        as="header"
        rows={['full']}
        columns={['auto', 'flex', 'auto']}
        areas={[
          { name: 'left', start: [0, 0], end: [1, 0] },
          { name: 'center', start: [1, 0], end: [2, 0] },
          { name: 'right', start: [2, 0], end: [3, 0] },
        ]}
      >
        <SkipLinkTarget id="header" />
        <Box gridArea="left" id="pagebodyheaderleft">
          {props.__renderSubtree(props?.header?.left)}
        </Box>
        <Box gridArea="center" id="pagebodyheadercenter">
          {props.__renderSubtree(props?.header?.center)}
        </Box>
        <Box gridArea="right" id="pagebodyheaderright">
          {props.__renderSubtree(props?.header?.right)}
        </Box>
      </Grid>
    </PriorityContext.Provider>
    <PriorityContext.Provider value={DEFAULT}>
      <Main>
        <SkipLinkTarget id="main" />
        <NoOverflowBox direction="column" id="pagebodybodycenter">
          {props.__renderSubtree(props?.main)}
        </NoOverflowBox>
      </Main>
    </PriorityContext.Provider>
    <PriorityContext.Provider value={LOW}>
      <Grid
        as="footer"
        rows={['full']}
        columns={['auto', 'flex', 'auto']}
        areas={[
          { name: 'left', start: [0, 0], end: [1, 0] },
          { name: 'center', start: [1, 0], end: [2, 0] },
          { name: 'right', start: [2, 0], end: [3, 0] },
        ]}
      >
        <SkipLinkTarget id="footer" />
        <Box gridArea="left" id="pagebodyfooterleft">
          {props.__renderSubtree(props?.footer?.left)}
        </Box>
        <Box gridArea="center" id="pagebodyfootercenter">
          {props.__renderSubtree(props?.footer?.center)}
        </Box>
        <Box gridArea="right" id="pagebodyfooterright">
          {props.__renderSubtree(props?.footer?.right)}
        </Box>
      </Grid>
    </PriorityContext.Provider>
  </>)
}
