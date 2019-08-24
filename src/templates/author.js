import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import get from 'lodash/get'
import ArticlePreview from '../components/article-preview'
import FeaturePost from '../components/featurePost'
import Pagination from '../components/pagination'

class AuthorTemplate extends React.Component {
  render() {
    const { authorName, authorSlug, currentPage, numPagesPostsAuthors } = get(this.props, 'pageContext')
    const { edges, totalCount } = get(this.props, 'data.allContentfulBlogPost')
    const authorHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } by ${authorName}:`
    const featurePost = get(this, 'props.data.allContentfulBlogPost.edges[0]')
    const isFirst = currentPage === 1
    const isLast = currentPage === numPagesPostsAuthors
    const prevPage = currentPage - 1 === 1 ? `/authors/${authorSlug}/` : `/authors/${authorSlug}/${(currentPage - 1).toString()}`
    const nextPage = `/authors/${authorSlug}/${(currentPage + 1).toString()}`

    return (
      <Layout>
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <p>{authorHeader}</p>
            {edges.length == 1 && <FeaturePost data={featurePost.node} />}
            {edges.length > 1 && (
              <ul className="article-list">
                {edges.map(({ node }) => {
                  return (
                    <li key={node.slug}>
                      <ArticlePreview article={node} />
                    </li>
                  )
                })}
              </ul>
            )}
            <Pagination
              isFirst={isFirst}
              isLast={isLast}
              nextPage={nextPage}
              prevPage={prevPage}
              numPages={numPagesPostsAuthors}
              to={`/authors/${authorSlug}/`}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default AuthorTemplate

export const pageQuery = graphql`
  query($authorSlug: String, $skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      limit: $limit
      skip: $skip
      sort: { fields: [publishDate], order: DESC }
      filter: { author: { slug: { in: [$authorSlug] } } }
    ) {
      totalCount
      edges {
        node {
          slug
          title
          author {
            name
          }
          description {
            childMarkdownRemark {
              html
            }
          }
          tags
          publishDate(formatString: "MMMM Do, YYYY")
          thumbnail: heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          coverImage: heroImage {
            fluid(maxWidth: 1180, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
