import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/core';

import { Footer } from '../components/Footer';
// import { BookCard } from '../components/BookCard';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;


const Speaking: React.FC = () => {
  const { allSpeakingYaml } = useStaticQuery(
    graphql`
      query {
        allSpeakingYaml {
          edges {
            node {
              past {
                city
                country
                event {
                  dates
                  name
                  url
                }
                talks {
                  feedback
                  slides
                  video
                  slug
                }
              }
            }
          }
        }
      }
    `
  )
  console.log("TEST: ", allSpeakingYaml);


  return( 
  <IndexLayout>
    <Helmet>
      <title>Speaking</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
        <div css={[outer, SiteNavMain]}>
          <div css={inner}>
            <SiteNav isHome={false} />
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <div css={inner}>
          <article className="post page" css={[PostFull, NoImage]}>
            <PostFullHeader className="post-full-header">
              <PostFullTitle className="post-full-title">Speaking</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content">
                {/* Books go here */}
                {allSpeakingYaml.edges.map(book => {
                  // filter out drafts in production
                  // return (
                  //   <BookCard key={book.id} book={book.node} />
                  // );
                })}
              </div>
            </PostFullContent>
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
  );
};

export default Speaking;